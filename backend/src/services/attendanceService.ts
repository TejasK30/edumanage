import {
  CreateAttendanceSessionDto,
  MarkAttendanceDto,
  EndAttendanceSessionDto,
} from "../types"
import sseManager from "../utils/sse"
import { prisma } from "../db/client"
import { notificationService } from "./notificationService"

export class AttendanceService {
  async createSession(teacherId: string, data: CreateAttendanceSessionDto) {
    try {
      const teacher = await prisma.teacherProfile.findUnique({
        where: { id: teacherId },
        include: { user: true },
      })

      if (!teacher) {
        throw new Error("Teacher not found")
      }

      const session = await prisma.attendanceSession.create({
        data: {
          classId: data.classId,
          teacherId,
          subject: data.subject,
          startTime: data.startTime || new Date(),
          status: "ongoing",
        },
        include: {
          class: true,
          teacher: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })

      const students = await prisma.studentProfile.findMany({
        where: { classId: data.classId },
        include: { user: true },
      })

      students.forEach((student) => {
        if (student.user.id) {
          // Send SSE event
          sseManager.sendToUser(student.user.id, "attendance_started", {
            sessionId: session.id,
            subject: session.subject,
            teacherName: teacher.user.name,
            startTime: session.startTime,
          })

          notificationService.createNotification({
            userId: student.user.id,
            senderId: teacher.user.id,
            title: "Attendance Started",
            message: `Attendance for ${session.subject} has started`,
            type: "attendance",
            relatedItemId: session.id,
            relatedItemType: "attendanceSession",
          })
        }
      })

      sseManager.sendToClass(data.classId, "attendance_session_started", {
        sessionId: session.id,
        subject: session.subject,
        teacherName: teacher.user.name,
      })

      return session
    } catch (error) {
      throw error
    }
  }

  async markAttendance(teacherId: string, data: MarkAttendanceDto) {
    try {
      // Check if session exists and belongs to teacher
      const session = await prisma.attendanceSession.findFirst({
        where: {
          id: data.sessionId,
          teacherId,
          status: "ongoing",
        },
        include: {
          class: true,
        },
      })

      if (!session) {
        throw new Error("Attendance session not found or already ended")
      }

      const student = await prisma.studentProfile.findFirst({
        where: {
          id: data.studentId,
          classId: session.classId,
        },
        include: {
          user: true,
        },
      })

      if (!student) {
        throw new Error("Student not found or not in this class")
      }

      // Check if attendance already marked
      const existingAttendance = await prisma.dailyAttendance.findFirst({
        where: {
          sessionId: data.sessionId,
          studentId: data.studentId,
        },
      })

      let attendance

      if (existingAttendance) {
        // Update existing attendance
        attendance = await prisma.dailyAttendance.update({
          where: { id: existingAttendance.id },
          data: {
            status: data.status,
            remarks: data.remarks,
            markedAt: new Date(),
          },
        })
      } else {
        // Create new attendance record
        attendance = await prisma.dailyAttendance.create({
          data: {
            sessionId: data.sessionId,
            studentId: data.studentId,
            status: data.status,
            remarks: data.remarks,
          },
        })
      }

      // Notify student via SSE
      sseManager.sendToUser(student.user.id, "attendance_marked", {
        sessionId: session.id,
        subject: session.subject,
        status: attendance.status,
        markedAt: attendance.markedAt,
      })

      // Create notification for student
      await notificationService.createNotification({
        userId: student.user.id,
        senderId: teacherId,
        title: "Attendance Marked",
        message: `Your attendance for ${session.subject} has been marked as ${attendance.status}`,
        type: "attendance",
        relatedItemId: session.id,
        relatedItemType: "attendanceSession",
      })

      return attendance
    } catch (error) {
      throw error
    }
  }

  async endSession(teacherId: string, data: EndAttendanceSessionDto) {
    try {
      const session = await prisma.attendanceSession.findFirst({
        where: {
          id: data.sessionId,
          teacherId,
          status: "ongoing",
        },
        include: {
          class: true,
          studentAttendance: true,
        },
      })

      if (!session) {
        throw new Error("Attendance session not found or already ended")
      }

      // Update session status
      const endedSession = await prisma.attendanceSession.update({
        where: { id: data.sessionId },
        data: {
          status: "completed",
          endTime: new Date(),
        },
        include: {
          studentAttendance: true,
          class: true,
        },
      })

      // Get all students in the class
      const students = await prisma.studentProfile.findMany({
        where: { classId: session.classId },
        include: { user: true },
      })

      // Mark absent for students who didn't get marked
      const markedStudentIds = session.studentAttendance.map((a) => a.studentId)
      const absentStudents = students.filter(
        (s) => !markedStudentIds.includes(s.id)
      )

      if (absentStudents.length > 0) {
        // Bulk create absent records
        await prisma.dailyAttendance.createMany({
          data: absentStudents.map((student) => ({
            sessionId: session.id,
            studentId: student.id,
            status: "absent",
            remarks: "Automatically marked absent at session end",
          })),
        })

        // Notify absent students
        for (const student of absentStudents) {
          sseManager.sendToUser(student.user.id, "attendance_marked_absent", {
            sessionId: session.id,
            subject: session.subject,
          })

          // Create notification
          await notificationService.createNotification({
            userId: student.user.id,
            senderId: teacherId,
            title: "Marked Absent",
            message: `You were marked absent for ${session.subject}`,
            type: "attendance",
            relatedItemId: session.id,
            relatedItemType: "attendanceSession",
          })
        }
      }

      students.forEach((student) => {
        sseManager.sendToUser(student.user.id, "attendance_session_ended", {
          sessionId: session.id,
          subject: session.subject,
          endTime: endedSession.endTime,
        })
      })

      sseManager.sendToClass(session.classId, "attendance_session_ended", {
        sessionId: session.id,
        subject: session.subject,
      })

      return endedSession
    } catch (error) {
      throw error
    }
  }

  async getSessionDetails(sessionId: string) {
    try {
      const session = await prisma.attendanceSession.findUnique({
        where: { id: sessionId },
        include: {
          class: true,
          teacher: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          studentAttendance: {
            include: {
              student: {
                include: {
                  user: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!session) {
        throw new Error("Attendance session not found")
      }

      return session
    } catch (error) {
      throw error
    }
  }

  async getStudentAttendance(
    studentId: string,
    classId?: string,
    subject?: string
  ) {
    try {
      const whereClause: any = {
        studentId,
      }

      if (classId) {
        whereClause.session = {
          classId,
        }
      }

      if (subject) {
        if (!whereClause.session) {
          whereClause.session = {}
        }
        whereClause.session.subject = subject
      }

      const attendance = await prisma.dailyAttendance.findMany({
        where: whereClause,
        include: {
          session: {
            include: {
              teacher: {
                include: {
                  user: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          markedAt: "desc",
        },
      })

      return attendance
    } catch (error) {
      throw error
    }
  }

  async getClassAttendanceStats(
    classId: string,
    startDate?: Date,
    endDate?: Date
  ) {
    try {
      const sessions = await prisma.attendanceSession.findMany({
        where: {
          classId,
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: "completed",
        },
        include: {
          studentAttendance: true,
        },
      })

      const students = await prisma.studentProfile.findMany({
        where: { classId },
        select: { id: true, fullName: true },
      })

      // Calculate statistics
      const stats = students.map((student) => {
        let presentCount = 0
        let absentCount = 0
        let lateCount = 0

        sessions.forEach((session) => {
          const attendance = session.studentAttendance.find(
            (a) => a.studentId === student.id
          )
          if (attendance) {
            if (attendance.status === "present") presentCount++
            else if (attendance.status === "absent") absentCount++
            else if (attendance.status === "late") lateCount++
          } else {
            // If no record found, count as absent
            absentCount++
          }
        })

        const totalSessions = sessions.length
        const attendancePercentage =
          totalSessions > 0
            ? ((presentCount + lateCount * 0.5) / totalSessions) * 100
            : 0

        return {
          studentId: student.id,
          studentName: student.fullName,
          presentCount,
          absentCount,
          lateCount,
          totalSessions,
          attendancePercentage: Math.round(attendancePercentage * 100) / 100,
        }
      })

      return {
        classId,
        totalSessions: sessions.length,
        period: {
          start: startDate || sessions[0]?.date,
          end: endDate || sessions[sessions.length - 1]?.date,
        },
        studentStats: stats,
      }
    } catch (error) {
      throw error
    }
  }

  async getActiveSessions(teacherId: string) {
    try {
      const sessions = await prisma.attendanceSession.findMany({
        where: {
          teacherId,
          status: "ongoing",
        },
        include: {
          class: true,
          teacher: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })

      return sessions
    } catch (error) {
      throw error
    }
  }
}

export const attendanceService = new AttendanceService()
