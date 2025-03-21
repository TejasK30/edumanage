import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface User {
  id: string
  customId: string
  name: string
  email: string
  phone?: any
  role: string
  isVerified: boolean
  lastSeen: Date
  isOnline: boolean
}

interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchUser: (id: string) => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        error: null,
        setUser: (user) => set({ user }),
        login: async (email, password) => {
          set({ isLoading: true, error: null })
          try {
            // API call would go here
            const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
              throw new Error("Login failed")
            }

            const userData = await response.json()
            set({ user: userData, isLoading: false })
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : "Unknown error",
              isLoading: false,
            })
          }
        },
        logout: async () => {
          set({ isLoading: true, error: null })
          try {
            await fetch("/api/auth/logout", { method: "POST" })
            set({ user: null, isLoading: false })
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : "Unknown error",
              isLoading: false,
            })
          }
        },
        fetchUser: async (id) => {
          set({ isLoading: true, error: null })
          try {
            const response = await fetch(`/api/users/${id}`)
            if (!response.ok) {
              throw new Error("Failed to fetch user")
            }
            const userData = await response.json()
            set({ user: userData, isLoading: false })
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : "Unknown error",
              isLoading: false,
            })
          }
        },
        updateUser: async (userData) => {
          const currentUser = get().user
          if (!currentUser) {
            set({ error: "No user logged in" })
            return
          }

          set({ isLoading: true, error: null })
          try {
            const response = await fetch(`/api/users/${currentUser.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            })

            if (!response.ok) {
              throw new Error("Failed to update user")
            }

            const updatedUser = await response.json()
            set({ user: updatedUser, isLoading: false })
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : "Unknown error",
              isLoading: false,
            })
          }
        },
      }),
      {
        name: "user-storage",
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
)
