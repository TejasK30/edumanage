import { Router, Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../db/client"

const router = Router()

const feedbackSchema = z.object({
  studentId: z.string(),
  teacherId: z.string().optional(),
  teacherFeedback: z.object({
    clarity: z.number().min(1).max(5),
    expertise: z.number().min(1).max(5),
    engagement: z.number().min(1).max(5),
    punctuality: z.number().min(1).max(5),
    assessment: z.number().min(1).max(5),
    subjectContent: z.number().min(1).max(5),
    overallTeacher: z.number().min(1).max(5),
    teacherComment: z.string().optional(),
  }),
  collegeFeedback: z.object({
    facilities: z.number().min(1).max(5),
    campusLife: z.number().min(1).max(5),
    administration: z.number().min(1).max(5),
    academicEnvironment: z.number().min(1).max(5),
    overallCollege: z.number().min(1).max(5),
    collegeComment: z.string().optional(),
  }),
})

router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const parsed = feedbackSchema.parse(req.body)

    await prisma.feedback.create({
      data: {
        studentId: parsed.studentId,
        teacherId: parsed.teacherId || null,
        feedbackType: "teacher",
        message: JSON.stringify(parsed.teacherFeedback),
        rating: parsed.teacherFeedback.overallTeacher,
      },
    })

    await prisma.feedback.create({
      data: {
        studentId: parsed.studentId,
        teacherId: parsed.teacherId || null,
        feedbackType: "college",
        message: JSON.stringify(parsed.collegeFeedback),
        rating: parsed.collegeFeedback.overallCollege,
      },
    })

    return res.status(200).json({ message: "Feedback submitted successfully" })
  } catch (err: any) {
    console.error("Feedback error:", err)
    return res.status(500).json({ error: "Error submitting feedback" })
  }
})

export default router
