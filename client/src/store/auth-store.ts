import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User } from "@/types"
import api from "@/lib/api/api"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post("/auth/login", { email, password })
          const { user, token } = response.data
          set({ user, token, isLoading: false })
          localStorage.setItem("auth_token", token)
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          })
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post("/auth/register", userData)
          set({ isLoading: false })
          return response.data
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          })
        }
      },

      logout: () => {
        localStorage.removeItem("auth_token")
        set({ user: null, token: null })
      },

      getCurrentUser: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get("/auth/me")
          set({ user: response.data, isLoading: false })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to fetch user",
            isLoading: false,
          })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
)
