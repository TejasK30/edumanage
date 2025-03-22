import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"

import academicRoutes from "./routes/academic.routes"
import attendanceRoutes from "./routes/attendanceRoutes"
import authRoutes from "./routes/auth"
import classRoutes from "./routes/class.routes"
import collegeRoutes from "./routes/collegeRoutes"
import feedbackRoutes from "./routes/feedback"
import notificationRoutes from "./routes/notificationRoutes"
import staffRoutes from "./routes/staff.routes"
import studentRoutes from "./routes/student.routes"
import teacherRoutes from "./routes/teacher.routes"
import userRoutes from "./routes/user.routes"

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string
        name: string
        customId: string
        email: string
        phone: any
        password: string
        role: "teacher" | "staff" | "student" | string
        isVerified: boolean
        verificationOTP: string | null
        verificationOTPExpiry: Date | null
        createdAt: Date
        lastSeen: Date
        fcmToken: string | null
        isOnline: boolean
        teacherProfile?: { id: string } | null
        studentProfile?: { id: string } | null
        staffProfile?: any
      }
    }
  }
}

app.use("/api/auth", authRoutes)
app.use("/api/college", collegeRoutes)
app.use("/api/feedback", feedbackRoutes)
app.use("/api/users", userRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/attendance-sessions", attendanceRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/academics", academicRoutes)

app.get("/", (req, res) => {
  res.send("EduManage Node.js Backend is running with Prisma ORM.")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT || 5000}`)
})

export default app
