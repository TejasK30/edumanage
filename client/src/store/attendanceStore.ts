import { Class, Student, AttendanceSession } from "../types/attendance"
import * as api from "../services/attendanceService"
import { create } from "zustand"

interface AttendanceState {
  classes: Class[]
  students: Student[]
  activeSessions: AttendanceSession[]
  recentSessions: AttendanceSession[]
  loading: boolean
  sessionLoading: boolean
  error: string | null
  selectedSession: AttendanceSession | null
  sessionDetails: AttendanceSession | null
  sessionDetailsLoading: boolean
  fetchTeacherClasses: () => Promise<void>
  fetchClassStudents: (classId: string) => Promise<void>
  fetchActiveSessions: () => Promise<void>
  createSession: (form: { classId: string; subject: string }) => Promise<void>
  markAttendance: (
    sessionId: string,
    attendanceData: Record<
      string,
      { status: "present" | "absent" | "late"; remarks?: string }
    >
  ) => Promise<void>
  endSession: (sessionId: string) => Promise<void>
  fetchSessionDetails: (sessionId: string) => Promise<void>
  setSelectedSession: (session: AttendanceSession | null) => void
  clearError: () => void
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  classes: [],
  students: [],
  activeSessions: [],
  recentSessions: [],
  loading: false,
  sessionLoading: false,
  error: null,
  selectedSession: null,
  sessionDetails: null,
  sessionDetailsLoading: false,
  fetchTeacherClasses: async () => {
    set({ loading: true })
    try {
      const classes = await api.getTeacherClasses()
      set({ classes })
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch classes" })
    } finally {
      set({ loading: false })
    }
  },
  fetchClassStudents: async (classId: string) => {
    set({ loading: true })
    try {
      const students = await api.getClassStudents(classId)
      set({ students })
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch students" })
    } finally {
      set({ loading: false })
    }
  },
  fetchActiveSessions: async () => {
    set({ sessionLoading: true })
    try {
      const { active, recent } = await api.getActiveSessions()
      set({ activeSessions: active, recentSessions: recent })
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch sessions" })
    } finally {
      set({ sessionLoading: false })
    }
  },
  createSession: async (form: { classId: string; subject: string }) => {
    set({ sessionLoading: true })
    try {
      const session = await api.createAttendanceSession(form)
      set((state) => ({
        activeSessions: [...state.activeSessions, session],
        error: null,
      }))
    } catch (err: any) {
      set({ error: err.message || "Failed to create session" })
    } finally {
      set({ sessionLoading: false })
    }
  },
  markAttendance: async (
    sessionId: string,
    attendanceData: Record<
      string,
      { status: "present" | "absent" | "late"; remarks?: string }
    >
  ) => {
    try {
      for (const studentId of Object.keys(attendanceData)) {
        await api.markStudentAttendance({
          sessionId,
          studentId,
          status: attendanceData[studentId].status,
          remarks: attendanceData[studentId].remarks,
        })
      }
      set({ selectedSession: null, error: null })
      await get().fetchActiveSessions()
    } catch (err: any) {
      set({ error: err.message || "Failed to mark attendance" })
    }
  },
  endSession: async (sessionId: string) => {
    set({ sessionLoading: true })
    try {
      await api.endAttendanceSession(sessionId)
      set((state) => ({
        activeSessions: state.activeSessions.filter((s) => s.id !== sessionId),
        error: null,
      }))
      await get().fetchActiveSessions()
    } catch (err: any) {
      set({ error: err.message || "Failed to end session" })
    } finally {
      set({ sessionLoading: false })
    }
  },
  fetchSessionDetails: async (sessionId: string) => {
    set({ sessionDetailsLoading: true })
    try {
      const session = await api.getSessionDetails(sessionId)
      set({ sessionDetails: session })
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch session details" })
    } finally {
      set({ sessionDetailsLoading: false })
    }
  },
  setSelectedSession: (session: AttendanceSession | null) =>
    set({ selectedSession: session }),
  clearError: () => set({ error: null }),
}))
