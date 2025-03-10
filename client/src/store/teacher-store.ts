import { create } from "zustand"
import api from "@/lib/api/api"
import { TeacherProfile } from "@/types/store-types"

interface TeachersState {
  teachers: TeacherProfile[]
  currentTeacher: TeacherProfile | null
  isLoading: boolean
  error: string | null

  fetchTeachers: (params?: any) => Promise<void>
  fetchTeacherById: (id: string) => Promise<void>
}

export const useTeachersStore = create<TeachersState>((set) => ({
  teachers: [],
  currentTeacher: null,
  isLoading: false,
  error: null,

  fetchTeachers: async (params) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get("/teachers", { params })
      set({ teachers: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch teachers",
        isLoading: false,
      })
    }
  },

  fetchTeacherById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/teachers/${id}`)
      set({ currentTeacher: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch teacher",
        isLoading: false,
      })
    }
  },
}))
