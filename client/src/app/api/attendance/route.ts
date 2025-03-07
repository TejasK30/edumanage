// import { NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "../auth/[...nextauth]"
// import db from "@/lib/db"
// import { attendance, studentProfiles, teacherProfiles } from "@/lib/db/schema"
// import { and, eq } from "drizzle-orm"
// import { z } from "zod"

// const attendanceSchema = z.object({
//   studentIds: z.array(z.string().uuid()),
//   date: z.string().datetime(),
//   subject: z.string(),
//   isPresent: z.array(z.boolean()),
//   remarks: z.array(z.string().optional()),
// })

// export async function POST(req: NextRequest, res: NextResponse) {
//   const session = await getServerSession(req, res, authOptions)

//   // if (!session || session.user.role !== "teacher") {
//   //   return res.status(401).json({ error: "Unauthorized" })
//   // }

//   if (!session || session.user.role !== "teacher") {
//     return res.json()
//   }

//   if (req.method === "POST") {
//     try {
//       const validatedData = attendanceSchema.parse(req.body)
//       const { studentIds, date, subject, isPresent, remarks } = validatedData

//       const teacher = await db.query.teacherProfiles.findFirst({
//         where: eq(teacherProfiles.userId, session.user.id),
//       })

//       if (!teacher) {
//         return res.status(404).json({ error: "Teacher not found" })
//       }

//       const attendanceRecords = studentIds.map((studentId, index) => ({
//         studentId,
//         teacherId: teacher.id,
//         date: new Date(date),
//         subject,
//         isPresent: isPresent[index],
//         remarks: remarks[index],
//       }))

//       await db.insert(attendance).values(attendanceRecords)

//       return res.status(200).json({ message: "Attendance marked successfully" })
//     } catch (error) {
//       console.error("Attendance marking error:", error)
//       return res.status(400).json({ error: "Invalid request data" })
//     }
//   }

//   if (req.method === "GET") {
//     const { date, className } = req.query

//     if (!date || !className) {
//       return res.status(400).json({ error: "Missing required parameters" })
//     }

//     try {
//       const students = await db
//         .select({
//           id: studentProfiles.id,
//           fullName: studentProfiles.fullName,
//           customId: studentProfiles.customId,
//           isPresent: attendance.isPresent,
//           remarks: attendance.remarks,
//         })
//         .from(studentProfiles)
//         .leftJoin(
//           attendance,
//           and(
//             eq(attendance.studentId, studentProfiles.id),
//             eq(attendance.date, new Date(date as string))
//           )
//         )
//         .where(eq(studentProfiles.className, className as string))

//       return res.status(200).json(students)
//     } catch (error) {
//       console.error("Error fetching students:", error)
//       return res.status(500).json({ error: "Internal server error" })
//     }
//   }

//   return res.status(405).json({ error: "Method not allowed" })
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getServerSession(req, res, authOptions)

//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" })
//   }

//   const { studentId } = req.query
//   const { startDate, endDate } = req.query

//   if (!studentId || !startDate || !endDate) {
//     return res.status(400).json({ error: "Missing required parameters" })
//   }

//   try {
//     const attendanceRecords = await db
//       .select()
//       .from(attendance)
//       .where(
//         and(
//           eq(attendance.studentId, studentId as string),
//           between(
//             attendance.date,
//             new Date(startDate as string),
//             new Date(endDate as string)
//           )
//         )
//       )

//     return res.status(200).json(attendanceRecords)
//   } catch (error) {
//     console.error("Error fetching attendance:", error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }
