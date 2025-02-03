import { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET!

export async function generateOTP(): Promise<string> {
  return crypto.randomInt(100000, 999999).toString() // More secure OTP generation
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export async function createJWT(userId: string): Promise<string> {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" })
}

export async function verifyJWT(token: string) {
  try {
    const verified = jwt.verify(token, JWT_SECRET) as { userId: string }
    return verified
  } catch (err) {
    console.log(err)
    return null
  }
}
