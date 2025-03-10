import { Request, Response } from "express"
import { prisma } from "../db/client"

export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { department, college, page = 1, limit = 10, search } = req.query
    const pageNum = Number(page)
    const limitNum = Number(limit)

    let filters: any = {}
    if (department) filters.department = department as string
    if (college) filters.collegeId = college as string
    if (search) {
      filters.OR = [
        { firstName: { contains: search as string, mode: "insensitive" } },
        { lastName: { contains: search as string, mode: "insensitive" } },
        { middleName: { contains: search as string, mode: "insensitive" } },
      ]
    }

    const totalCount = await prisma.teacherProfile.count({ where: filters })

    // Get teachers with pagination
    const teachers = await prisma.teacherProfile.findMany({
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
      teachers,
      meta: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    })
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return res.status(500).json({ error: "Failed to retrieve teachers" })
  }
}

// Get teacher by ID
export const getTeacherById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
      include: {
        user: {
          select: {
            email: true,
            isOnline: true,
            lastSeen: true,
            createdAt: true,
          },
        },
        college: {
          select: {
            name: true,
            code: true,
            address: true,
          },
        },
      },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    return res.json(teacher)
  } catch (error) {
    console.error("Error fetching teacher:", error)
    return res.status(500).json({ error: "Failed to retrieve teacher" })
  }
}

// Get teacher's assigned classes
export const getTeacherClasses = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id

    // Check if teacher exists
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    // Get assigned classes
    const classes = await prisma.classTeacher.findMany({
      where: { teacherId },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            year: true,
            section: true,
            department: true,
            college: {
              select: {
                name: true,
              },
            },
            _count: {
              select: {
                students: true,
              },
            },
          },
        },
      },
    })

    return res.json(classes)
  } catch (error) {
    console.error("Error fetching teacher classes:", error)
    return res.status(500).json({ error: "Failed to retrieve teacher classes" })
  }
}

// Get teacher's timetable
export const getTeacherTimetable = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    const timetable = await prisma.timetable.findMany({
      where: { teacherId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    })

    // Organize by day of week
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]
    const organized: { [key: string]: any[] } = {}

    days.forEach((day) => {
      organized[day] = timetable.filter((entry) => entry.dayOfWeek === day)
    })

    return res.json(organized)
  } catch (error) {
    console.error("Error fetching teacher timetable:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve teacher timetable" })
  }
}

// Get teacher's resources
export const getTeacherResources = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id
    const { type } = req.query

    // Check if teacher exists
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    let filter: any = { teacherId }
    if (type) filter.resourceType = type as string

    const resources = await prisma.teacherResource.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
    })

    return res.json(resources)
  } catch (error) {
    console.error("Error fetching teacher resources:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve teacher resources" })
  }
}

// Create new teacher resource
export const createTeacherResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id
    const { title, resourceType, content, metadata } = req.body

    if (!title || !resourceType) {
      return res
        .status(400)
        .json({ error: "Title and resource type are required" })
    }

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    // Create resource
    const resource = await prisma.teacherResource.create({
      data: {
        teacherId,
        title,
        resourceType,
        content,
        metadata: metadata ? metadata : undefined,
      },
    })

    return res.status(201).json(resource)
  } catch (error) {
    console.error("Error creating teacher resource:", error)
    return res.status(500).json({ error: "Failed to create teacher resource" })
  }
}

// Get feedbacks for teacher
export const getTeacherFeedbacks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { teacherId },
      select: {
        id: true,
        feedbackType: true,
        message: true,
        rating: true,
        createdAt: true,
        student: {
          select: {
            id: true,
            fullName: true,
            currentSemester: true,
            department: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Calculate average rating
    const ratings = feedbacks
      .map((f) => f.rating)
      .filter((r) => r !== null) as number[]
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : null

    return res.json({
      feedbacks,
      meta: {
        count: feedbacks.length,
        averageRating,
      },
    })
  } catch (error) {
    console.error("Error fetching teacher feedbacks:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve teacher feedbacks" })
  }
}

// Get grading done by teacher
export const getTeacherGrading = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id
    const { subject, semester } = req.query

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    let filter: any = { teacherId }
    if (subject) filter.subject = subject as string

    const gradings = await prisma.grading.findMany({
      where: filter,
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            currentSemester: true,
            className: true,
            department: true,
          },
        },
      },
      orderBy: { gradedAt: "desc" },
    })

    // Filter by semester if provided
    let filteredGradings = gradings
    if (semester) {
      filteredGradings = gradings.filter(
        (g) => g.student.currentSemester === Number(semester)
      )
    }

    return res.json(filteredGradings)
  } catch (error) {
    console.error("Error fetching teacher grading:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve teacher grading records" })
  }
}

// Get LMS modules created by teacher
export const getTeacherLmsModules = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id
    const { type, subject } = req.query

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    let filter: any = { teacherId }
    if (type) filter.type = type as string
    if (subject) filter.subject = subject as string

    const modules = await prisma.lmsModule.findMany({
      where: filter,
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return res.json(modules)
  } catch (error) {
    console.error("Error fetching teacher LMS modules:", error)
    return res
      .status(500)
      .json({ error: "Failed to retrieve teacher LMS modules" })
  }
}

// Create new LMS module
export const createTeacherLmsModule = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const teacherId = req.params.id
    const { title, description, type, content, subject, classId } = req.body

    if (!title || !type || !content || !subject || !classId) {
      return res.status(400).json({
        error: "Title, type, content, subject, and classId are required",
      })
    }

    const teacher = await prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    const classExists = await prisma.class.findUnique({
      where: { id: classId },
    })

    if (!classExists) {
      return res.status(404).json({ error: "Class not found" })
    }

    const lmsModule = await prisma.lmsModule.create({
      data: {
        teacherId,
        title,
        description,
        type,
        content,
        subject,
        classId,
      },
    })

    return res.status(201).json(lmsModule)
  } catch (error) {
    console.error("Error creating LMS module:", error)
    return res.status(500).json({ error: "Failed to create LMS module" })
  }
}
