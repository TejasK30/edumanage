import { create } from "zustand"
import { Student } from "@/types"
import api from "@/lib/api/api"

interface StudentsState {
  students: Student[]
  currentStudent: Student | null
  isLoading: boolean
  error: string | null

  fetchStudents: (params?: any) => Promise<void>
  fetchStudentById: (id: string) => Promise<void>
  fetchStudentProfile: (id: string) => Promise<any>
  fetchStudentGrades: (id: string) => Promise<any>
  fetchStudentAttendance: (id: string) => Promise<any>
}

export const useStudentsStore = create<StudentsState>((set, get) => ({
  students: [],
  currentStudent: null,
  isLoading: false,
  error: null,

  fetchStudents: async (params) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get("/students", { params })
      set({ students: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch students",
        isLoading: false,
      })
    }
  },

  fetchStudentById: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/students/${id}`)
      set({ currentStudent: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch student",
        isLoading: false,
      })
    }
  },

  fetchStudentProfile: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/students/${id}/profile`)
      return response.data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch profile",
        isLoading: false,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchStudentGrades: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/students/${id}/grades`)
      return response.data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch grades",
        isLoading: false,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchStudentAttendance: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/students/${id}/attendance`)
      return response.data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch attendance",
        isLoading: false,
      })
    } finally {
      set({ isLoading: false })
    }
  },
}))
