import { Router, Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../db/client"

const router = Router()

const attendanceSchema = z.object({
  date: z.string(),
  teacherId: z.string(),
  records: z.array(
    z.object({
      studentId: z.string(),
      isPresent: z.boolean(),
    })
  ),
})

router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { date, teacherId, records } = attendanceSchema.parse(req.body)
    const attendanceDate = new Date(date)

    await prisma.attendance.createMany({
      data: records.map((record) => ({
        studentId: record.studentId,
        teacherId: teacherId,
        date: attendanceDate,
        isPresent: record.isPresent,
      })),
    })

    return res.status(200).json({ message: "Attendance recorded successfully" })
  } catch (err: any) {
    console.error("Attendance error:", err)
    return res.status(500).json({ error: "Error recording attendance" })
  }
})

export default router
