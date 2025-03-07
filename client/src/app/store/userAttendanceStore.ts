import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface Student {
  id: string
  fullName: string
  customId: string
  isPresent: boolean
  remarks?: string
}

interface AttendanceStore {
  students: Student[]
  selectedDate: Date
  selectedSubject: string
  loading: boolean
  error: string | null
  setStudents: (students: Student[]) => void
  toggleAttendance: (studentId: string) => void
  setSelectedDate: (date: Date) => void
  setSelectedSubject: (subject: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetStore: () => void
}

const initialState = {
  students: [],
  selectedDate: new Date(),
  selectedSubject: "",
  loading: false,
  error: null,
}

export const useAttendanceStore = create<AttendanceStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setStudents: (students) => set({ students }),
        toggleAttendance: (studentId) =>
          set((state) => ({
            students: state.students.map((student) =>
              student.id === studentId
                ? { ...student, isPresent: !student.isPresent }
                : student
            ),
          })),
        setSelectedDate: (date) => set({ selectedDate: date }),
        setSelectedSubject: (subject) => set({ selectedSubject: subject }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        resetStore: () => set(initialState),
      }),
      {
        name: "attendance-store",
        partialize: (state) => ({
          selectedSubject: state.selectedSubject,
          selectedDate: state.selectedDate,
        }),
      }
    )
  )
)
