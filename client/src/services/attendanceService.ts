import { Class, Student, AttendanceSession } from "../types/attendance"

export const getTeacherClasses = async (): Promise<Class[]> => {
  const response = await fetch("/api/classes/teacher-classes")
  if (!response.ok) throw new Error("Failed to fetch classes")
  const data = await response.json()
  return data.classes
}

export const getClassStudents = async (classId: string): Promise<Student[]> => {
  const response = await fetch(`/api/classes/${classId}/students`)
  if (!response.ok) throw new Error("Failed to fetch students")
  const data = await response.json()
  return data.students
}

export const getActiveSessions = async (): Promise<{
  active: AttendanceSession[]
  recent: AttendanceSession[]
}> => {
  const [activeResponse, recentResponse] = await Promise.all([
    fetch("/api/attendance/active-sessions"),
    fetch("/api/attendance/recent-sessions?limit=5"),
  ])
  if (!activeResponse.ok || !recentResponse.ok)
    throw new Error("Failed to fetch attendance sessions")
  const activeData = await activeResponse.json()
  const recentData = await recentResponse.json()
  return { active: activeData.sessions, recent: recentData.sessions }
}

export const createAttendanceSession = async (form: {
  classId: string
  subject: string
}): Promise<AttendanceSession> => {
  const response = await fetch("/api/attendance/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form, startTime: new Date().toISOString() }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to create attendance session")
  }
  const data = await response.json()
  return data.session
}

export const markStudentAttendance = async (payload: {
  sessionId: string
  studentId: string
  status: "present" | "absent" | "late"
  remarks?: string
}): Promise<void> => {
  const response = await fetch("/api/attendance/mark", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to mark attendance")
  }
}

export const endAttendanceSession = async (
  sessionId: string
): Promise<void> => {
  const response = await fetch("/api/attendance/end-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to end session")
  }
}

export const getSessionDetails = async (
  sessionId: string
): Promise<AttendanceSession> => {
  const response = await fetch(`/api/attendance/session/${sessionId}`)
  if (!response.ok) throw new Error("Failed to fetch session details")
  const data = await response.json()
  return data.session
}
