import { Router, Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../db/client"
import {
  createSession,
  endSession,
  getActiveSessions,
  getClassAttendanceStats,
  getSessionDetails,
  getStudentAttendance,
  markAttendance,
} from "../controllers/attendanceController"

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

router.post(
  "/create-session",
  (req: Request, res: Response): Promise<any> => createSession(req, res)
)
router.post(
  "/mark-attendance",
  (req: Request, res: Response): Promise<any> => markAttendance(req, res)
)
router.post(
  "/end-session",
  (req: Request, res: Response): Promise<any> => endSession(req, res)
)
router.get(
  "/session/:sessionId",
  (req: Request, res: Response): Promise<any> => getSessionDetails(req, res)
)
router.get(
  "/student/:studentId/attendance",
  (req: Request, res: Response): Promise<any> => getStudentAttendance(req, res)
)
router.get(
  "/class/:classId/stats",
  (req: Request, res: Response): Promise<any> =>
    getClassAttendanceStats(req, res)
)
router.get(
  "/teacher/active-sessions",
  (req: Request, res: Response): Promise<any> => getActiveSessions(req, res)
)

export default router
