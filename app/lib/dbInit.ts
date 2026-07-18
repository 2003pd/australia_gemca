import mysql from "mysql2/promise";
import { query } from "./db";

// SQL statement to create leads table matching the existing user schema
const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(191) NOT NULL,
    visaSubclass VARCHAR(191) NULL,
    message TEXT NOT NULL,
    status VARCHAR(191) NOT NULL DEFAULT 'New',
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

const INITIAL_LEADS = [
  {
    id: "lead-1",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+61 412 345 678",
    visaSubclass: "Student Visa (Subclass 500)",
    status: "In Progress",
    createdAt: "2026-07-15 10:00:00",
    message: "Needs help with Genuine Student statement (GS) and financial evidence. High academic profile. Targeting Melbourne Univ IT Master's."
  },
  {
    id: "lead-2",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+61 498 765 432",
    visaSubclass: "Skilled Independent (Subclass 189)",
    status: "Action Required",
    createdAt: "2026-07-14 11:30:00",
    message: "Skills Assessment received (ACS). Needs points review. Current points count: 85. Waiting on English test results (PTE Academic)."
  },
  {
    id: "lead-3",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+61 405 111 222",
    visaSubclass: "Partner Visa (Subclass 820)",
    status: "Approved",
    createdAt: "2026-07-10 14:15:00",
    message: "Application submitted, visa granted. Client notified. Onshore processing completed. Transitioning to Subclass 801 in 2 years."
  },
  {
    id: "lead-4",
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    phone: "+61 422 999 888",
    visaSubclass: "Employer Sponsored (Subclass 482)",
    status: "New",
    createdAt: "2026-07-16 09:00:00",
    message: "New inquiry from local hospitality group for chef nomination. Reviewing employer sponsor compliance and chef qualifications."
  },
  {
    id: "lead-5",
    name: "Wei Zhang",
    email: "wei.zhang@example.com",
    phone: "+61 433 222 111",
    visaSubclass: "Student Visa (Subclass 500)",
    status: "New",
    createdAt: "2026-07-16 09:45:00",
    message: "Wants to switch courses from Business to IT. Onshore student. Needs visa extension strategy and GTE/GS risk assessment."
  }
];

/**
 * Ensures the database exists, creates the 'leads' table with schema matching the database, and seeds if empty.
 */
export async function initDatabase() {
  let connection;
  try {
    const dbName = process.env.DB_DATABASE || "gemca_db";
    
    // 1. First connect to the server without database selected to create DB if needed
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: parseInt(process.env.DB_PORT || "3306", 10),
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();

    // 2. Create the table in the selected database using our shared pool query executor
    await query(CREATE_TABLE_SQL);

    // 3. Count records to verify if seeding is needed
    const countResult = await query("SELECT COUNT(*) as count FROM leads");
    const count = countResult[0]?.count ?? 0;

    if (count === 0) {
      console.log("Database table 'leads' is empty. Inserting default mock data...");
      for (const lead of INITIAL_LEADS) {
        await query(
          "INSERT INTO leads (id, name, email, phone, visaSubclass, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [lead.id, lead.name, lead.email, lead.phone, lead.visaSubclass, lead.message, lead.status, lead.createdAt]
        );
      }
      console.log("Mock data inserted successfully into 'leads' table.");
    }
    
    return { success: true, message: "Database initialized successfully" };
  } catch (error: any) {
    console.error("Database initialization error details:", error);
    return { success: false, error: error.message || String(error) };
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
  }
}
