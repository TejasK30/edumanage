export type Role = "student" | "teacher" | "admin" | "principal" | "staff"
export interface UserProfile {
  id: string
  customId: string
  email: string
  phone?: string
  role: Role
  isVerified: boolean
  createdAt: Date
}

export const ROLE_LABELS: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Administrator",
  principal: "Principal",
  staff: "Staff Member",
}

export const getDashboardPath = (role: Role): string => {
  const paths: Record<Role, string> = {
    student: "/student-dashboard",
    teacher: "/teacher-dashboard",
    admin: "/admin-dashboard",
    principal: "/principal-dashboard",
    staff: "/staff-dashboard",
  }
  return paths[role]
}
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to log in")
    }

    return await response.json()
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" }
  }
}
