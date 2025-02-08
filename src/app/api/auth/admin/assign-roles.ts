import db from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

const roleAssignmentSchema = z.object({
  principal: z.object({
    userId: z.string(),
    fullName: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(5),
    phone: z.string().min(7),
  }),
  vicePrincipal: z.object({
    userId: z.string(),
    fullName: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(5),
    phone: z.string().min(7),
  }),
  teachers: z.array(
    z.object({
      userId: z.string(),
      fullName: z.string().min(2),
      email: z.string().email(),
      address: z.string().min(5),
      phone: z.string().min(7),
      department: z.string().min(2),
      allocatedSubjects: z.string().min(1),
    })
  ),
})

export type RoleAssignmentData = z.infer<typeof roleAssignmentSchema>

// --- Email Template ---

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export const createRoleAssignmentEmail = (
  name: string,
  role: string,
  extra?: string
): EmailTemplate => ({
  subject: `Role Assigned: ${role}`,
  html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      color: #161427;
      padding: 20px;
      border: 1px solid #d9d9dc;
    ">
      <h2 style="color: #0569ff; margin-bottom: 20px;">Role Assignment Notification</h2>
      <p>Dear ${name},</p>
      <p>You have been assigned the role of <strong>${role}</strong>.</p>
      ${extra ? `<p>${extra}</p>` : ""}
      <p>If you have any questions, please contact your administrator.</p>
      <p>Best regards,<br>The Team</p>
    </div>
  `,
  text: `
    Dear ${name},

    You have been assigned the role of ${role}.
    ${extra ? extra + "\n" : ""}
    If you have any questions, please contact your administrator.

    Best regards,
    The Team
  `,
})

// --- Database Update Function ---
async function updateUserRoles(data: RoleAssignmentData) {
  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({ role: "principal" })
      .where(eq(users.id, data.principal.userId))
    await tx
      .update(users)
      .set({ role: "vicePrincipal" })
      .where(eq(users.id, data.vicePrincipal.userId))
    for (const teacher of data.teachers) {
      await tx
        .update(users)
        .set({ role: "teacher" })
        .where(eq(users.id, teacher.userId))
    }
  })
}

async function sendEmail(template: EmailTemplate, to: string) {
  console.log(`Sending email to ${to}:
Subject: ${template.subject}
HTML: ${template.html}
Text: ${template.text}`)
  return Promise.resolve()
}

async function sendRoleAssignmentNotification(data: RoleAssignmentData) {
  await Promise.all([
    sendEmail(
      createRoleAssignmentEmail(data.principal.fullName, "Principal"),
      data.principal.email
    ),
    sendEmail(
      createRoleAssignmentEmail(data.vicePrincipal.fullName, "Vice Principal"),
      data.vicePrincipal.email
    ),
    ...data.teachers.map((teacher) =>
      sendEmail(
        createRoleAssignmentEmail(
          teacher.fullName,
          "Teacher",
          `Department: ${teacher.department}\nAllocated Subjects: ${teacher.allocatedSubjects}`
        ),
        teacher.email
      )
    ),
  ])
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const roleData = req.body
    const validatedData = roleAssignmentSchema.parse(roleData)
    await updateUserRoles(validatedData)
    await sendRoleAssignmentNotification(validatedData)
    return res.status(200).json(validatedData)
  } catch (error: any) {
    console.error("Assign roles error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
