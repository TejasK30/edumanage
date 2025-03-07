import type { NextApiRequest, NextApiResponse } from "next"
import db from "@/lib/db"
import { colleges } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const { collegeID } = req.body
    if (!collegeID) {
      return res.status(400).json({ error: "Missing collegeID" })
    }

    const collegeRecords = await db
      .select()
      .from(colleges)
      .where(eq(colleges.id, collegeID))
    if (collegeRecords.length === 0) {
      return res.status(404).json({ error: "College not found" })
    }
    const college = collegeRecords[0]

    const signupLink = `https://yourapp.com/student/signup?collegeId=${college.code}`

    await db
      .update(colleges)
      .set({ signupLink })
      .where(eq(colleges.id, collegeID))

    return res.status(200).json({ signupLink })
  } catch (error) {
    console.error("Finalize error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
