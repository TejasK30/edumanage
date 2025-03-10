import { Request, Response } from "express"
import { prisma } from "../db/client"

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
