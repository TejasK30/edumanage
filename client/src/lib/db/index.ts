import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"
import { Pool } from "pg"

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "tkdev",
  database: "edumanage",
})
const db = drizzle(pool, { schema })

export default db
