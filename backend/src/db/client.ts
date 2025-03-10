import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
export const prisma = new PrismaClient()

async function checkDbConnection() {
  try {
    await prisma.$connect()
    console.log("Database is connected successfully!")
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
}

checkDbConnection()
