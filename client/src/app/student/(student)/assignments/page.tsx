"use client"
import React from "react"

const assignments = [
  { title: "Math Homework", dueDate: "5th Feb", status: "Pending" },
  { title: "Science Project", dueDate: "7th Feb", status: "Completed" },
]

export default function AssignmentsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col md:flex-row">
      <main className="flex-1 p-4 sm:p-8 ml-0 md:ml-64 mt-16 md:mt-0">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Assignments</h1>
        {assignments.map((assignment, index) => (
          <div key={index} className="p-4 border border-muted rounded-lg mb-4">
            <h2 className="font-semibold">{assignment.title}</h2>
            <p className="text-sm">Due: {assignment.dueDate}</p>
            <p className="text-sm">Status: {assignment.status}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
