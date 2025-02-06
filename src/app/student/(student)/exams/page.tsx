"use client"
import React from "react"

const exams = [
  { title: "Math Final Exam", date: "10th Feb" },
  { title: "History Mid-term Exam", date: "12th Feb" },
]

export default function ExamsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col md:flex-row">
      <main className="flex-1 p-4 sm:p-8 ml-0 md:ml-64 mt-16 md:mt-0">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Exams</h1>
        {exams.map((exam, index) => (
          <div key={index} className="p-4 border border-muted rounded-lg mb-4">
            <h2 className="font-semibold">{exam.title}</h2>
            <p className="text-sm">Date: {exam.date}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
