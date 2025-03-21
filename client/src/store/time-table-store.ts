import { create } from "zustand"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Types based on Prisma schema
interface Timetable {
  id: string
  className: string
  subject: string
  teacherId: string
  dayOfWeek: string
  startTime: Date
  endTime: Date
}

interface AttendanceSession {
  id: string
  classId: string
  teacherId: string
  subject: string
  date: Date
  startTime: Date
  endTime?: Date
  status: string // 'ongoing' or 'completed'
  studentAttendance?: DailyAttendance[]
}

interface DailyAttendance {
  id: string
  sessionId: string
  studentId: string
  status: string // 'present', 'absent', 'late'
  markedAt: Date
  remarks?: string
}

interface Class {
  id: string
  name: string
  year: number
  section?: string
  department: string
  collegeId: string
}

interface TimetableStore {
  selectedClass: string | null
  selectedDate: Date | null
  selectedTeacher: string | null
  selectedDayOfWeek: string | null

  setSelectedClass: (classId: string | null) => void
  setSelectedDate: (date: Date | null) => void
  setSelectedTeacher: (teacherId: string | null) => void
  setSelectedDayOfWeek: (day: string | null) => void
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  selectedClass: null,
  selectedDate: null,
  selectedTeacher: null,
  selectedDayOfWeek: null,

  setSelectedClass: (classId) => set({ selectedClass: classId }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTeacher: (teacherId) => set({ selectedTeacher: teacherId }),
  setSelectedDayOfWeek: (day) => set({ selectedDayOfWeek: day }),
}))

// React Query hooks
export const useClassTimetable = (classId: string, dayOfWeek?: string) => {
  const { selectedDayOfWeek } = useTimetableStore()
  const dayToUse = dayOfWeek || selectedDayOfWeek

  return useQuery({
    queryKey: ["classTimetable", classId, dayToUse],
    queryFn: async () => {
      const response = await axios.get<Timetable[]>(
        `/api/timetable/class/${classId}`,
        {
          params: { dayOfWeek: dayToUse },
        }
      )
      return response.data
    },
    enabled: !!classId,
  })
}

export const useTeacherTimetable = (teacherId: string, dayOfWeek?: string) => {
  const { selectedDayOfWeek } = useTimetableStore()
  const dayToUse = dayOfWeek || selectedDayOfWeek

  return useQuery({
    queryKey: ["teacherTimetable", teacherId, dayToUse],
    queryFn: async () => {
      const response = await axios.get<Timetable[]>(
        `/api/timetable/teacher/${teacherId}`,
        {
          params: { dayOfWeek: dayToUse },
        }
      )
      return response.data
    },
    enabled: !!teacherId,
  })
}

export const useAttendanceSessions = (classId: string, date?: Date) => {
  const { selectedDate } = useTimetableStore()
  const dateToUse = date || selectedDate

  return useQuery({
    queryKey: ["attendanceSessions", classId, dateToUse?.toISOString()],
    queryFn: async () => {
      const response = await axios.get<AttendanceSession[]>(
        `/api/timetable/attendance-sessions/${classId}`,
        {
          params: { date: dateToUse?.toISOString() },
        }
      )
      return response.data
    },
    enabled: !!classId && !!dateToUse,
  })
}

export const useAttendanceSessionDetails = (sessionId: string) => {
  return useQuery({
    queryKey: ["attendanceSessionDetails", sessionId],
    queryFn: async () => {
      const response = await axios.get<
        AttendanceSession & { studentAttendance: DailyAttendance[] }
      >(`/api/timetable/attendance-sessions/details/${sessionId}`)
      return response.data
    },
    enabled: !!sessionId,
  })
}

export const useClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await axios.get<Class[]>("/api/timetable/classes")
      return response.data
    },
  })
}

export const useCreateTimetable = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (timetableData: Omit<Timetable, "id">) => {
      const response = await axios.post("/api/timetable", timetableData)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["classTimetable", variables.className],
      })
      queryClient.invalidateQueries({
        queryKey: ["teacherTimetable", variables.teacherId],
      })
    },
  })
}

export const useUpdateTimetable = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (timetableData: Partial<Timetable> & { id: string }) => {
      const response = await axios.put(
        `/api/timetable/${timetableData.id}`,
        timetableData
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["classTimetable"] })
      queryClient.invalidateQueries({ queryKey: ["teacherTimetable"] })
    },
  })
}

export const useDeleteTimetable = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/timetable/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classTimetable"] })
      queryClient.invalidateQueries({ queryKey: ["teacherTimetable"] })
    },
  })
}

export const useCreateAttendanceSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      sessionData: Omit<AttendanceSession, "id" | "status">
    ) => {
      const response = await axios.post(
        "/api/timetable/attendance-sessions",
        sessionData
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attendanceSessions", variables.classId],
      })
    },
  })
}

export const useEndAttendanceSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      sessionId,
      endTime,
    }: {
      sessionId: string
      endTime: Date
    }) => {
      const response = await axios.put(
        `/api/timetable/attendance-sessions/${sessionId}/end`,
        { endTime }
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attendanceSessionDetails", variables.sessionId],
      })
      queryClient.invalidateQueries({ queryKey: ["attendanceSessions"] })
    },
  })
}

export const useMarkAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      attendanceData: Omit<DailyAttendance, "id" | "markedAt">
    ) => {
      const response = await axios.post(
        "/api/timetable/attendance",
        attendanceData
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attendanceSessionDetails", variables.sessionId],
      })
    },
  })
}

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      attendanceData: Partial<DailyAttendance> & { id: string }
    ) => {
      const response = await axios.put(
        `/api/timetable/attendance/${attendanceData.id}`,
        attendanceData
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      // Find the session ID from the response and invalidate the relevant query
      const sessionId = data.sessionId
      queryClient.invalidateQueries({
        queryKey: ["attendanceSessionDetails", sessionId],
      })
    },
  })
}
