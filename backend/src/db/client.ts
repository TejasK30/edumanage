import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
export const prisma = new PrismaClient()
