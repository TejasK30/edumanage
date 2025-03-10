import { Router } from "express"
import {
  getAllClasses,
  getClassById,
  getClassStudents,
  getClassTeachers,
  getClassAttendanceSessions,
  createAttendanceSession,
} from "../controllers/class.controller"

const router = Router()

router.get("/api/classes", getAllClasses)
router.get("/api/classes/:id", getClassById)
router.get("/api/classes/:id/students", getClassStudents)
router.get("/api/classes/:id/teachers", getClassTeachers)
router.get("/api/classes/:id/attendance-sessions", getClassAttendanceSessions)
router.post("/api/classes/:id/attendance-sessions", createAttendanceSession)

export default router
