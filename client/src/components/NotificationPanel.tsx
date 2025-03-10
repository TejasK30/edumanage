import { useEffect } from "react"
import { X, CheckCheck, Trash2 } from "lucide-react"
import { Notification } from "@/store/notificationStore"
import { formatDistanceToNow } from "date-fns"
import {
  useDeleteNotification,
  useMarkAllAsRead,
  useMarkAsRead,
  useNotifications,
} from "@/hooks/useNotificationService"
import { Badge } from "./ui/badge"

interface NotificationPanelProps {
  onClose: () => void
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { data, isLoading, refetch } = useNotifications()
  const { mutate: markAllAsRead } = useMarkAllAsRead()
  const { mutate: markAsRead } = useMarkAsRead()
  const { mutate: deleteNotification } = useDeleteNotification()

  // Refetch on first render
  useEffect(() => {
    refetch()
  }, [refetch])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Badge variant="info">Info</Badge>
      case "success":
        return <Badge variant="success">Success</Badge>
      case "warning":
        return <Badge variant="warning">Warning</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="info">Info</Badge>
    }
  }

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
  }

  const handleDelete = (id: string) => {
    deleteNotification(id)
  }

  return (
    <div className="max-h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b border-Neutrals/neutrals-4 dark:border-Neutrals/neutrals-10">
        <h3 className="font-medium">Notifications</h3>
        <div className="flex gap-2">
          <button
            onClick={() => markAllAsRead()}
            className="p-1.5 text-xs text-Neutrals/neutrals-7 hover:bg-Neutrals/neutrals-3 dark:hover:bg-Neutrals/neutrals-10 rounded transition-colors"
          >
            <CheckCheck className="h-4 w-4 mr-1 inline-block" />
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-Neutrals/neutrals-3 dark:hover:bg-Neutrals/neutrals-10 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
        {isLoading ? (
          <div className="p-4 text-center text-Neutrals/neutrals-7">
            Loading notifications...
          </div>
        ) : data?.notifications?.length ? (
          <ul>
            {data.notifications.map((notification: Notification) => (
              <li
                key={notification.id}
                className={`p-4 border-b border-Neutrals/neutrals-4 dark:border-Neutrals/neutrals-10 hover:bg-Neutrals/neutrals-3 dark:hover:bg-Neutrals/neutrals-12 transition-colors ${
                  !notification.isRead
                    ? "bg-washed-blue-50 dark:bg-sidebar-accent/10"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium mb-1">{notification.title}</p>
                      <span className="text-xs text-Neutrals/neutrals-7 whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-Neutrals/neutrals-8 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      {notification.link && (
                        <a
                          href={notification.link}
                          className="text-xs text-primary-blue-500 hover:underline"
                        >
                          View details
                        </a>
                      )}
                      <div className="flex gap-2 ml-auto">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 text-Neutrals/neutrals-7 hover:text-primary-blue-500 transition-colors"
                            aria-label="Mark as read"
                          >
                            <CheckCheck className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-1 text-Neutrals/neutrals-7 hover:text-destructive transition-colors"
                          aria-label="Delete notification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-Neutrals/neutrals-7">
            <p className="mb-1">No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}
