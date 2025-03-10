import {
  LoginController,
  ProfileController,
  RegisterController,
  resendOTP,
  verifyEmail,
} from "../controllers/authController"
import { Router } from "express"
import { isAuthenticated } from "../utils/authUtils"

const router = Router()

router.post("/login", LoginController)

router.post("/register", RegisterController)

router.post("/api/auth/verify-email", verifyEmail)
router.post("/api/auth/resend-otp", resendOTP)
router.get("/api/auth/profile", isAuthenticated, ProfileController)

export default router
