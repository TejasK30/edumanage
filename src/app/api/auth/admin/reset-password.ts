import type { NextApiRequest, NextApiResponse } from "next"
import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { z } from "zod"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"

const resetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    token: z.string(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { email, token, newPassword } = resetPasswordSchema.parse(req.body)

    const userRecords = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    if (userRecords.length === 0) {
      return res
        .status(200)
        .json({ message: "If an account exists, a reset link has been sent." })
    }
    const user = userRecords[0]

    const now = new Date()
    if (
      user.otp !== token ||
      !user.otpExpiry ||
      new Date(user.otpExpiry) < now
    ) {
      return res
        .status(400)
        .json({ error: "Reset token is invalid or has expired" })
    }

    const saltRounds = 12
    const salt = await bcrypt.genSalt(saltRounds)
    const newHash = await bcrypt.hash(newPassword, salt)

    await db
      .update(users)
      .set({
        passwordHash: newHash,
        passwordSalt: salt,
        otp: null,
        otpExpiry: null,
      })
      .where(eq(users.email, email))

    return res.status(200).json({ message: "Password reset successfully" })
  } catch (error: unknown) {
    console.error("Reset password error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
