import { Router } from "express"
import { NotificationController } from "../controllers/notificationController"

const router = Router()
const notificationController = new NotificationController()

router.post("/", notificationController.createNotification)
router.get("/:userId", notificationController.getUserNotifications)
router.patch("/:notificationId/read", notificationController.markAsRead)
router.patch("/read-all", notificationController.markAllAsRead)
router.delete("/:notificationId", notificationController.deleteNotification)
router.get("/:userId/unread-count", notificationController.getUnreadCount)
router.get("/:userId/type/:type", notificationController.getNotificationsByType)
router.get(
  "/:userId/related/:relatedItemId",
  notificationController.getRelatedNotifications
)
router.post("/bulk", notificationController.sendBulkNotification)
router.delete("/all", notificationController.deleteAllNotifications)

export default router
