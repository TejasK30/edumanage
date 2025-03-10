import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { generateOTP, generateCustomId } from "../utils/authUtils"
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../templates/email/templates/verificationEmail"
import { loginSchema, signupSchema } from "../schema/authSchema"

const prisma = new PrismaClient()

export const RegisterController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const validatedData = signupSchema.parse(req.body)

    console.log(validatedData)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered",
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(validatedData.password, salt)

    const otp = generateOTP()
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 15)

    const customId = generateCustomId(validatedData.role)

    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        passwordHash: hashedPassword,
        phone: `${validatedData.phone.countryCode}${validatedData.phone.number}`,
        role: validatedData.role,
        customId: customId,
        verificationOTP: otp,
        verificationOTPExpiry: otpExpiry,
        isVerified: false,
      },
    })

    await sendVerificationEmail(newUser.email, newUser.name, otp)

    return res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
      userId: newUser.id,
      customId: newUser.customId,
    })
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      })
    }

    return res.status(500).json({
      error: "Registration failed. Please try again later.",
    })
  }
}

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" })
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ error: "Invalid OTP" })
    }

    if (user.verificationOTPExpiry && user.verificationOTPExpiry < new Date()) {
      return res.status(400).json({ error: "OTP expired" })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationOTP: null,
        verificationOTPExpiry: null,
      },
    })

    await sendWelcomeEmail(user.email, user.name)

    return res.status(200).json({
      message: "Email verified successfully. You can now log in.",
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return res.status(500).json({
      error: "Email verification failed. Please try again later.",
    })
  }
}

export const resendOTP = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" })
    }

    const otp = generateOTP()
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 15)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationOTP: otp,
        verificationOTPExpiry: otpExpiry,
      },
    })

    await sendVerificationEmail(user.email, user.name, otp)

    return res.status(200).json({
      message: "Verification code resent. Please check your email.",
    })
  } catch (error) {
    console.error("Resend OTP error:", error)
    return res.status(500).json({
      error: "Failed to resend verification code. Please try again later.",
    })
  }
}

export const LoginController = async (
  req: Request,
  res: Response
): Promise<any> => {
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

    if (!user.isVerified) {
      return res.status(401).json({
        error: "Email not verified",
        needsVerification: true,
        email: user.email,
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
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
      maxAge: 60 * 60 * 24 * 1000,
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
        name: user.name,
      },
    })
  } catch (err: any) {
    console.error("Login error:", err)

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: err.errors,
      })
    }

    return res.status(500).json({ error: "An error occurred during login" })
  }
}

export const LogoutController = (req: Request, res: Response): void => {
  res.clearCookie("auth_token")
  res.status(200).json({ message: "Logged out successfully" })
}

export const ProfileController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.cookies.auth_token
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret"
    const decoded = jwt.verify(token, secret) as any

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        customId: true,
        phone: true,
        isVerified: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.status(200).json({ user })
  } catch (err: any) {
    console.error("Profile error:", err)
    return res.status(401).json({ error: "Not authenticated" })
  }
}

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }
    const userId = req.user.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        customId: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        lastSeen: true,
        isOnline: true,
        studentProfile:
          req.user.role === "student"
            ? {
                select: {
                  id: true,
                  fullName: true,
                  department: true,
                  currentSemester: true,
                  currentAcademicYear: true,
                  className: true,
                  collegeId: true,
                },
              }
            : undefined,
        teacherProfile:
          req.user.role === "teacher"
            ? {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  department: true,
                  collegeId: true,
                },
              }
            : undefined,
        staffProfile:
          req.user.role === "staff"
            ? {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  roleTitle: true,
                  department: true,
                  collegeId: true,
                },
              }
            : undefined,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.json({ user })
  } catch (error) {
    console.error("Get current user error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
