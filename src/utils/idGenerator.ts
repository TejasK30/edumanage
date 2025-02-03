// src/lib/utils/idGenerator.ts
import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { sql } from "drizzle-orm"

// Helper function to generate a custom ID
export function generateCustomId(
  role: string,
  firstName: string,
  lastName: string,
  sequence: number
): string {
  const rolePrefix =
    {
      student: "STU",
      teacher: "TEA",
      admin: "ADM",
    }[role.toLowerCase()] || "USR"

  const initials = `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`
  const paddedSequence = sequence.toString().padStart(3, "0")

  return `${rolePrefix}${initials}${paddedSequence}`
}

// Helper function to get the next available sequence for a specific role
export async function getNextSequenceForRole(role: string): Promise<number> {
  const sequenceResult = await db
    .select()
    .from(users)
    .where(sql`${users.role} = ${role}`) // Use the sql template literal for equality comparison
    .orderBy(users.customId, "desc") // Correct way to order by customId in descending order
    .limit(1)

  const lastSequence =
    sequenceResult.length > 0
      ? parseInt(sequenceResult[0].customId.slice(-3)) // Extract the last 3 digits as the sequence
      : 0

  return lastSequence + 1
}
