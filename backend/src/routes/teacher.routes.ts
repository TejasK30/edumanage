import { Router } from "express"
import {
  getAllTeachers,
  getTeacherById,
  getTeacherClasses,
  getTeacherTimetable,
  getTeacherResources,
  createTeacherResource,
  getTeacherFeedbacks,
  getTeacherGrading,
  getTeacherLmsModules,
  createTeacherLmsModule,
} from "../controllers/teacher.controller"

const router = Router()

router.get("/api/teachers", getAllTeachers)
router.get("/api/teachers/:id", getTeacherById)
router.get("/api/teachers/:id/classes", getTeacherClasses)
router.get("/api/teachers/:id/timetable", getTeacherTimetable)
router.get("/api/teachers/:id/resources", getTeacherResources)
router.post("/api/teachers/:id/resources", createTeacherResource)
router.get("/api/teachers/:id/feedbacks", getTeacherFeedbacks)
router.get("/api/teachers/:id/grading", getTeacherGrading)
router.get("/api/teachers/:id/lms-modules", getTeacherLmsModules)
router.post("/api/teachers/:id/lms-modules", createTeacherLmsModule)

export default router
