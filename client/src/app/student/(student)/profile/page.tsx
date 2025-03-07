"use client"
import React from "react"

const profileData = {
  name: "John Doe",
  email: "johndoe@example.com",
  studentID: "123456789",
}

export default function ProfilePage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col md:flex-row">
      <main className="flex-1 p-4 sm:p-8 ml-0 md:ml-64 mt-16 md:mt-0">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Profile</h1>
        <div className="p-4 border border-muted rounded-lg">
          <h2 className="font-semibold">Name: {profileData.name}</h2>
          <p className="text-sm">Email: {profileData.email}</p>
          <p className="text-sm">Student ID: {profileData.studentID}</p>
        </div>
      </main>
    </div>
  )
}
