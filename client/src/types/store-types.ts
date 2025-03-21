export interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "staff" | "admin"
  avatar?: string
}

export interface Student {
  id: string
  name: string
  email: string
  enrollmentNumber: string
  department: string
  semester: number
  profile?: StudentProfile
}

export interface StudentProfile {
  id: string
  userId: string
  fullName: string
  phoneNumber: string
  parentsPhone: string
  email: string
  address: string
  caste?: string
  admissionYear?: number
  currentSemester: number
  currentAcademicYear: string
  totalCredits: number
  course?: string
  fees: number
  scholarship: boolean
  dues: number
  department: string
  className: string
  createdAt: string
  updatedAt: string
  classId?: string
  collegeId?: string
}

export interface TeacherProfile {
  id: string
  userId: string
  collegeId: string
  firstName: string
  middleName?: string
  lastName: string
  department: string
  subjects?: any
  salary?: number
  createdAt: string
  updatedAt?: string
}

export interface Class {
  id: string
  name: string
  year: number
  section?: string
  department: string
  collegeId: string
  createdAt: string
  updatedAt: string
  schedule?: {
    day: string
    startTime: string
    endTime: string
  }[]
}

export interface AttendanceSession {
  id: string
  classId: string
  teacherId: string
  subject: string
  date: string
  startTime: string
  endTime?: string
  status: "ongoing" | "completed"
  createdAt: string
  updatedAt: string
}

export interface DailyAttendance {
  id: string
  sessionId: string
  studentId: string
  status: "present" | "absent" | "late"
  markedAt: string
  remarks?: string
}

export interface Attendance {
  sessionId: string
  studentId: string
  status: "present" | "absent" | "late"
  remarks?: string
}

export interface SubjectResult {
  id: string
  semesterResultId: string
  studentId: string
  subjectCode: string
  subjectName: string
  credits: number
  internalMarks: number
  externalMarks: number
  totalMarks: number
  grade: string
  gradePoints: number
  status: string
  attempts: number
  isBacklog: boolean
  createdAt: string
}

export interface SemesterResult {
  id: string
  studentId: string
  semester: number
  academicYear: string
  totalMarks: number
  obtainedMarks: number
  percentage: number
  sgpa: number
  cgpa: number
  totalCredits: number
  earnedCredits: number
  status: string
  remarks?: string
  declaredAt: Date
  subjectResults: SubjectResult[]
}

export interface Grading {
  id: string
  studentId: string
  teacherId: string
  subject: string
  grade: string
  comments?: string
  gradedAt: Date
}

export interface SemesterSubject {
  id: string
  studentId: string
  semester: number
  academicYear: string
  subjects: any // JSON in Prisma
  credits: number
  isActive: boolean
}

export interface AcademicProgression {
  id: string
  studentId: string
  academicYear: string
  semester: number
  status: string
  cgpa: number
  totalBacklogs: number
  isPromoted: boolean
  remarks?: string
  decidedBy: string
  decidedAt: Date
}

export interface BacklogRecord {
  id: string
  studentId: string
  subjectCode: string
  originalSemester: number
  originalAcademicYear: string
  examType: string
  attemptNumber: number
  examDate: Date
  marks?: number
  status: string
  clearedDate?: Date
}
