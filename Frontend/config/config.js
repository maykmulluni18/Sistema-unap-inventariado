import dotenv from "dotenv"
dotenv.config()
export const DB_URL = process.env.DB_HOST || 'localhost'


