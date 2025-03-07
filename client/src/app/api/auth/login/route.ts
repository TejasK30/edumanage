import db from "@/lib/db/"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyPassword, generateToken } from "@/lib/crypto"

const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Identifier is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  try {
    const reqBody = await req.json()
    const validatedData = loginSchema.safeParse(reqBody)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message || "Invalid input" },
        { status: 400 }
      )
    }

    const { identifier, password } = validatedData.data

    let user
    // Check if identifier is an email
    if (/^\S+@\S+\.\S+$/.test(identifier)) {
      user = await db.query.users.findFirst({
        where: eq(users.email, identifier),
      })
    }
    // Check if identifier is a phone number (allowing an optional leading '+')
    else if (/^\+?\d+$/.test(identifier)) {
      user = await db.query.users.findFirst({
        where: eq(users.phone, identifier),
      })
    }
    // Otherwise, treat as customId
    else {
      user = await db.query.users.findFirst({
        where: eq(users.customId, identifier),
      })
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const valid = await verifyPassword(password, user.passwordHash)

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      customId: user.customId,
    })

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      path: "/",
    })

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        customId: user.customId,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    )
  }
}
