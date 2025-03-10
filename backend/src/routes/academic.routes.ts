import { Router } from "express"
import {
  getAllSemesterResults,
  getAllSubjectResults,
  getAllBacklogRecords,
  getAllGradeImprovements,
  getAllAcademicProgression,
  createSemesterResult,
  createSubjectResult,
  createBacklogRecord,
} from "../controllers/academic.controller"

const router = Router()

router.get("/api/academics/semester-results", getAllSemesterResults)
router.get("/api/academics/subject-results", getAllSubjectResults)
router.get("/api/academics/backlog-records", getAllBacklogRecords)
router.get("/api/academics/grade-improvements", getAllGradeImprovements)
router.get("/api/academics/academic-progression", getAllAcademicProgression)
router.post("/api/academics/semester-results", createSemesterResult)
router.post("/api/academics/subject-results", createSubjectResult)
router.post("/api/academics/backlog-records", createBacklogRecord)
export default router
