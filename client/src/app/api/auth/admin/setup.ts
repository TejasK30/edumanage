import type { NextApiRequest, NextApiResponse } from "next"
import { colleges } from "@/lib/db/schema"
import db from "@/lib/db"

function generateCollegeCode(name: string): string {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  return `${initials}${randomDigits}`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const {
      collegeName,
      collegeAddress,
      collegeRating,
      collegeType,
      departments,
    } = req.body

    const code = generateCollegeCode(collegeName)

    const result = await db
      .insert(colleges)
      .values({
        name: collegeName,
        code,
        signupLink: "",
        address: collegeAddress,
        rating: collegeRating,
        type: collegeType,
        departments,
      })
      .returning()

    return res.status(200).json(result[0])
  } catch (error) {
    console.error("Setup error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
