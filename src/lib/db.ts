import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://career_user:career_password@postgres-service:5432/career_loop'

export const sql = postgres(connectionString)
export const db = drizzle(sql)