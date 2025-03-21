import { create } from "zustand"
import { persist } from "zustand/middleware"
import api from "@/lib/api/api"

interface Feedback {
  id: string
  studentId: string
  teacherId?: string | null
  feedbackType: string
  message: string
  rating?: number | null
  createdAt: Date
}

interface FeedbackState {
  feedbacks: Feedback[]
  isLoading: boolean
  error: string | null

  // Student feedbacks
  getStudentFeedbacks: (studentId: string) => Promise<void>
  submitFeedback: (
    feedback: Omit<Feedback, "id" | "createdAt">
  ) => Promise<void>

  // Teacher feedbacks
  getTeacherFeedbacks: (teacherId: string) => Promise<void>
  respondToFeedback: (feedbackId: string, response: string) => Promise<void>

  // General
  clearError: () => void
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      feedbacks: [],
      isLoading: false,
      error: null,

      getStudentFeedbacks: async (studentId: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get(`/feedbacks/student/${studentId}`)
          set({ feedbacks: response.data, isLoading: false })
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              "Failed to fetch student feedbacks",
            isLoading: false,
          })
        }
      },

      submitFeedback: async (feedback) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post("/feedbacks", feedback)
          set((state) => ({
            feedbacks: [...state.feedbacks, response.data],
            isLoading: false,
          }))
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to submit feedback",
            isLoading: false,
          })
        }
      },

      getTeacherFeedbacks: async (teacherId: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get(`/feedbacks/teacher/${teacherId}`)
          set({ feedbacks: response.data, isLoading: false })
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              "Failed to fetch teacher feedbacks",
            isLoading: false,
          })
        }
      },

      respondToFeedback: async (feedbackId: string, response: string) => {
        set({ isLoading: true, error: null })
        try {
          await api.put(`/feedbacks/${feedbackId}/respond`, {
            message: response,
          })

          // Update the feedback in the local state
          const updatedFeedbacks = get().feedbacks.map((feedback) =>
            feedback.id === feedbackId ? { ...feedback, response } : feedback
          )

          set({ feedbacks: updatedFeedbacks, isLoading: false })
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || "Failed to respond to feedback",
            isLoading: false,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "feedback-storage",
      partialize: (state) => ({ feedbacks: state.feedbacks }),
    }
  )
)
