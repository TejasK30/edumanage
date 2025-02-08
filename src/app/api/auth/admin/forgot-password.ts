import type { NextApiRequest, NextApiResponse } from "next"
import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { z } from "zod"
import crypto from "crypto"
import { addMinutes } from "date-fns"
import { eq } from "drizzle-orm"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export const createPasswordResetEmail = (
  name: string,
  resetLink: string
): EmailTemplate => ({
  subject: "Reset Your Password",
  html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      color: #161427;
      padding: 20px;
      border: 1px solid #d9d9dc;
    ">
      <h2 style="color: #0569ff; margin-bottom: 20px;">Reset Your Password</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${resetLink}" style="
          background-color: #0569ff;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-size: 16px;
        ">Reset Password</a>
      </div>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Best regards,<br>${
        process.env.NEXT_PUBLIC_APP_NAME || "Our App"
      } Team</p>
    </div>
  `,
  text: `
    Hello ${name},

    We received a request to reset your password.
    
    Please use the following link to reset your password:
    ${resetLink}
    
    If you did not request this, please ignore this email.
    
    Best regards,
    ${process.env.NEXT_PUBLIC_APP_NAME || "Our App"} Team
  `,
})

async function sendEmail(template: EmailTemplate, to: string) {
  console.log(`Sending email to ${to}:
Subject: ${template.subject}
HTML: ${template.html}
Text: ${template.text}`)
  return Promise.resolve()
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const { email } = forgotPasswordSchema.parse(req.body)

    const userRecords = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    if (userRecords.length === 0) {
      return res.status(200).json({
        message:
          "If an account exists with that email, you will receive a reset link.",
      })
    }
    const user = userRecords[0]

    const resetToken = crypto.randomBytes(20).toString("hex")
    const expiry = addMinutes(new Date(), 15)

    await db
      .update(users)
      .set({
        otp: resetToken,
        otpExpiry: expiry,
      })
      .where(eq(users.email, email))

    const resetLink = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    const name = user.customId || user.email
    const emailTemplate = createPasswordResetEmail(name, resetLink)

    await sendEmail(emailTemplate, email)

    return res.status(200).json({
      message:
        "If an account exists with that email, you will receive a reset link.",
    })
  } catch (error: unknown) {
    console.error("Forgot password error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
