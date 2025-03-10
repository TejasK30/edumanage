import { create } from "zustand"
import { SemesterResult, SubjectResult } from "@/types"
import api from "@/lib/api/api"

interface AcademicsState {
  semesterResults: SemesterResult[]
  currentSemesterResult: SemesterResult | null
  subjectResults: SubjectResult[]
  isLoading: boolean
  error: string | null

  fetchSemesterResults: (studentId: string) => Promise<void>
  fetchSemesterResultById: (id: string) => Promise<void>
  fetchSubjectResults: (studentId: string) => Promise<void>
}

export const useAcademicsStore = create<AcademicsState>((set) => ({
  semesterResults: [],
  currentSemesterResult: null,
  subjectResults: [],
  isLoading: false,
  error: null,

  fetchSemesterResults: async (studentId: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/academics/semester-results/${studentId}`)
      set({ semesterResults: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch semester results",
        isLoading: false,
      })
    }
  },

  fetchSemesterResultById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/academics/semester-results/detail/${id}`)
      set({ currentSemesterResult: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch semester result",
        isLoading: false,
      })
    }
  },

  fetchSubjectResults: async (studentId: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get(`/academics/subject-results/${studentId}`)
      set({ subjectResults: response.data, isLoading: false })
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch subject results",
        isLoading: false,
      })
    }
  },
}))
