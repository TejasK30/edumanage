import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth"
import attendanceRoutes from "./routes/attendance"
import feedbackRoutes from "./routes/feedback"
import "dotenv/config"

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

app.use("/api/auth", authRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/feedback", feedbackRoutes)

app.get("/", (req, res) => {
  res.send("EduManage Node.js Backend is running with Drizzle ORM.")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
