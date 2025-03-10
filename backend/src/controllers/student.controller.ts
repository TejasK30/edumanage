import { Request, Response } from "express"
import { prisma } from "../db/client"

export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query
    const students = await prisma.studentProfile.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: { ...filters },
    })
    return res.json({ students })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to retrieve students" })
  }
}

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { id: req.params.id },
    })
    if (!student) return res.status(404).json({ error: "Student not found" })
    return res.json({ student })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to retrieve student" })
  }
}

export const getStudentSemesterSubjects = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const subjects = await prisma.semesterSubject.findMany({
      where: { studentId: req.params.id },
    })
    return res.json({ semesterSubjects: subjects })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve semester subjects" })
  }
}

// Get student fee details
export const getStudentFees = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const fees = await prisma.studentFee.findMany({
      where: { studentId: req.params.id },
    })
    return res.json({ fees })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to retrieve fee details" })
  }
}

export const getStudentPayments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Get payment history
    const payments = await prisma.feePayment.findMany({
      where: { studentId },
      orderBy: { paymentDate: "desc" },
    })

    return res.json(payments)
  } catch (error) {
    console.error("Error fetching payment history:", error)
    return res.status(500).json({ error: "Failed to retrieve payment history" })
  }
}

// Create fee extension request
export const createFeeExtension = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id
    const { reason, requestedNewDueDate } = req.body

    if (!reason || !requestedNewDueDate) {
      return res
        .status(400)
        .json({ error: "Reason and requested due date are required" })
    }

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Create fee extension request
    const feeExtension = await prisma.feeExtensionRequest.create({
      data: {
        studentId,
        reason,
        requestedNewDueDate: new Date(requestedNewDueDate),
        status: "pending",
      },
    })

    return res.status(201).json(feeExtension)
  } catch (error) {
    console.error("Error creating fee extension request:", error)
    return res
      .status(500)
      .json({ error: "Failed to create fee extension request" })
  }
}

// Get student attendance
export const getStudentAttendance = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Get semester attendance records
    const semesterAttendance = await prisma.semesterAttendance.findMany({
      where: { studentId },
      orderBy: [{ academicYear: "desc" }, { semester: "desc" }],
    })

    return res.json(semesterAttendance)
  } catch (error) {
    console.error("Error fetching attendance:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve attendance records" })
  }
}

// Get daily attendance
export const getDailyAttendance = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id
    const { startDate, endDate } = req.query

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    let dateFilter = {}
    if (startDate && endDate) {
      dateFilter = {
        markedAt: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      }
    }

    // Get daily attendance records
    const dailyAttendance = await prisma.dailyAttendance.findMany({
      where: {
        studentId,
        ...dateFilter,
      },
      include: {
        session: {
          select: {
            subject: true,
            date: true,
            startTime: true,
            endTime: true,
            teacher: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { markedAt: "desc" },
    })

    return res.json(dailyAttendance)
  } catch (error) {
    console.error("Error fetching daily attendance:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve daily attendance records" })
  }
}

// Get student grades
export const getStudentGrades = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    // Check if student exists
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Get grading records
    const grades = await prisma.grading.findMany({
      where: { studentId },
      include: {
        teacher: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { gradedAt: "desc" },
    })

    return res.json(grades)
  } catch (error) {
    console.error("Error fetching grades:", error)
    return res.status(500).json({ error: "Failed to retrieve grades" })
  }
}

// Get semester results
export const getSemesterResults = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const semesterResults = await prisma.semesterResult.findMany({
      where: { studentId },
      include: {
        subjectResults: true,
      },
      orderBy: [{ academicYear: "desc" }, { semester: "desc" }],
    })

    return res.json(semesterResults)
  } catch (error) {
    console.error("Error fetching semester results:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve semester results" })
  }
}

// Get subject results
export const getSubjectResults = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id
    const { semester, academicYear } = req.query

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    let filters: any = { studentId }
    if (semester) filters.semesterResult = { semester: Number(semester) }
    if (academicYear)
      filters.semesterResult = {
        ...filters.semesterResult,
        academicYear: academicYear as string,
      }

    const subjectResults = await prisma.subjectResult.findMany({
      where: filters,
      include: {
        semesterResult: {
          select: {
            semester: true,
            academicYear: true,
          },
        },
      },
      orderBy: [
        {
          semesterResult: {
            academicYear: "desc",
          },
        },
        {
          semesterResult: {
            semester: "desc",
          },
        },
      ],
    })

    return res.json(subjectResults)
  } catch (error) {
    console.error("Error fetching subject results:", error)
    return res.status(500).json({ error: "Failed to retrieve subject results" })
  }
}

// Get backlog records
export const getBacklogRecords = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    // Check if student exists
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Get backlog records
    const backlogs = await prisma.backlogRecord.findMany({
      where: { studentId },
      orderBy: [
        { originalAcademicYear: "desc" },
        { originalSemester: "desc" },
        { examDate: "desc" },
      ],
    })

    return res.json(backlogs)
  } catch (error) {
    console.error("Error fetching backlog records:", error)
    return res.status(500).json({ error: "Failed to retrieve backlog records" })
  }
}

// Get grade improvement attempts
export const getGradeImprovements = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    // Check if student exists
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Get grade improvement records
    const gradeImprovements = await prisma.gradeImprovement.findMany({
      where: { studentId },
      orderBy: [{ originalSemester: "desc" }, { attemptDate: "desc" }],
    })

    return res.json(gradeImprovements)
  } catch (error) {
    console.error("Error fetching grade improvement records:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve grade improvement records" })
  }
}

// Get academic progression
export const getAcademicProgression = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    // Check if student exists
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // Get academic progression records
    const progressions = await prisma.academicProgression.findMany({
      where: { studentId },
      include: {
        staff: {
          select: {
            firstName: true,
            lastName: true,
            roleTitle: true,
          },
        },
      },
      orderBy: [{ academicYear: "desc" }, { semester: "desc" }],
    })

    return res.json(progressions)
  } catch (error) {
    console.error("Error fetching academic progression:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve academic progression records" })
  }
}

// Get academic achievements
export const getAcademicAchievements = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const achievements = await prisma.academicAchievement.findMany({
      where: { studentId },
      orderBy: [
        { academicYear: "desc" },
        { semester: "desc" },
        { awardedDate: "desc" },
      ],
    })

    return res.json(achievements)
  } catch (error) {
    console.error("Error fetching academic achievements:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve academic achievements" })
  }
}

// Get job applications
export const getJobApplications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentId = req.params.id

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const applications = await prisma.jobApplication.findMany({
      where: { studentId },
      include: {
        job: {
          select: {
            jobTitle: true,
            description: true,
            postedAt: true,
            closingDate: true,
            staff: {
              select: {
                firstName: true,
                lastName: true,
                roleTitle: true,
              },
            },
          },
        },
      },
      orderBy: { applicationDate: "desc" },
    })

    return res.json(applications)
  } catch (error) {
    console.error("Error fetching job applications:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve job applications" })
  }
}

// GET /api/students/:id/learning-path - Get learning path
// export const getLearningPath = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const studentId = req.params.id

//     // Check if student exists
//     const student = await prisma.studentProfile.findUnique({
//       where: { id: studentId },
//     })

//     if (!student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     // Get learning path
//     const learningPath = await prisma.studentLearningPath.findFirst({
//       where: { studentId },
//       orderBy: { generatedAt: "desc" },
//     })

//     if (!learningPath) {
//       return res
//         .status(404)
//         .json({ error: "Learning path not found for this student" })
//     }

//     return res.json(learningPath)
//   } catch (error) {
//     console.error("Error fetching learning path:", error)
//     return res.status(500).json({ error: "Failed to retrieve learning path" })
//   }
// }
