import { create } from "zustand"
import { Class } from "@/types"
import api from "@/lib/api/api"

interface ClassesState {
  classes: Class[]
  currentClass: Class | null
  isLoading: boolean
  error: string | null

  fetchClasses: (params?: any) => Promise<void>
  fetchClassById: (id: string) => Promise<void>
  createClass: (classData: Partial<Class>) => Promise<Class>
  updateClass: (id: string, classData: Partial<Class>) => Promise<Class>
  deleteClass: (id: string) => Promise<void>
}

export const useClassesStore = create<ClassesState>((set) => ({
  classes: [],
  currentClass: null,
  isLoading: false,
  error: null,

  fetchClasses: async (params) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get("/classes", { params })
      set({ classes: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch classes",
        isLoading: false,
      })
    }
  },

  fetchClassById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/classes/${id}`)
      set({ currentClass: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch class",
        isLoading: false,
      })
    }
  },

  createClass: async (classData: Partial<Class>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post("/classes", classData)
      set((state) => ({
        classes: [...state.classes, response.data],
        isLoading: false,
      }))
      return response.data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to create class",
        isLoading: false,
      })
      throw error
    }
  },

  updateClass: async (id: string, classData: Partial<Class>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.put(`/classes/${id}`, classData)
      set((state) => ({
        classes: state.classes.map((cls) =>
          cls.id === id ? response.data : cls
        ),
        isLoading: false,
      }))
      return response.data
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update class",
        isLoading: false,
      })
      throw error
    }
  },

  deleteClass: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/classes/${id}`)
      set((state) => ({
        classes: state.classes.filter((cls) => cls.id !== id),
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to delete class",
        isLoading: false,
      })
    }
  },
}))
