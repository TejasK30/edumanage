import { Request, Response } from "express"
import { prisma } from "../db/client"

export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        college: true,
        teachers: {
          include: {
            teacher: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    })

    return res.json(classes)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getClassById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const classId = req.params.id
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        college: true,
        teachers: {
          include: {
            teacher: {
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
        _count: {
          select: {
            students: true,
          },
        },
      },
    })

    if (!classData) {
      return res.status(404).json({ error: "Class not found" })
    }

    return res.json(classData)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getClassStudents = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const classId = req.params.id
    const students = await prisma.studentProfile.findMany({
      where: { classId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            isOnline: true,
            lastSeen: true,
          },
        },
      },
    })

    return res.json(students)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getClassTeachers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const classId = req.params.id
    const teachers = await prisma.classTeacher.findMany({
      where: { classId },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                isOnline: true,
                lastSeen: true,
              },
            },
          },
        },
      },
    })

    return res.json(teachers)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getClassAttendanceSessions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const classId = req.params.id
    const sessions = await prisma.attendanceSession.findMany({
      where: { classId },
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
        _count: {
          select: {
            studentAttendance: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    })

    return res.json(sessions)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const createAttendanceSession = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const classId = req.params.id
    const { teacherId, subject, date, startTime } = req.body

    if (!teacherId || !subject || !date || !startTime) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newSession = await prisma.attendanceSession.create({
      data: {
        classId,
        teacherId,
        subject,
        date: new Date(date),
        startTime: new Date(startTime),
      },
    })

    return res.status(201).json(newSession)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getAttendanceSessionById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionId = req.params.id
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
      },
    })

    if (!session) {
      return res.status(404).json({ error: "Attendance session not found" })
    }

    return res.json(session)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getSessionAttendance = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionId = req.params.id
    const attendance = await prisma.dailyAttendance.findMany({
      where: { sessionId },
      include: {
        student: {
          select: {
            fullName: true,
            email: true,
            currentSemester: true,
          },
        },
      },
    })

    return res.json(attendance)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const submitSessionAttendance = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionId = req.params.id
    const { attendanceData } = req.body

    if (!attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({ error: "Invalid attendance data" })
    }

    const session = await prisma.attendanceSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      return res.status(404).json({ error: "Attendance session not found" })
    }

    const createdRecords = await prisma.$transaction(
      attendanceData.map((record: any) =>
        prisma.dailyAttendance.create({
          data: {
            sessionId,
            studentId: record.studentId,
            status: record.status,
            remarks: record.remarks,
          },
        })
      )
    )

    await prisma.attendanceSession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
        endTime: new Date(),
      },
    })

    return res.status(201).json({
      message: "Attendance submitted successfully",
      recordsCreated: createdRecords.length,
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getDailyAttendanceRecords = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { date, classId } = req.query

    let whereClause: any = {}

    if (date) {
      const queryDate = new Date(date as string)
      whereClause.session = {
        date: {
          gte: new Date(queryDate.setHours(0, 0, 0, 0)),
          lt: new Date(queryDate.setHours(23, 59, 59, 999)),
        },
      }
    }

    if (classId) {
      whereClause.session = {
        ...whereClause.session,
        classId: classId as string,
      }
    }

    const attendanceRecords = await prisma.dailyAttendance.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            fullName: true,
            className: true,
            department: true,
          },
        },
        session: {
          include: {
            class: true,
            teacher: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        markedAt: "desc",
      },
    })

    return res.json(attendanceRecords)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getSemesterAttendanceSummary = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { semester, academicYear, department } = req.query

    let whereClause: any = {}

    if (semester) {
      whereClause.semester = parseInt(semester as string)
    }

    if (academicYear) {
      whereClause.academicYear = academicYear as string
    }

    if (department) {
      whereClause.student = {
        department: department as string,
      }
    }

    const semesterAttendance = await prisma.semesterAttendance.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            fullName: true,
            className: true,
            department: true,
            email: true,
          },
        },
      },
      orderBy: [
        {
          student: {
            department: "asc",
          },
        },
        {
          student: {
            fullName: "asc",
          },
        },
      ],
    })

    return res.json(semesterAttendance)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}
