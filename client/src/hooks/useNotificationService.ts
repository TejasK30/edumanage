import { notificationApi } from "@/services/notificationService"
import { useNotificationStore } from "@/store/notificationStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useNotifications = (limit = 20, offset = 0) => {
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  )
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount)

  return useMutation({
    mutationFn: () => notificationApi.getUserNotifications(limit, offset),
    onSuccess: (data) => {
      setNotifications(data.notifications)
      setUnreadCount(data.unreadCount)
    },
  })
}

export const useUnreadCount = () => {
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount)

  return useMutation({
    mutationFn: () => notificationApi.getUnreadCount(),
    onSuccess: (data) => {
      setUnreadCount(data.count)
    },
  })
}
export const useMarkAsRead = () => {
  const queryClient = useQueryClient()
  const markAsRead = useNotificationStore((state) => state.markAsRead)

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationApi.markAsRead(notificationId),
    onSuccess: (_, notificationId) => {
      markAsRead(notificationId)
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] })
    },
  })
}

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient()
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead)

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      markAllAsRead()
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] })
    },
  })
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()
  const deleteNotification = useNotificationStore(
    (state) => state.deleteNotification
  )

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationApi.deleteNotification(notificationId),
    onSuccess: (_, notificationId) => {
      deleteNotification(notificationId)
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}
