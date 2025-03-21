import { create } from "zustand"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api/api"

// Types based on Prisma schema
interface JobPosting {
  id: string
  postedBy: string
  jobTitle: string
  description: string
  requirements?: string
  postedAt: Date
  closingDate: Date
  applications?: JobApplication[]
}

interface JobApplication {
  id: string
  jobId: string
  studentId: string
  applicationDate: Date
  status: string
}

interface JobPlacementStore {
  selectedJob: string | null
  applicationFilters: {
    status?: string
    studentId?: string
  }

  setSelectedJob: (jobId: string | null) => void
  setApplicationFilters: (
    filters: Partial<JobPlacementStore["applicationFilters"]>
  ) => void
  resetApplicationFilters: () => void
}

export const useJobPlacementStore = create<JobPlacementStore>((set) => ({
  selectedJob: null,
  applicationFilters: {},

  setSelectedJob: (jobId) => set({ selectedJob: jobId }),
  setApplicationFilters: (filters) =>
    set((state) => ({
      applicationFilters: { ...state.applicationFilters, ...filters },
    })),
  resetApplicationFilters: () => set({ applicationFilters: {} }),
}))

// React Query hooks
export const useJobPostings = (filters?: { closingDateAfter?: Date }) => {
  return useQuery({
    queryKey: ["jobPostings", filters],
    queryFn: async () => {
      const response = await api.get<JobPosting[]>("/api/placements/jobs", {
        params: filters,
      })
      return response.data
    },
  })
}

export const useJobDetails = (jobId: string) => {
  return useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      const response = await api.get<JobPosting>(
        `/api/placements/jobs/${jobId}`
      )
      return response.data
    },
    enabled: !!jobId,
  })
}

export const useJobApplications = (
  jobId?: string,
  studentId?: string,
  status?: string
) => {
  const { applicationFilters } = useJobPlacementStore()

  const effectiveFilters = {
    jobId: jobId || undefined,
    studentId: studentId || applicationFilters.studentId || undefined,
    status: status || applicationFilters.status || undefined,
  }

  return useQuery({
    queryKey: ["jobApplications", effectiveFilters],
    queryFn: async () => {
      const response = await api.get<JobApplication[]>(
        "/api/placements/applications",
        {
          params: effectiveFilters,
        }
      )
      return response.data
    },
  })
}

export const useStudentApplications = (studentId: string) => {
  return useQuery({
    queryKey: ["studentApplications", studentId],
    queryFn: async () => {
      const response = await api.get<(JobApplication & { job: JobPosting })[]>(
        `/api/placements/applications/student/${studentId}`
      )
      return response.data
    },
    enabled: !!studentId,
  })
}

export const useCreateJobPosting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (jobData: Omit<JobPosting, "id" | "postedAt">) => {
      const response = await api.post("/api/placements/jobs", jobData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] })
    },
  })
}

export const useUpdateJobPosting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (jobData: Partial<JobPosting> & { id: string }) => {
      const response = await api.put(
        `/api/placements/jobs/${jobData.id}`,
        jobData
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] })
      queryClient.invalidateQueries({ queryKey: ["jobDetails", data.id] })
    },
  })
}

export const useDeleteJobPosting = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/api/placements/jobs/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] })
    },
  })
}

export const useApplyForJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (applicationData: {
      jobId: string
      studentId: string
    }) => {
      const response = await api.post(
        "/api/placements/applications",
        applicationData
      )
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] })
      queryClient.invalidateQueries({
        queryKey: ["studentApplications", variables.studentId],
      })
      queryClient.invalidateQueries({
        queryKey: ["jobDetails", variables.jobId],
      })
    },
  })
}

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await api.put(
        `/api/placements/applications/${id}/status`,
        { status }
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] })
      queryClient.invalidateQueries({ queryKey: ["studentApplications"] })
    },
  })
}
