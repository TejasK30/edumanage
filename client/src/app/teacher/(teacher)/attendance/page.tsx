"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

type Student = {
  id: string
  fullName: string
}

type AttendanceRecord = {
  studentId: string
  isPresent: boolean
}

type AttendanceFormValues = {
  date: string // YYYY-MM-DD
  records: AttendanceRecord[]
}

export default function TeacherAttendancePage() {
  const { control, handleSubmit, register } = useForm<AttendanceFormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      records: [],
    },
  })
  const [students, setStudents] = useState<Student[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Dummy student list. In production, fetch this from an API.
  useEffect(() => {
    setStudents([
      { id: "student-1", fullName: "John Doe" },
      { id: "student-2", fullName: "Jane Smith" },
      { id: "student-3", fullName: "Alice Johnson" },
    ])
  }, [])

  // Initialize attendance records with default "present"
  const { replace } = useFieldArray({
    control,
    name: "records",
  })

  useEffect(() => {
    if (students.length > 0) {
      const initialRecords = students.map((student) => ({
        studentId: student.id,
        isPresent: true,
      }))
      replace(initialRecords)
    }
  }, [students, replace])

  const onSubmit = async (data: AttendanceFormValues) => {
    setIsSubmitting(true)
    setError(null)
    setMessage(null)
    try {
      // In production, get teacherId from auth context or cookies.
      const teacherId = localStorage.getItem("teacherId") || "teacher-123"
      const payload = {
        date: data.date,
        teacherId,
        records: data.records,
      }

      const res = await fetch("/api/teacher/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.error || "Failed to record attendance")
      }
      setMessage("Attendance recorded successfully.")
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted p-4 md:p-6 text-foreground">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Attendance</CardTitle>
          <p className="text-sm text-muted-foreground">
            Mark attendance for your class on a given date.
          </p>
          <div className="mt-2">
            <Label htmlFor="attendance-date" className="mr-2">
              Date:
            </Label>
            <Input
              id="attendance-date"
              type="date"
              {...register("date")}
              className="w-auto inline-block"
            />
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 rounded bg-destructive/10 text-destructive text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-2 rounded bg-primary-blue-50 text-primary-blue-800 text-center">
              {message}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-primary">
                  <th className="px-4 py-2 text-left">Student Name</th>
                  <th className="px-4 py-2 text-left">Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border-b">
                    <td className="px-4 py-2">{student.fullName}</td>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        {...register(`records.${index}.isPresent` as const)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <div className="flex justify-end p-4">
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Attendance"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
