import api from "@/lib/api/api"
import { Notification } from "@/store/notificationStore"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface GetNotificationsResponse {
  notifications: Notification[]
  count: number
  unreadCount: number
}

export interface NotificationResponse {
  success: boolean
  message: string
  data: any
}

export const notificationApi = {
  getUserNotifications: async (
    limit = 20,
    offset = 0
  ): Promise<GetNotificationsResponse> => {
    const { data } = await api.get(
      `/notifications?limit=${limit}&offset=${offset}`
    )
    return data.data
  },

  markAsRead: async (notificationId: string): Promise<NotificationResponse> => {
    const { data } = await api.put(`/notifications/${notificationId}/read`)
    return data
  },

  markAllAsRead: async (): Promise<NotificationResponse> => {
    const { data } = await api.put("/notifications/read-all")
    return data
  },

  deleteNotification: async (
    notificationId: string
  ): Promise<NotificationResponse> => {
    const { data } = await api.delete(`/notifications/${notificationId}`)
    return data
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    const { data } = await api.get("/notifications/unread-count")
    return data.data
  },

  getNotificationsByType: async (
    type: string,
    limit = 20,
    offset = 0
  ): Promise<GetNotificationsResponse> => {
    const { data } = await api.get(
      `/notifications/type/${type}?limit=${limit}&offset=${offset}`
    )
    return data.data
  },

  updateNotificationPreferences: async (
    preferences: any
  ): Promise<NotificationResponse> => {
    const { data } = await api.put("/notifications/preferences", preferences)
    return data
  },

  getNotificationPreferences: async (): Promise<any> => {
    const { data } = await api.get("/notifications/preferences")
    return data.data
  },
}
