import { Router } from "express"
import {
  getStudentPayments,
  createFeeExtension,
  getAcademicAchievements,
  getAcademicProgression,
  getBacklogRecords,
  getDailyAttendance,
  getGradeImprovements,
  getJobApplications,
  getLearningPath,
  getSemesterResults,
  getStudentAttendance,
  getStudentGrades,
  getSubjectResults,
  getStudentFees,
  getStudentSemesterSubjects,
  getStudentProfile,
  getStudentById,
  getAllStudents,
} from "../controllers/student.controller"

const router = Router()

router.get("/api/students", getAllStudents)
router.get("/api/students/:id", getStudentById)
router.get("/api/students/:id/profile", getStudentProfile)
router.get("/api/students/:id/semester-subjects", getStudentSemesterSubjects)
router.get("/api/students/:id/fees", getStudentFees)
router.get("/api/students/:id/payments", getStudentPayments)
router.post("/api/students/:id/fee-extension", createFeeExtension)
router.get("/api/students/:id/attendance", getStudentAttendance)
router.get("/api/students/:id/daily-attendance", getDailyAttendance)
router.get("/api/students/:id/grades", getStudentGrades)
router.get("/api/students/:id/semester-results", getSemesterResults)
router.get("/api/students/:id/subject-results", getSubjectResults)
router.get("/api/students/:id/backlogs", getBacklogRecords)
router.get("/api/students/:id/grade-improvements", getGradeImprovements)
router.get("/api/students/:id/academic-progression", getAcademicProgression)
router.get("/api/students/:id/academic-achievements", getAcademicAchievements)
router.get("/api/students/:id/job-applications", getJobApplications)
router.get("/api/students/:id/learning-path", getLearningPath)

export default router
