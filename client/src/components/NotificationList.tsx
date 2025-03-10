import React, { useEffect, useState } from "react"
import { getUserNotifications } from "../lib/api/notificationApi"

const NotificationList = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getUserNotifications(userId, 10, 0)
      setNotifications(response.data)
    }

    fetchNotifications()
  }, [userId])

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification: any) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationList
