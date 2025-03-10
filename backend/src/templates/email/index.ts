import { emailService } from "./service"

export async function sendVerificationEmail(
  email: string,
  otp: string,
  name: string
) {
  if (process.env.NODE_ENV === "development") {
    console.log(`Verification OTP for ${email}: ${otp}`)
    return true
  }

  return emailService.sendVerificationEmail(email, name, otp)
}
