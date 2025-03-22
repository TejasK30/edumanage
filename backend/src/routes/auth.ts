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

router.post("/verify-email", verifyEmail)
router.post("/resend-otp", resendOTP)
router.get("/profile", isAuthenticated, ProfileController)

export default router
