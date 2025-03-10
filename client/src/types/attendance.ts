export interface Class {
  id: string
  name: string
  grade: string
}

export interface Student {
  id: string
  user: {
    name: string
    email: string
  }
  customId?: string
}

export interface AttendanceSession {
  id: string
  classId: string
  subject: string
  startTime: string
  endTime: string | null
  status: "ongoing" | "completed"
  class: {
    name: string
  }
  studentAttendance?: Array<{
    id: string
    studentId: string
    status: "present" | "absent" | "late"
    markedAt: string
    student: {
      user: {
        name: string
      }
    }
  }>
}

export interface Class {
  id: string
  name: string
  grade: string
  teacher: {
    name: string
  }
}

export interface ActiveSession {
  id: string
  classId: string
  subject: string
  startTime: string
  endTime: string | null
  status: "ongoing" | "completed"
  class: {
    name: string
  }
  studentAttendance?: {
    id: string
    status: "present" | "absent" | "late"
    markedAt: string
  } | null
}

export interface AttendanceRecord {
  id: string
  sessionId: string
  studentId: string
  status: "present" | "absent" | "late"
  markedAt: string
  remarks?: string
  session: {
    subject: string
    startTime: string
    endTime: string | null
    class: {
      name: string
    }
  }
}

export interface AttendanceSummary {
  totalSessions: number
  presentCount: number
  absentCount: number
  lateCount: number
  attendancePercentage: number
  subjectBreakdown: {
    [subject: string]: {
      total: number
      present: number
      absent: number
      late: number
      percentage: number
    }
  }
}
