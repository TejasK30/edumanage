import { generateCustomId, generateOTP, hashPassword } from "@/lib/crypto"
import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { sendVerificationEmail } from "@/lib/email"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsedData = signupSchema.safeParse(json)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.issues[0].message || "Invalid input" },
        { status: 400 }
      )
    }

    const { name, email, password, phone } = parsedData.data

    if (password.length < 6) {
      // Basic password length validation
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    } // Check for existing user by email

    const existingUserByEmail = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    } // Check for existing user by phone if provided

    if (phone) {
      const existingUserByPhone = await db.query.users.findFirst({
        where: eq(users.phone, phone),
      })

      if (existingUserByPhone) {
        return NextResponse.json(
          { error: "Phone number already registered" },
          { status: 409 }
        )
      }
    }
    // Hash password

    const { hash: passwordHash, salt: passwordSalt } = await hashPassword(
      password
    )
    const otp = generateOTP()
    console.log(otp)
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000)
    const customId = generateCustomId()

    try {
      const newUser = await db.transaction(async (trx) => {
        const [insertedUser] = await trx
          .insert(users)
          .values({
            email,
            customId,
            passwordHash, // Use passwordHash from bcrypt
            passwordSalt, // Use passwordSalt from bcrypt
            role: "student",
            phone: phone || null,
            otp,
            otpExpiry,
            isVerified: false, // Default is false as per schema
          })
          .returning({ id: users.id })

        if (!insertedUser?.id) {
          throw new Error("User insertion failed")
        }

        return insertedUser
      })

      try {
        await sendVerificationEmail(email, otp, name)
        console.log(otp)
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
      }

      return NextResponse.json({
        message:
          "Account created successfully. Please check your email to verify your account.",
        userId: newUser.id,
      })
    } catch (dbError) {
      console.error("Database error during signup:", dbError)
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
