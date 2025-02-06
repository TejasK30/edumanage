"use client"
import React from "react"

const notifications = [
  { message: "Assignment Due Tomorrow: Math Homework", date: "4th Feb" },
  { message: "New Study Group Created: Science", date: "2nd Feb" },
]

export default function NotificationsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col md:flex-row">
      <main className="flex-1 p-4 sm:p-8 ml-0 md:ml-64 mt-16 md:mt-0">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>
        {notifications.map((notification, index) => (
          <div key={index} className="p-4 border border-muted rounded-lg mb-4">
            <p className="font-semibold">{notification.message}</p>
            <p className="text-sm text-muted-foreground">{notification.date}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
