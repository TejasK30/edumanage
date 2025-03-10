import crypto from "crypto"
import jwt from "jsonwebtoken"

export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString()
}

export const generateCustomId = (role: string): string => {
  const prefixes = {
    student: "STU",
    admin: "ADM",
    teacher: "TCH",
    staff: "STF",
  }

  const prefix = prefixes[role as keyof typeof prefixes] || "STU"

  const randomString = crypto.randomBytes(4).toString("hex").toUpperCase()

  return `${prefix}-${randomString}`
}
export const isAuthenticated = (req: any, res: any, next: any) => {
  const token = req.cookies.auth_token

  if (!token) {
    return res.status(401).json({ error: "Authentication required" })
  }

  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret"
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

export const hasRole = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Access denied. You don't have the required permissions.",
      })
    }

    next()
  }
}
