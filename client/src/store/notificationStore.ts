import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  isImportant: boolean
  senderName: string
  createdAt: string
  updatedAt: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isConnected: boolean

  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  setUnreadCount: (count: number) => void
  setIsConnected: (isConnected: boolean) => void
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set) => ({
        notifications: [],
        unreadCount: 0,
        isConnected: false,

        setNotifications: (notifications) => set({ notifications }),

        addNotification: (notification) =>
          set((state) => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          })),

        markAsRead: (id) =>
          set((state) => {
            const notificationIndex = state.notifications.findIndex(
              (n) => n.id === id
            )
            if (notificationIndex === -1) return state

            const notification = state.notifications[notificationIndex]
            if (notification.isRead) return state

            const newNotifications = [...state.notifications]
            newNotifications[notificationIndex] = {
              ...notification,
              isRead: true,
            }

            return {
              notifications: newNotifications,
              unreadCount: Math.max(0, state.unreadCount - 1),
            }
          }),

        markAllAsRead: () =>
          set((state) => ({
            notifications: state.notifications.map((n) => ({
              ...n,
              isRead: true,
            })),
            unreadCount: 0,
          })),

        deleteNotification: (id) =>
          set((state) => {
            const notification = state.notifications.find((n) => n.id === id)
            const isUnread = notification && !notification.isRead

            return {
              notifications: state.notifications.filter((n) => n.id !== id),
              unreadCount: isUnread
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount,
            }
          }),

        setUnreadCount: (count) => set({ unreadCount: count }),

        setIsConnected: (isConnected) => set({ isConnected }),
      }),
      {
        name: "notification-storage",
        partialize: (state) => ({
          notifications: state.notifications.slice(0, 30),
        }),
      }
    )
  )
)
