import { createHmac, timingSafeEqual } from "crypto"

interface JWTPayload {
  userId: string
  exp: number
  iat: number
}

export class JWT {
  private static readonly algorithm = "sha256"
  private static readonly secret = process.env.JWT_SECRET!

  static sign(payload: Omit<JWTPayload, "iat">): string {
    const header = Buffer.from(
      JSON.stringify({ alg: this.algorithm, typ: "JWT" })
    ).toString("base64url")
    const now = Math.floor(Date.now() / 1000)
    const fullPayload = Buffer.from(
      JSON.stringify({ ...payload, iat: now })
    ).toString("base64url")

    const signature = createHmac(this.algorithm, this.secret)
      .update(`${header}.${fullPayload}`)
      .digest("base64url")

    return `${header}.${fullPayload}.${signature}`
  }

  static verify(token: string): JWTPayload {
    const parts = token.split(".")
    if (parts.length !== 3) throw new Error("Invalid token format")

    const [header, payload, signature] = parts

    const expectedSignature = createHmac(this.algorithm, this.secret)
      .update(`${header}.${payload}`)
      .digest("base64url")

    const signatureBuffer = Buffer.from(signature)
    const expectedSignatureBuffer = Buffer.from(expectedSignature)

    if (!timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
      throw new Error("Invalid signature")
    }

    const decodedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    ) as JWTPayload

    if (
      decodedPayload.exp &&
      decodedPayload.exp < Math.floor(Date.now() / 1000)
    ) {
      throw new Error("Token expired")
    }

    return decodedPayload
  }
}
