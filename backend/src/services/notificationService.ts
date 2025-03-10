import { prisma } from "../db/client"
import sseManager from "../utils/sse"
import { sendEmail } from "../utils/emailService"
interface CreateNotificationDto {
  userId: string
  senderId: string
  title: string
  message: string
  type: string
  relatedItemId?: string
  relatedItemType?: string
  isRead?: boolean
  isImportant?: boolean
}

export class NotificationService {
  async createNotification(data: CreateNotificationDto) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId: data.userId,
          senderId: data.senderId,
          title: data.title,
          message: data.message,
          type: data.type,
          relatedItemId: data.relatedItemId,
          relatedItemType: data.relatedItemType,
          isRead: data.isRead || false,
          isImportant: data.isImportant || false,
        },
        include: {
          sender: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              email: true,
              name: true,
              NotificationPreference: true,
            },
          },
        },
      })

      // Send notification through SSE
      sseManager.sendToUser(data.userId, "new_notification", {
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isImportant: notification.isImportant,
        senderName: notification.sender.name,
        createdAt: notification.createdAt,
      })

      // Send email notifications
      if (
        notification.isImportant &&
        notification.user.email &&
        notification.user.NotificationPreference?.emailNotifications
      ) {
        await sendEmail({
          to: notification.user.email,
          subject: `Important: ${notification.title}`,
          template: "important-notification",
          context: {
            userName: notification.user.name,
            title: notification.title,
            message: notification.message,
            senderName: notification.sender.name,
            date: notification.createdAt.toLocaleString(),
          },
        })
      }

      return notification
    } catch (error) {
      throw error
    }
  }

  async sendBulkNotification(
    userIds: string[],
    senderId: string,
    data: Omit<CreateNotificationDto, "userId" | "senderId">
  ) {
    try {
      // Get sender details for SSE
      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: { name: true },
      })

      if (!sender) {
        throw new Error("Sender not found")
      }

      const result = await prisma.notification.createMany({
        data: userIds.map((userId) => ({
          userId,
          senderId,
          title: data.title,
          message: data.message,
          type: data.type,
          relatedItemId: data.relatedItemId,
          relatedItemType: data.relatedItemType,
          isRead: false,
          isImportant: data.isImportant || false,
        })),
      })

      // getting user emails
      if (data.isImportant) {
        const users = await prisma.user.findMany({
          where: {
            id: { in: userIds },
            NotificationPreference: {
              emailNotifications: true,
            },
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        })

        // Send emails in batches
        const emailPromises = users.map((user) => {
          if (user.email) {
            return sendEmail({
              to: user.email,
              subject: `Important: ${data.title}`,
              template: "important-notification",
              context: {
                userName: user.name,
                title: data.title,
                message: data.message,
                senderName: sender.name,
                date: new Date().toLocaleString(),
              },
            })
          }
          return Promise.resolve()
        })

        //sending emails in 10 batch
        const batchSize = 10
        for (let i = 0; i < emailPromises.length; i += batchSize) {
          await Promise.all(emailPromises.slice(i, i + batchSize))
        }
      }

      // Send SSE events to all users
      userIds.forEach((userId) => {
        sseManager.sendToUser(userId, "new_notification", {
          title: data.title,
          message: data.message,
          type: data.type,
          isImportant: data.isImportant,
          senderName: sender.name,
          createdAt: new Date(),
        })
      })

      return {
        count: result.count,
        success: true,
      }
    } catch (error) {
      throw error
    }
  }

  async getUserNotifications(userId: string, limit = 20, offset = 0) {
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
        },
        include: {
          sender: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      })

      const count = await prisma.notification.count({
        where: {
          userId,
        },
      })

      const unreadCount = await prisma.notification.count({
        where: {
          userId,
          isRead: false,
        },
      })

      return {
        notifications,
        count,
        unreadCount,
      }
    } catch (error) {
      throw error
    }
  }

  async markAsRead(notificationId: string, userId: string) {
    try {
      // Verify the notification belongs to the user
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
      })

      if (!notification) {
        throw new Error("Notification not found")
      }

      // Update the notification
      const updatedNotification = await prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          isRead: true,
        },
      })

      return updatedNotification
    } catch (error) {
      throw error
    }
  }

  async markAllAsRead(userId: string) {
    try {
      const result = await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      })

      return {
        success: true,
        count: result.count,
      }
    } catch (error) {
      throw error
    }
  }

  async deleteNotification(notificationId: string, userId: string) {
    try {
      // Verify the notification belongs to the user
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
      })

      if (!notification) {
        throw new Error("Notification not found")
      }

      // Delete the notification
      await prisma.notification.delete({
        where: {
          id: notificationId,
        },
      })

      return { success: true }
    } catch (error) {
      throw error
    }
  }

  async getUnreadCount(userId: string) {
    try {
      const count = await prisma.notification.count({
        where: {
          userId,
          isRead: false,
        },
      })

      return { count }
    } catch (error) {
      throw error
    }
  }

  async getNotificationsByType(
    userId: string,
    type: string,
    limit = 20,
    offset = 0
  ) {
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
          type,
        },
        include: {
          sender: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      })

      const count = await prisma.notification.count({
        where: {
          userId,
          type,
        },
      })

      return {
        notifications,
        count,
      }
    } catch (error) {
      throw error
    }
  }

  async getRelatedNotifications(
    userId: string,
    relatedItemId: string,
    relatedItemType?: string
  ) {
    try {
      const whereClause: any = {
        userId,
        relatedItemId,
      }

      if (relatedItemType) {
        whereClause.relatedItemType = relatedItemType
      }

      const notifications = await prisma.notification.findMany({
        where: whereClause,
        include: {
          sender: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return notifications
    } catch (error) {
      throw error
    }
  }

  async deleteAllNotifications(userId: string) {
    try {
      const result = await prisma.notification.deleteMany({
        where: {
          userId,
        },
      })

      return {
        success: true,
        count: result.count,
      }
    } catch (error) {
      throw error
    }
  }
}

export const notificationService = new NotificationService()
