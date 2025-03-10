import { create } from "zustand"
import {
  Class,
  ActiveSession,
  AttendanceRecord,
  AttendanceSummary,
} from "../types/attendance"
import * as api from "../services/studentAttendanceService"

interface StudentAttendanceState {
  classes: Class[]
  activeSessions: ActiveSession[]
  attendanceRecords: AttendanceRecord[]
  attendanceSummary: AttendanceSummary | null
  loading: boolean
  recordsLoading: boolean
  error: string | null
  filterSubject: string
  filterStatus: string
  filterDateFrom: string
  filterDateTo: string
  selectedRecord: AttendanceRecord | null
  showRecordDetails: boolean

  fetchStudentData: () => Promise<void>
  fetchAttendanceRecords: () => Promise<void>
  fetchAttendanceSummary: () => Promise<void>
  selfMarkAttendance: (
    sessionId: string,
    status: "present" | "late"
  ) => Promise<void>
  setFilterSubject: (subject: string) => void
  setFilterStatus: (status: string) => void
  setFilterDateFrom: (date: string) => void
  setFilterDateTo: (date: string) => void
  clearFilters: () => Promise<void>
  setSelectedRecord: (record: AttendanceRecord | null) => void
  setShowRecordDetails: (show: boolean) => void
}

export const useStudentAttendanceStore = create<StudentAttendanceState>(
  (set, get) => ({
    classes: [],
    activeSessions: [],
    attendanceRecords: [],
    attendanceSummary: null,
    loading: false,
    recordsLoading: false,
    error: null,
    filterSubject: "",
    filterStatus: "",
    filterDateFrom: "",
    filterDateTo: "",
    selectedRecord: null,
    showRecordDetails: false,

    fetchStudentData: async () => {
      set({ loading: true })
      try {
        const [classes, activeSessions] = await Promise.all([
          api.getStudentClasses(),
          api.getActiveSessionsForStudent(),
        ])
        set({ classes, activeSessions })
        await get().fetchAttendanceRecords()
        await get().fetchAttendanceSummary()
      } catch (err: any) {
        set({ error: err.message || "Failed to fetch student data" })
        console.error(err)
      } finally {
        set({ loading: false })
      }
    },

    fetchAttendanceRecords: async () => {
      set({ recordsLoading: true })
      try {
        const records = await api.getAttendanceRecords({
          subject: get().filterSubject,
          status: get().filterStatus,
          from: get().filterDateFrom,
          to: get().filterDateTo,
        })
        set({ attendanceRecords: records })
      } catch (err: any) {
        set({ error: err.message || "Failed to fetch attendance records" })
        console.error(err)
      } finally {
        set({ recordsLoading: false })
      }
    },

    fetchAttendanceSummary: async () => {
      try {
        const summary = await api.getAttendanceSummary()
        set({ attendanceSummary: summary })
      } catch (err: any) {
        console.error("Failed to fetch attendance summary", err)
      }
    },

    selfMarkAttendance: async (
      sessionId: string,
      status: "present" | "late"
    ) => {
      try {
        await api.selfMarkAttendance(sessionId, status)
        set((state) => ({
          activeSessions: state.activeSessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  studentAttendance: {
                    id: "temp-id",
                    status,
                    markedAt: new Date().toISOString(),
                  },
                }
              : session
          ),
          error: null,
        }))
      } catch (err: any) {
        set({ error: err.message || "Failed to mark attendance" })
        console.error(err)
      }
    },

    setFilterSubject: (subject: string) => set({ filterSubject: subject }),
    setFilterStatus: (status: string) => set({ filterStatus: status }),
    setFilterDateFrom: (date: string) => set({ filterDateFrom: date }),
    setFilterDateTo: (date: string) => set({ filterDateTo: date }),
    clearFilters: async () => {
      set({
        filterSubject: "",
        filterStatus: "",
        filterDateFrom: "",
        filterDateTo: "",
      })
      await get().fetchAttendanceRecords()
    },
    setSelectedRecord: (record: AttendanceRecord | null) =>
      set({ selectedRecord: record }),
    setShowRecordDetails: (show: boolean) => set({ showRecordDetails: show }),
  })
)
