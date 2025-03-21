import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import {
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../templates/email/templates/verificationEmail"
import { generateCustomId, generateOTP } from "../utils/authUtils"

const prisma = new PrismaClient()

export const RegisterController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = req.body

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered",
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)

    // Generate OTP
    const otp = generateOTP()
    console.log(otp)
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 15)

    // Generate custom ID
    const customId = generateCustomId(data.role)

    // Create transaction to ensure user and role-specific profile are created together
    const result = await prisma.$transaction(async (prisma) => {
      // Create base user
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: hashedPassword,
          phone: {
            countryCode: data.phone.countryCode,
            number: data.phone.number,
          },
          role: data.role,
          customId: customId,
          verificationOTP: otp,
          verificationOTPExpiry: otpExpiry,
          isVerified: false,
        },
      })

      // Create role-specific profile based on user role
      if (data.role === "student") {
        await prisma.studentProfile.create({
          data: {
            userId: newUser.id,
            prnNumber: (await generatePRNNumber()).toString(),
            fullName: data.name,
            phoneNumber: `${data.phone.countryCode}${data.phone.number}`,
            parentsPhone: data.parentsPhone || "",
            email: data.email,
            address: data.address || "",
            currentSemester: data.currentSemester || 1,
            currentAcademicYear:
              data.currentAcademicYear || getCurrentAcademicYear(),
            department: data.department || "",
            className: data.className || "",
            fees: data.fees || 0,
            dues: data.dues || 0,
          },
        })
      } else if (data.role === "teacher") {
        await prisma.teacherProfile.create({
          data: {
            userId: newUser.id,
            collegeId: data.collegeId,
            firstName: data.firstName || data.name.split(" ")[0],
            lastName: data.lastName || data.name.split(" ").slice(-1)[0],
            department: data.department || "",
            subjects: data.subjects || [],
          },
        })
      } else if (data.role === "staff") {
        await prisma.staffProfile.create({
          data: {
            userId: newUser.id,
            collegeId: data.collegeId,
            firstName: data.firstName || data.name.split(" ")[0],
            lastName: data.lastName || data.name.split(" ").slice(-1)[0],
            department: data.department || "",
            roleTitle: data.roleTitle || "",
          },
        })
      }

      return newUser
    })

    // Send verification email
    // await sendVerificationEmail(result.email, result.name, otp)

    return res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
      userId: result.id,
      customId: result.customId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return res.status(500).json({
      error: "Registration failed. Please try again later.",
      details:
        process.env.NODE_ENV === "development"
          ? (error as any).message
          : undefined,
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
    const { identifier, password } = req.body
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

function getCurrentAcademicYear(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  if (month >= 7) {
    // After June
    return `${year}-${year + 1}`
  } else {
    return `${year - 1}-${year}`
  }
}

async function generatePRNNumber(): Promise<string> {
  const currentYear = new Date().getFullYear().toString() // e.g. "2025"

  const lastStudent = await prisma.studentProfile.findFirst({
    where: {
      prnNumber: {
        startsWith: currentYear,
      },
    },
    orderBy: {
      prnNumber: "desc",
    },
    select: {
      prnNumber: true,
    },
  })

  let sequenceNumber = 1
  if (lastStudent && lastStudent.prnNumber) {
    // Extract the sequence part (last 6 digits) and increment it
    const lastSequence = parseInt(lastStudent.prnNumber.substring(4), 10)
    sequenceNumber = lastSequence + 1
  }

  // Pad the sequence number to 6 digits
  const sequenceString = sequenceNumber.toString().padStart(6, "0")
  return `${currentYear}${sequenceString}` // Returns a 10-digit PRN number
}
