import axios from "axios"

const API_URL = "http://localhost:5000/api/attendance"

export const createSession = async (data: any) => {
  return axios.post(`${API_URL}/create-session`, data)
}

export const markAttendance = async (data: any) => {
  return axios.post(`${API_URL}/mark-attendance`, data)
}

export const endSession = async (data: any) => {
  return axios.post(`${API_URL}/end-session`, data)
}

export const getSessionDetails = async (sessionId: string) => {
  return axios.get(`${API_URL}/session/${sessionId}`)
}

export const getStudentAttendance = async (
  studentId: string,
  classId: string,
  subject: string
) => {
  return axios.get(`${API_URL}/student/${studentId}/attendance`, {
    params: { classId, subject },
  })
}

export const getClassAttendanceStats = async (
  classId: string,
  startDate?: string,
  endDate?: string
) => {
  return axios.get(`${API_URL}/class/${classId}/stats`, {
    params: { startDate, endDate },
  })
}

export const getActiveSessions = async () => {
  return axios.get(`${API_URL}/teacher/active-sessions`)
}
