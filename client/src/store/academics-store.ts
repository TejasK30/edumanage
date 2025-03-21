import { create } from "zustand"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api/api"
import {
  AcademicProgression,
  BacklogRecord,
  Grading,
  SemesterSubject,
  SemesterResult,
  SubjectResult,
} from "@/types/store-types"

interface AcademicStore {
  // Current semester info
  currentSemester: number | null
  currentAcademicYear: string | null

  // Selected data for viewing
  selectedSemester: number | null
  selectedAcademicYear: string | null

  // Actions
  setCurrentSemester: (semester: number) => void
  setCurrentAcademicYear: (year: string) => void
  setSelectedSemester: (semester: number) => void
  setSelectedAcademicYear: (year: string) => void
}

export const useAcademicStore = create<AcademicStore>((set) => ({
  currentSemester: null,
  currentAcademicYear: null,
  selectedSemester: null,
  selectedAcademicYear: null,

  setCurrentSemester: (semester) => set({ currentSemester: semester }),
  setCurrentAcademicYear: (year) => set({ currentAcademicYear: year }),
  setSelectedSemester: (semester) => set({ selectedSemester: semester }),
  setSelectedAcademicYear: (year) => set({ selectedAcademicYear: year }),
}))

// React Query hooks
export const useStudentSemesterResults = (studentId: string) => {
  return useQuery({
    queryKey: ["semesterResults", studentId],
    queryFn: async () => {
      const response = await api.get<SemesterResult[]>(
        `/api/academic/results/${studentId}`
      )
      return response.data
    },
    enabled: !!studentId,
  })
}

export const useSemesterResultDetails = (semesterResultId: string) => {
  return useQuery({
    queryKey: ["semesterResultDetails", semesterResultId],
    queryFn: async () => {
      const response = await api.get<SemesterResult>(
        `/api/academic/results/details/${semesterResultId}`
      )
      return response.data
    },
    enabled: !!semesterResultId,
  })
}

export const useStudentGrades = (studentId: string) => {
  return useQuery({
    queryKey: ["grades", studentId],
    queryFn: async () => {
      const response = await api.get<Grading[]>(
        `/api/academic/grades/${studentId}`
      )
      return response.data
    },
    enabled: !!studentId,
  })
}

export const useSemesterSubjects = (
  studentId: string,
  semester?: number,
  academicYear?: string
) => {
  const { selectedSemester, selectedAcademicYear } = useAcademicStore()
  const semToUse = semester || selectedSemester
  const yearToUse = academicYear || selectedAcademicYear

  return useQuery({
    queryKey: ["semesterSubjects", studentId, semToUse, yearToUse],
    queryFn: async () => {
      const response = await api.get<SemesterSubject[]>(
        `/api/academic/subjects/${studentId}`,
        { params: { semester: semToUse, academicYear: yearToUse } }
      )
      return response.data
    },
    enabled: !!studentId && !!semToUse && !!yearToUse,
  })
}

export const useBacklogRecords = (studentId: string) => {
  return useQuery({
    queryKey: ["backlogs", studentId],
    queryFn: async () => {
      const response = await api.get<BacklogRecord[]>(
        `/api/academic/backlogs/${studentId}`
      )
      return response.data
    },
    enabled: !!studentId,
  })
}

export const useAcademicProgression = (studentId: string) => {
  return useQuery({
    queryKey: ["academicProgression", studentId],
    queryFn: async () => {
      const response = await api.get<AcademicProgression[]>(
        `/api/academic/progression/${studentId}`
      )
      return response.data
    },
    enabled: !!studentId,
  })
}

export const useUpdateGrade = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (gradeData: Partial<Grading> & { id: string }) => {
      const response = await api.put(
        `/api/academic/grades/${gradeData.id}`,
        gradeData
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["grades", variables.studentId],
      })
      queryClient.invalidateQueries({
        queryKey: ["semesterResults", variables.studentId],
      })
    },
  })
}

export const useAddSemesterSubject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (subjectData: Omit<SemesterSubject, "id">) => {
      const response = await api.post("/api/academic/subjects", subjectData)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "semesterSubjects",
          variables.studentId,
          variables.semester,
          variables.academicYear,
        ],
      })
    },
  })
}

export const useUpdateBacklogRecord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      backlogData: Partial<BacklogRecord> & { id: string }
    ) => {
      const response = await api.put(
        `/api/academic/backlogs/${backlogData.id}`,
        backlogData
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["backlogs", variables.studentId],
      })
    },
  })
}

export const useAddSemesterResult = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      resultData: Omit<SemesterResult, "id" | "subjectResults"> & {
        subjectResults: Omit<SubjectResult, "id" | "semesterResultId">[]
      }
    ) => {
      const response = await api.post("/api/academic/results", resultData)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["semesterResults", variables.studentId],
      })
      queryClient.invalidateQueries({
        queryKey: ["academicProgression", variables.studentId],
      })
    },
  })
}
