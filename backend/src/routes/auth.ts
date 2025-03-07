import { Router, Request, Response } from "express"
import { prisma } from "../db/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"

const router = Router()

const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { identifier, password } = loginSchema.parse(req.body)
    let user

    if (/^\S+@\S+\.\S+$/.test(identifier)) {
      user = await prisma.user.findUnique({
        where: { email: identifier },
      })
    } else if (/^\+?\d+$/.test(identifier)) {
      user = await prisma.user.findUnique({
        where: { phone: identifier },
      })
    } else {
      user = await prisma.user.findUnique({
        where: { customId: identifier },
      })
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret"
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        customId: user.customId,
      },
      secret,
      { expiresIn: "1d" }
    )

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 1000, // 1 day in ms
      sameSite: "strict",
      path: "/",
    })

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        customId: user.customId,
      },
    })
  } catch (err: any) {
    console.error("Login error:", err)
    return res.status(500).json({ error: "An error occurred" })
  }
})

router.get("/profile", async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.auth_token
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" })
    }
    const secret = process.env.JWT_SECRET || "your_jwt_secret"
    const decoded = jwt.verify(token, secret)
    return res.status(200).json({ user: decoded })
  } catch (err: any) {
    console.error("Profile error:", err)
    return res.status(401).json({ error: "Not authenticated" })
  }
})

export default router
