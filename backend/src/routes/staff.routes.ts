import { Router } from "express"
import {
  getAllStaff,
  getStaffById,
  createJobPosting,
  getStaffFeeExtensions,
  updateFeeExtensionStatus,
  getStaffAcademicDecisions,
} from "../controllers/staff.controller"

const router = Router()

router.get("/api/staff", getAllStaff)
router.get("/api/staff/:id", getStaffById)
router.post("/api/staff/:id/job-postings", createJobPosting)
router.get("/api/staff/:id/fee-extensions", getStaffFeeExtensions)
router.patch(
  "/api/staff/:id/fee-extensions/:extensionId",
  updateFeeExtensionStatus
)
router.get("/api/staff/:id/academic-decisions", getStaffAcademicDecisions)

export default router
