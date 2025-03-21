import { useQuery, useMutation, QueryKey } from "@tanstack/react-query"
import api from "@/lib/api/api"

export const useFetchTeacherData = <T>(
  queryKey: QueryKey,
  endpoint: string,
  options = {}
) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(endpoint)
      return response.data
    },
    ...options,
  })
}

// Generic post data hook
export const usePostTeacherData = <T, R>(endpoint: string) => {
  return useMutation<R, Error, T>({
    mutationFn: async (data: T) => {
      const response = await api.post(endpoint, data)
      return response.data
    },
  })
}

// Teacher dashboard data
export const useTeacherDashboardData = () => {
  return useFetchTeacherData(
    ["teacherDashboard"],
    "/teacher/dashboard",
    { staleTime: 5 * 60 * 1000 } // 5 minutes
  )
}

// Teacher classes data
export const useTeacherClasses = () => {
  return useFetchTeacherData(
    ["teacherClasses"],
    "/teacher/classes",
    { staleTime: 10 * 60 * 1000 } // 10 minutes
  )
}

// Teacher students data
export const useTeacherStudents = (classId?: string) => {
  return useFetchTeacherData(
    ["teacherStudents", classId],
    classId ? `/teacher/students?classId=${classId}` : "/teacher/students",
    { enabled: !!classId }
  )
}

// Mark attendance hook
export const useMarkAttendance = () => {
  return usePostTeacherData<
    {
      classId: string
      date: string
      students: Array<{ id: string; status: "present" | "absent" | "late" }>
    },
    any
  >("/teacher/attendance/mark")
}

// Get assignments for teacher
export const useTeacherAssignments = (status?: string) => {
  return useFetchTeacherData(
    ["teacherAssignments", status],
    status ? `/teacher/assignments?status=${status}` : "/teacher/assignments"
  )
}

// Get assignment submissions
export const useAssignmentSubmissions = (assignmentId: string) => {
  return useFetchTeacherData(
    ["assignmentSubmissions", assignmentId],
    `/teacher/assignments/${assignmentId}/submissions`,
    { enabled: !!assignmentId }
  )
}

// Create assignment hook
export const useCreateAssignment = () => {
  return usePostTeacherData<
    {
      title: string
      description: string
      dueDate: string
      classId: string
      totalMarks: number
    },
    any
  >("/teacher/assignments/create")
}

// Grade submission hook
export const useGradeSubmission = () => {
  return usePostTeacherData<
    {
      submissionId: string
      marks: number
      feedback: string
    },
    any
  >("/teacher/submissions/grade")
}

// Teacher messages
export const useTeacherMessages = () => {
  return useFetchTeacherData(["teacherMessages"], "/teacher/messages")
}

// Teacher exam data
export const useTeacherExams = () => {
  return useFetchTeacherData(["teacherExams"], "/teacher/exams")
}
