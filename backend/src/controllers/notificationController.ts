import { Request, Response } from "express"
import { notificationService } from "../services/notificationService"
import { ResponseHandler } from "../utils/responseHandler"

export class NotificationController {
  async createNotification(req: Request, res: Response): Promise<any> {
    try {
      const notification = await notificationService.createNotification(
        req.body
      )
      return ResponseHandler.success(
        res,
        "Notification created successfully",
        notification,
        201
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async getUserNotifications(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.params
      const { limit, offset } = req.query
      const notifications = await notificationService.getUserNotifications(
        userId,
        Number(limit),
        Number(offset)
      )
      return ResponseHandler.success(
        res,
        "User notifications retrieved successfully",
        notifications
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async markAsRead(req: Request, res: Response): Promise<any> {
    try {
      const { notificationId } = req.params
      const { userId } = req.body
      const notification = await notificationService.markAsRead(
        notificationId,
        userId
      )
      return ResponseHandler.success(
        res,
        "Notification marked as read",
        notification
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async markAllAsRead(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.body
      const result = await notificationService.markAllAsRead(userId)
      return ResponseHandler.success(
        res,
        "All notifications marked as read",
        result
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async deleteNotification(req: Request, res: Response): Promise<any> {
    try {
      const { notificationId } = req.params
      const { userId } = req.body
      const result = await notificationService.deleteNotification(
        notificationId,
        userId
      )
      return ResponseHandler.success(
        res,
        "Notification deleted successfully",
        result
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async getUnreadCount(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.params
      const count = await notificationService.getUnreadCount(userId)
      return ResponseHandler.success(
        res,
        "Unread notifications count retrieved successfully",
        count
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async getNotificationsByType(req: Request, res: Response): Promise<any> {
    try {
      const { userId, type } = req.params
      const { limit, offset } = req.query
      const notifications = await notificationService.getNotificationsByType(
        userId,
        type,
        Number(limit),
        Number(offset)
      )
      return ResponseHandler.success(
        res,
        "Notifications by type retrieved successfully",
        notifications
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async getRelatedNotifications(req: Request, res: Response): Promise<any> {
    try {
      const { userId, relatedItemId } = req.params
      const { relatedItemType } = req.query
      const notifications = await notificationService.getRelatedNotifications(
        userId,
        relatedItemId,
        relatedItemType as string
      )
      return ResponseHandler.success(
        res,
        "Related notifications retrieved successfully",
        notifications
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async sendBulkNotification(req: Request, res: Response): Promise<any> {
    try {
      const { userIds, senderId, data } = req.body
      const result = await notificationService.sendBulkNotification(
        userIds,
        senderId,
        data
      )
      return ResponseHandler.success(
        res,
        "Bulk notifications sent successfully",
        result
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }

  async deleteAllNotifications(req: Request, res: Response): Promise<any> {
    try {
      const { userId } = req.body
      const result = await notificationService.deleteAllNotifications(userId)
      return ResponseHandler.success(
        res,
        "All notifications deleted successfully",
        result
      )
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }
}
