import { NextResponse } from "next/server"
import crypto from "crypto"

type OTPRecord = { otpHash: string; expires: Date; attempts: number }
const otpStore: { [email: string]: OTPRecord } = {}

function hashOTP(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex")
}

const MAX_ATTEMPTS = 5

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Missing email or OTP." },
        { status: 400 }
      )
    }

    const record = otpStore[email]

    if (!record) {
      return NextResponse.json(
        { message: "No OTP record found for this email." },
        { status: 404 }
      )
    }

    if (record.expires < new Date()) {
      delete otpStore[email]
      return NextResponse.json(
        { message: "OTP has expired. Please request a new one." },
        { status: 400 }
      )
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      delete otpStore[email]
      return NextResponse.json(
        { message: "Too many failed attempts. OTP has been invalidated." },
        { status: 403 }
      )
    }

    const hashedOTP = hashOTP(otp)
    if (hashedOTP !== record.otpHash) {
      otpStore[email].attempts += 1
      return NextResponse.json(
        { message: "Invalid OTP. Please try again." },
        { status: 400 }
      )
    }

    delete otpStore[email]

    return NextResponse.json({ message: "Email verified successfully." })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
