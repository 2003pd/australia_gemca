import mysql from "mysql2/promise";

const poolConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "gemca_db",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Prevent creating multiple connection pools in hot-reloading development environments
const globalForDb = global as unknown as { dbPool: mysql.Pool | undefined };

export const pool = globalForDb.dbPool ?? mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbPool = pool;
}

/**
 * Executes a SQL query with parameters and returns the results.
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}
