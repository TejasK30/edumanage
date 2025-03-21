import { create } from "zustand"

type LoadingKey = string

interface LoadingState {
  // State
  loadingStates: Record<LoadingKey, boolean>
  anyLoading: boolean

  // Actions
  startLoading: (key: LoadingKey) => void
  stopLoading: (key: LoadingKey) => void
  isLoading: (key: LoadingKey) => boolean
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loadingStates: {},
  anyLoading: false,

  startLoading: (key: LoadingKey) => {
    set((state) => {
      const newStates = {
        ...state.loadingStates,
        [key]: true,
      }
      return {
        loadingStates: newStates,
        anyLoading: Object.values(newStates).some(Boolean),
      }
    })
  },

  stopLoading: (key: LoadingKey) => {
    set((state) => {
      const newStates = {
        ...state.loadingStates,
        [key]: false,
      }
      return {
        loadingStates: newStates,
        anyLoading: Object.values(newStates).some(Boolean),
      }
    })
  },

  isLoading: (key: LoadingKey) => get().loadingStates[key] || false,
}))

// Create constants for common loading keys
export const LoadingKeys = {
  FETCH_STUDENT: "fetch_student",
  FETCH_ATTENDANCE: "fetch_attendance",
  SUBMIT_FEEDBACK: "submit_feedback",
  LOGIN: "login",
  REGISTER: "register",
  UPDATE_PROFILE: "update_profile",
  FETCH_CLASSES: "fetch_classes",
  FETCH_GRADES: "fetch_grades",
  FETCH_TIMETABLE: "fetch_timetable",
  MARK_ATTENDANCE: "mark_attendance",
  // Add more as needed
}

// Helper hook for creating loading state with automatic cleanup
export function useLoading(key: LoadingKey) {
  const { startLoading, stopLoading, isLoading } = useLoadingStore()

  const loading = isLoading(key)

  const withLoading = async <T>(promiseFn: () => Promise<T>): Promise<T> => {
    try {
      startLoading(key)
      return await promiseFn()
    } finally {
      stopLoading(key)
    }
  }

  return { loading, withLoading }
}
