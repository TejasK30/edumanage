import { NextResponse } from "next/server"
import crypto from "crypto"
import { emailService } from "@/lib/email/service"

type OTPRecord = { otpHash: string; expires: Date; attempts: number }
const otpStore: { [email: string]: OTPRecord } = {}

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString()
}

function hashOTP(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex")
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    if (!email || !name) {
      return NextResponse.json(
        { message: "Email and name are required." },
        { status: 400 }
      )
    }

    const otp = generateOTP()
    const hashedOTP = hashOTP(otp)

    otpStore[email] = {
      otpHash: hashedOTP,
      expires: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
    }

    const emailSent = await emailService.sendVerificationEmail(email, name, otp)

    if (!emailSent) {
      return NextResponse.json(
        { message: "Failed to send OTP email." },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "OTP sent successfully." })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
