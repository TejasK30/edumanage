import express from "express"
import { createCollege } from "../controllers/collegeController"

const router = express.Router()

router.post("/", createCollege)

export default router
