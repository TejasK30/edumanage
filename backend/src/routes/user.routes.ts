import { Router } from "express"
import {
  getUserById,
  getUserNotifications,
  updateFcmToken,
  updateNotificationPreferences,
  updateUser,
} from "../controllers/user.controller"

const router = Router()

router.get("/api/users/:id", getUserById)
router.put("/api/users/:id", updateUser)
router.patch("/api/users/:id/fcm-token", updateFcmToken)
router.get("/api/users/:id/notifications", getUserNotifications)
router.patch(
  "/api/users/:id/notification-preferences",
  updateNotificationPreferences
)

export default router
