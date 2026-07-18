"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { query } from "../lib/db";

export interface ExpertData {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  qualifications: string[];
  specialties: string[];
  languages: string[];
  achievement: string;
  stat: string;
  orderIndex: number;
}

const CREATE_EXPERTS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS experts (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    role VARCHAR(191) NOT NULL,
    image TEXT NOT NULL,
    experience VARCHAR(191) NOT NULL,
    qualifications JSON NOT NULL,
    specialties JSON NOT NULL,
    languages JSON NOT NULL,
    achievement TEXT NOT NULL,
    stat VARCHAR(191) NOT NULL,
    orderIndex INT NOT NULL DEFAULT 0,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

const DEFAULT_EXPERTS: ExpertData[] = [
  {
    id: "expert-ansar-goraya",
    name: "Ansar Goraya",
    role: "Founder and Principal Consultant",
    image: "/testimonial-consultation.png",
    experience: "5+ years",
    qualifications: ["LLB", "Master of Migration Law, ACU Melbourne", "Former Director, CECA Truganina"],
    specialties: ["Skilled Migration", "Student Pathways", "Partner Visa Evidence", "PR Strategy"],
    languages: ["English", "Punjabi", "Urdu", "Hindi"],
    achievement: "Built GEMCA around education-first migration guidance.",
    stat: "1:1",
    orderIndex: 1,
  },
  {
    id: "expert-education-advisory",
    name: "Education Advisory Team",
    role: "Course and Admissions Strategy",
    image: "/image.png",
    experience: "Study pathways",
    qualifications: ["Course mapping", "Admissions support", "Genuine Student planning"],
    specialties: ["Student Visa 500", "Universities", "Scholarships"],
    languages: ["English", "Hindi", "Punjabi"],
    achievement: "Turns study goals into realistic course and visa-ready plans.",
    stat: "500+",
    orderIndex: 2,
  },
  {
    id: "expert-case-coordination",
    name: "Case Coordination Team",
    role: "Documents and Client Experience",
    image: "/testimonial-consultation.png",
    experience: "Evidence review",
    qualifications: ["Checklist design", "Timeline tracking", "Application coordination"],
    specialties: ["Document Preparation", "EOI Support", "Skills Assessment"],
    languages: ["English", "Urdu", "Hindi"],
    achievement: "Keeps complex matters organised, visible and calm.",
    stat: "40+",
    orderIndex: 3,
  },
];

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function normalizeExpert(row: any): ExpertData {
  return {
    id: String(row.id),
    name: String(row.name),
    role: String(row.role),
    image: String(row.image),
    experience: String(row.experience),
    qualifications: parseJsonArray(row.qualifications),
    specialties: parseJsonArray(row.specialties),
    languages: parseJsonArray(row.languages),
    achievement: String(row.achievement),
    stat: String(row.stat),
    orderIndex: Number(row.orderIndex ?? 0),
  };
}

async function ensureExpertsTable() {
  await query(CREATE_EXPERTS_TABLE_SQL);
  const countResult = await query<Array<{ count: number }>>("SELECT COUNT(*) as count FROM experts");
  const count = countResult[0]?.count ?? 0;

  if (count === 0) {
    for (const expert of DEFAULT_EXPERTS) {
      await insertExpert(expert);
    }
  }
}

async function insertExpert(expert: ExpertData) {
  await query(
    `INSERT INTO experts
      (id, name, role, image, experience, qualifications, specialties, languages, achievement, stat, orderIndex)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      expert.id,
      expert.name,
      expert.role,
      expert.image,
      expert.experience,
      JSON.stringify(expert.qualifications),
      JSON.stringify(expert.specialties),
      JSON.stringify(expert.languages),
      expert.achievement,
      expert.stat,
      expert.orderIndex,
    ]
  );
}

export async function getExpertsAction() {
  try {
    await ensureExpertsTable();
    const rows = await query("SELECT * FROM experts ORDER BY orderIndex ASC, createdAt ASC");
    return { success: true, data: (rows as any[]).map(normalizeExpert) };
  } catch (error: any) {
    console.error("Failed to fetch experts:", error);
    return { success: false, error: error.message || String(error), data: DEFAULT_EXPERTS };
  }
}

export async function createExpertAction(expert: ExpertData) {
  try {
    await ensureExpertsTable();
    await insertExpert(expert);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create expert:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function updateExpertAction(expert: ExpertData) {
  try {
    await ensureExpertsTable();
    await query(
      `UPDATE experts
       SET name = ?, role = ?, image = ?, experience = ?, qualifications = ?,
           specialties = ?, languages = ?, achievement = ?, stat = ?, orderIndex = ?
       WHERE id = ?`,
      [
        expert.name,
        expert.role,
        expert.image,
        expert.experience,
        JSON.stringify(expert.qualifications),
        JSON.stringify(expert.specialties),
        JSON.stringify(expert.languages),
        expert.achievement,
        expert.stat,
        expert.orderIndex,
        expert.id,
      ]
    );
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update expert:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function deleteExpertAction(id: string) {
  try {
    await ensureExpertsTable();
    await query("DELETE FROM experts WHERE id = ?", [id]);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete expert:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function uploadExpertImageAction(formData: FormData) {
  try {
    const file = formData.get("image");
    if (!(file instanceof File) || file.size === 0) {
      return { success: false, error: "Please select an image file." };
    }

    if (!file.type.startsWith("image/")) {
      return { success: false, error: "Only image files are allowed." };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "Image must be smaller than 5MB." };
    }

    const extension = path.extname(file.name).toLowerCase() || ".png";
    const safeName = `expert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "experts");
    const uploadPath = path.join(uploadDir, safeName);

    await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(uploadPath, Buffer.from(bytes));

    return { success: true, path: `/uploads/experts/${safeName}` };
  } catch (error: any) {
    console.error("Failed to upload expert image:", error);
    return { success: false, error: error.message || String(error) };
  }
}
