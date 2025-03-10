import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "./api"

export const useStudents = (params = {}) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const response = await api.get("/students", { params })
      return response.data
    },
  })
}

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const response = await api.get(`/students/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useStudentProfile = (id: string) => {
  return useQuery({
    queryKey: ["student", id, "profile"],
    queryFn: async () => {
      const response = await api.get(`/students/${id}/profile`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useStudentGrades = (id: string) => {
  return useQuery({
    queryKey: ["student", id, "grades"],
    queryFn: async () => {
      const response = await api.get(`/students/${id}/grades`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useStudentAttendance = (id: string) => {
  return useQuery({
    queryKey: ["student", id, "attendance"],
    queryFn: async () => {
      const response = await api.get(`/students/${id}/attendance`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useStudentSemesterResults = (id: string) => {
  return useQuery({
    queryKey: ["student", id, "semester-results"],
    queryFn: async () => {
      const response = await api.get(`/students/${id}/semester-results`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useTeachers = (params = {}) => {
  return useQuery({
    queryKey: ["teachers", params],
    queryFn: async () => {
      const response = await api.get("/teachers", { params })
      return response.data
    },
  })
}

export const useTeacher = (id: string) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: async () => {
      const response = await api.get(`/teachers/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useTeacherClasses = (id: string) => {
  return useQuery({
    queryKey: ["teacher", id, "classes"],
    queryFn: async () => {
      const response = await api.get(`/teachers/${id}/classes`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useClasses = (params = {}) => {
  return useQuery({
    queryKey: ["classes", params],
    queryFn: async () => {
      const response = await api.get("/classes", { params })
      return response.data
    },
  })
}

export const useClass = (id: string) => {
  return useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const response = await api.get(`/classes/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useClassStudents = (id: string) => {
  return useQuery({
    queryKey: ["class", id, "students"],
    queryFn: async () => {
      const response = await api.get(`/classes/${id}/students`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useAttendanceSession = (id: string) => {
  return useQuery({
    queryKey: ["attendance-session", id],
    queryFn: async () => {
      const response = await api.get(`/attendance-sessions/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useSessionAttendance = (id: string) => {
  return useQuery({
    queryKey: ["attendance-session", id, "attendance"],
    queryFn: async () => {
      const response = await api.get(`/attendance-sessions/${id}/attendance`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useSubmitAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      sessionId,
      data,
    }: {
      sessionId: string
      data: any
    }) => {
      const response = await api.post(
        `/attendance-sessions/${sessionId}/attendance`,
        data
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attendance-session", variables.sessionId, "attendance"],
      })
    },
  })
}

export const useCreateFeeExtension = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      studentId,
      data,
    }: {
      studentId: string
      data: any
    }) => {
      const response = await api.post(
        `/students/${studentId}/fee-extension`,
        data
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-fee-extensions"] })
    },
  })
}
