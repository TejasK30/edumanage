import { randomBytes, scryptSync, timingSafeEqual } from "crypto"

export function generateToken(length: number = 32): string {
  return randomBytes(length).toString("hex")
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

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return { hash, salt }
}

export function verifyPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const hashedBuffer = scryptSync(password, salt, 64)
  const hashBuffer = Buffer.from(hash, "hex")
  return timingSafeEqual(hashedBuffer, hashBuffer)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}
