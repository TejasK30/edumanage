import { Request, Response } from "express"
import { prisma } from "../db/client"

export const getAllStaff = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      department,
      college,
      page = 1,
      limit = 10,
      search,
      role,
    } = req.query
    const pageNum = Number(page)
    const limitNum = Number(limit)

    let filters: any = {}
    if (department) filters.department = department as string
    if (college) filters.collegeId = college as string
    if (role) filters.roleTitle = role as string
    if (search) {
      filters.OR = [
        { firstName: { contains: search as string, mode: "insensitive" } },
        { lastName: { contains: search as string, mode: "insensitive" } },
      ]
    }

    const totalCount = await prisma.staffProfile.count({ where: filters })

    const staffMembers = await prisma.staffProfile.findMany({
      where: filters,
      include: {
        user: {
          select: {
            email: true,
            isOnline: true,
            lastSeen: true,
          },
        },
        college: {
          select: {
            name: true,
          },
        },
      },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      orderBy: { firstName: "asc" },
    })

    return res.json({
      staffMembers,
      meta: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    })
  } catch (error) {
    console.error("Error fetching staff members:", error)
    return res.status(500).json({ error: "Failed to retrieve staff members" })
  }
}

export const getStaffById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const staffId = req.params.id
    const staff = await prisma.staffProfile.findUnique({
      where: { id: staffId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
            lastSeen: true,
            isOnline: true,
          },
        },
        college: true,
      },
    })

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" })
    }

    return res.json(staff)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const createJobPosting = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const staffId = req.params.id
    const { jobTitle, description, requirements, closingDate } = req.body

    if (!jobTitle || !description || !closingDate) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newJobPosting = await prisma.jobPosting.create({
      data: {
        postedBy: staffId,
        jobTitle,
        description,
        requirements,
        closingDate: new Date(closingDate),
      },
    })

    return res.status(201).json(newJobPosting)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getStaffFeeExtensions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const staffId = req.params.id
    const feeExtensions = await prisma.feeExtensionRequest.findMany({
      where: { reviewedBy: staffId },
      include: {
        student: {
          select: {
            fullName: true,
            email: true,
            currentSemester: true,
            department: true,
            className: true,
          },
        },
      },
    })

    return res.json(feeExtensions)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const updateFeeExtensionStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const staffId = req.params.id
    const extensionId = req.params.extensionId
    const { status } = req.body

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" })
    }

    const updatedExtension = await prisma.feeExtensionRequest.update({
      where: { id: extensionId },
      data: {
        status,
        reviewedBy: staffId,
        reviewedAt: new Date(),
      },
    })

    return res.json(updatedExtension)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getStaffAcademicDecisions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const staffId = req.params.id
    const academicDecisions = await prisma.academicProgression.findMany({
      where: { decidedBy: staffId },
      include: {
        student: {
          select: {
            fullName: true,
            email: true,
            currentSemester: true,
            department: true,
            className: true,
          },
        },
      },
    })

    return res.json(academicDecisions)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

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

export const getAllSemesterResults = async (
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

    const semesterResults = await prisma.semesterResult.findMany({
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
        subjectResults: true,
      },
      orderBy: [
        {
          declaredAt: "desc",
        },
      ],
    })

    return res.json(semesterResults)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllSubjectResults = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { semester, academicYear, subjectCode, department } = req.query

    let whereClause: any = {}

    if (semester) {
      whereClause.semesterResult = {
        semester: parseInt(semester as string),
      }
    }

    if (academicYear) {
      whereClause.semesterResult = {
        ...whereClause.semesterResult,
        academicYear: academicYear as string,
      }
    }

    if (subjectCode) {
      whereClause.subjectCode = subjectCode as string
    }

    if (department) {
      whereClause.student = {
        department: department as string,
      }
    }

    const subjectResults = await prisma.subjectResult.findMany({
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
        semesterResult: {
          select: {
            semester: true,
            academicYear: true,
          },
        },
      },
      orderBy: [
        {
          subjectCode: "asc",
        },
        {
          student: {
            fullName: "asc",
          },
        },
      ],
    })

    return res.json(subjectResults)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllBacklogRecords = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { subjectCode, status, semester, academicYear, department } =
      req.query

    let whereClause: any = {}

    if (subjectCode) {
      whereClause.subjectCode = subjectCode as string
    }

    if (status) {
      whereClause.status = status as string
    }

    if (semester) {
      whereClause.originalSemester = parseInt(semester as string)
    }

    if (academicYear) {
      whereClause.originalAcademicYear = academicYear as string
    }

    if (department) {
      whereClause.student = {
        department: department as string,
      }
    }

    const backlogRecords = await prisma.backlogRecord.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            fullName: true,
            className: true,
            department: true,
            email: true,
            currentSemester: true,
          },
        },
      },
      orderBy: [
        {
          examDate: "desc",
        },
      ],
    })

    return res.json(backlogRecords)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllGradeImprovements = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { subjectCode, status, semester, department } = req.query

    let whereClause: any = {}

    if (subjectCode) {
      whereClause.subjectCode = subjectCode as string
    }

    if (status) {
      whereClause.status = status as string
    }

    if (semester) {
      whereClause.originalSemester = parseInt(semester as string)
    }

    if (department) {
      whereClause.student = {
        department: department as string,
      }
    }

    const gradeImprovements = await prisma.gradeImprovement.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            fullName: true,
            className: true,
            department: true,
            email: true,
            currentSemester: true,
          },
        },
      },
      orderBy: [
        {
          attemptDate: "desc",
        },
      ],
    })

    return res.json(gradeImprovements)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllAcademicProgression = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { academicYear, semester, status, department } = req.query

    let whereClause: any = {}

    if (academicYear) {
      whereClause.academicYear = academicYear as string
    }

    if (semester) {
      whereClause.semester = parseInt(semester as string)
    }

    if (status) {
      whereClause.status = status as string
    }

    if (department) {
      whereClause.student = {
        department: department as string,
      }
    }

    const academicProgressions = await prisma.academicProgression.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            fullName: true,
            className: true,
            department: true,
            email: true,
            currentSemester: true,
          },
        },
        staff: {
          select: {
            firstName: true,
            lastName: true,
            department: true,
          },
        },
      },
      orderBy: [
        {
          decidedAt: "desc",
        },
      ],
    })

    return res.json(academicProgressions)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const createSemesterResult = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      studentId,
      semester,
      academicYear,
      totalMarks,
      obtainedMarks,
      percentage,
      sgpa,
      cgpa,
      totalCredits,
      earnedCredits,
      status,
      remarks,
      subjectResults,
    } = req.body

    if (
      !studentId ||
      !semester ||
      !academicYear ||
      !totalMarks ||
      !obtainedMarks ||
      !percentage ||
      !sgpa ||
      !cgpa ||
      !totalCredits ||
      !earnedCredits ||
      !status
    ) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await prisma.$transaction(async (prisma) => {
      const semesterResult = await prisma.semesterResult.create({
        data: {
          studentId,
          semester,
          academicYear,
          totalMarks,
          obtainedMarks,
          percentage,
          sgpa,
          cgpa,
          totalCredits,
          earnedCredits,
          status,
          remarks,
          declaredAt: new Date(),
        },
      })

      if (
        subjectResults &&
        Array.isArray(subjectResults) &&
        subjectResults.length > 0
      ) {
        for (const subject of subjectResults) {
          await prisma.subjectResult.create({
            data: {
              semesterResultId: semesterResult.id,
              studentId,
              subjectCode: subject.subjectCode,
              subjectName: subject.subjectName,
              credits: subject.credits,
              internalMarks: subject.internalMarks,
              externalMarks: subject.externalMarks,
              totalMarks: subject.totalMarks,
              grade: subject.grade,
              gradePoints: subject.gradePoints,
              status: subject.status,
              attempts: subject.attempts || 1,
              isBacklog: subject.isBacklog || false,
            },
          })
        }
      }

      return semesterResult
    })

    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const createSubjectResult = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      semesterResultId,
      studentId,
      subjectCode,
      subjectName,
      credits,
      internalMarks,
      externalMarks,
      totalMarks,
      grade,
      gradePoints,
      status,
      attempts,
      isBacklog,
    } = req.body

    if (
      !semesterResultId ||
      !studentId ||
      !subjectCode ||
      !subjectName ||
      !credits ||
      !totalMarks ||
      !grade ||
      !gradePoints ||
      !status
    ) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const subjectResult = await prisma.subjectResult.create({
      data: {
        semesterResultId,
        studentId,
        subjectCode,
        subjectName,
        credits,
        internalMarks,
        externalMarks,
        totalMarks,
        grade,
        gradePoints,
        status,
        attempts: attempts || 1,
        isBacklog: isBacklog || false,
      },
    })

    return res.status(201).json(subjectResult)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const createBacklogRecord = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      studentId,
      subjectCode,
      originalSemester,
      originalAcademicYear,
      examType,
      attemptNumber,
      examDate,
      marks,
      status,
      clearedDate,
    } = req.body

    if (
      !studentId ||
      !subjectCode ||
      !originalSemester ||
      !originalAcademicYear ||
      !examType ||
      !attemptNumber ||
      !examDate ||
      !status
    ) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const backlogRecord = await prisma.backlogRecord.create({
      data: {
        studentId,
        subjectCode,
        originalSemester,
        originalAcademicYear,
        examType,
        attemptNumber,
        examDate: new Date(examDate),
        marks,
        status,
        clearedDate: clearedDate ? new Date(clearedDate) : null,
      },
    })

    return res.status(201).json(backlogRecord)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}
