import {
  Class,
  ActiveSession,
  AttendanceRecord,
  AttendanceSummary,
} from "../types/attendance"

export const getStudentClasses = async (): Promise<Class[]> => {
  const response = await fetch("/api/classes/student-classes")
  if (!response.ok) {
    throw new Error("Failed to fetch classes")
  }
  const data = await response.json()
  return data.classes
}

export const getActiveSessionsForStudent = async (): Promise<
  ActiveSession[]
> => {
  const response = await fetch("/api/attendance/active-sessions-for-student")
  if (!response.ok) {
    throw new Error("Failed to fetch active sessions")
  }
  const data = await response.json()
  return data.sessions
}

export const getAttendanceRecords = async (filters: {
  subject?: string
  status?: string
  from?: string
  to?: string
}): Promise<AttendanceRecord[]> => {
  const params = new URLSearchParams()
  if (filters.subject) params.append("subject", filters.subject)
  if (filters.status) params.append("status", filters.status)
  if (filters.from) params.append("from", filters.from)
  if (filters.to) params.append("to", filters.to)

  const response = await fetch(
    `/api/attendance/student-records?${params.toString()}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch attendance records")
  }
  const data = await response.json()
  return data.records
}

export const getAttendanceSummary = async (): Promise<AttendanceSummary> => {
  const response = await fetch("/api/attendance/student-summary")
  if (!response.ok) {
    throw new Error("Failed to fetch attendance summary")
  }
  const data = await response.json()
  return data.summary
}

export const selfMarkAttendance = async (
  sessionId: string,
  status: "present" | "late"
): Promise<void> => {
  const response = await fetch("/api/attendance/self-mark", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, status }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to mark attendance")
  }
}
