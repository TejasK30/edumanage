import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq, or } from "drizzle-orm"
import { verifyPassword } from "@/lib/crypto"
import { JWT } from "@/lib/jwt"

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    const { identifier, password } = validatedData

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    const isPhone = /^[+]?[0-9]{10,15}$/.test(identifier)
    const isUserId = /^[a-zA-Z0-9_-]{3,30}$/.test(identifier)

    const user = await db.query.users.findFirst({
      where: or(
        isEmail ? eq(users.email, identifier) : undefined,
        isPhone ? eq(users.phone, identifier) : undefined,
        isUserId ? eq(users.id, identifier) : undefined
      ),
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const isValidPassword = verifyPassword(
      password,
      user.passwordHash,
      user.passwordSalt
    )

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = JWT.sign({
      userId: user.id,
      exp: Math.floor(Date.now() / 1000) + 24 * 3600,
    })

    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 3600,
    })

    return NextResponse.json({
      user: { id: user.id, email: user.email },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
