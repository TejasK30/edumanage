import axios from "axios"

const API_URL = "http://localhost:5000/api/notifications"

export const createNotification = async (data: any) => {
  return axios.post(API_URL, data)
}

export const getUserNotifications = async (
  userId: string,
  limit: number,
  offset: number
) => {
  return axios.get(`${API_URL}/${userId}`, { params: { limit, offset } })
}

export const markAsRead = async (notificationId: string, userId: string) => {
  return axios.patch(`${API_URL}/${notificationId}/read`, { userId })
}

export const markAllAsRead = async (userId: string) => {
  return axios.patch(`${API_URL}/read-all`, { userId })
}

export const deleteNotification = async (
  notificationId: string,
  userId: string
) => {
  return axios.delete(`${API_URL}/${notificationId}`, { data: { userId } })
}

export const getUnreadCount = async (userId: string) => {
  return axios.get(`${API_URL}/${userId}/unread-count`)
}

export const getNotificationsByType = async (
  userId: string,
  type: string,
  limit: number,
  offset: number
) => {
  return axios.get(`${API_URL}/${userId}/type/${type}`, {
    params: { limit, offset },
  })
}

export const getRelatedNotifications = async (
  userId: string,
  relatedItemId: string,
  relatedItemType: string
) => {
  return axios.get(`${API_URL}/${userId}/related/${relatedItemId}`, {
    params: { relatedItemType },
  })
}

export const sendBulkNotification = async (data: any) => {
  return axios.post(`${API_URL}/bulk`, data)
}

export const deleteAllNotifications = async (userId: string) => {
  return axios.delete(`${API_URL}/all`, { data: { userId } })
}
