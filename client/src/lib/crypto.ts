import { randomBytes } from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 10

interface TokenPayload {
  id: string
  email: string
  role: string
  customId: string
}

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET is not defined")
  }

  return jwt.sign(payload, secret, { expiresIn: "1d" })
}

export function generateCustomId(length: number = 10): string {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz"
  let result = ""
  const randomValues = randomBytes(length)
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length]
  }
  return result
}

export function generateOTP(): string {
  return randomBytes(3).readUIntBE(0, 3).toString().padStart(6, "0").slice(-6)
}

export async function hashPassword(
  password: string
): Promise<{ hash: string; salt: string }> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hash = await bcrypt.hash(password, salt)
  return { hash, salt }
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}
