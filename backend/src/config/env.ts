import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../.env") })

export const environment = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/college_lms",
  logLevel: process.env.LOG_LEVEL || "info",
}
