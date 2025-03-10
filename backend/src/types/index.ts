import {
  User,
  StudentProfile,
  TeacherProfile,
  AttendanceSession,
  DailyAttendance,
  LmsModule,
  Comment,
} from "@prisma/client"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export type UserWithProfiles = User & {
  studentProfile?: StudentProfile | null
  teacherProfile?: TeacherProfile | null
}

export type AttendanceSessionWithAttendance = AttendanceSession & {
  studentAttendance: DailyAttendance[]
}

export type LmsModuleWithComments = LmsModule & {
  comments: Comment[]
}

// Request DTOs
export interface CreateAttendanceSessionDto {
  classId: string
  subject: string
  startTime: Date
}

export interface MarkAttendanceDto {
  sessionId: string
  studentId: string
  status: "present" | "absent" | "late"
  remarks?: string
}

export interface EndAttendanceSessionDto {
  sessionId: string
}

export interface CreateLmsModuleDto {
  title: string
  description?: string
  type: string
  content: string
  subject: string
  classId: string
}

export interface CreateCommentDto {
  moduleId: string
  content: string
  parentId?: string
}

export interface CreateNotificationDto {
  userId: string
  senderId: string
  title: string
  message: string
  type: string
  relatedItemId?: string
  relatedItemType?: string
}

// Response types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

// SSE Types
export interface SseClient {
  id: string
  userId: string
  stream: any // Response object
}
