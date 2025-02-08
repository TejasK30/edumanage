import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { desc, sql } from "drizzle-orm"

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

export async function getNextSequenceForRole(role: string): Promise<number> {
  const sequenceResult = await db
    .select()
    .from(users)
    .where(sql`${users.role} = ${role}`)
    .orderBy(desc(users.customId))
    .limit(1)

  const lastSequence =
    sequenceResult.length > 0
      ? parseInt(sequenceResult[0].customId.slice(-3))
      : 0

  return lastSequence + 1
}
