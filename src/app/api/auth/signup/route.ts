import { NextResponse } from "next/server"
import db from "@/lib/db"
import { users, studentProfiles } from "@/lib/db/schema"
import {
  hashPassword,
  generateCustomId,
  generateOTP,
  validatePassword,
} from "@/lib/crypto"
import { sendVerificationEmail } from "@/lib/email"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
})

function splitName(fullName: string) {
  const parts = fullName.trim().split(" ")
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || "",
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsedData = signupSchema.safeParse(json)
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      )
    }
    const { name, email, password, phone } = parsedData.data

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }

    const { hash, salt } = hashPassword(password)
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000)
    const { firstName, lastName } = splitName(name)
    const prnNumber = generateCustomId()

    const newUserWithProfile = await db.transaction(async (trx) => {
      const newUser = await trx
        .insert(users)
        .values({
          email: email,
          createdAt: new Date(),
          passwordHash: hash,
          passwordSalt: salt,
          customId: generateCustomId(),
          role: "student",
          otp,
          otpExpiry,
          isVerified: false,
          phone: phone || null,
        })
        .returning({ id: users.id })
      await trx.insert(studentProfiles).values({
        userId: newUser[0].id,
        firstName,
        lastName,
        prnNumber,
      })
      return newUser[0]
    })

    const emailSent = await sendVerificationEmail(email, otp, name)
    if (!emailSent) {
      console.error("Failed to send verification email")
    }

    return NextResponse.json({
      message:
        "Account created successfully. Please check your email to verify your account.",
      userId: newUserWithProfile.id,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
