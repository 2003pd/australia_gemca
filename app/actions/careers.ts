"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { query } from "../lib/db";
import { initDatabase } from "../lib/dbInit";

const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function submitCareerApplicationAction(formData: FormData) {
  try {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const role = String(formData.get("role") || "General Career Interest").trim();
    const message = String(formData.get("message") || "").trim();
    const resume = formData.get("resume");

    if (!name || !email || !phone || !(resume instanceof File) || resume.size === 0) {
      return { success: false, error: "Please fill all required fields and select a resume." };
    }

    if (!allowedResumeTypes.has(resume.type)) {
      return { success: false, error: "Resume must be PDF, DOC, or DOCX." };
    }

    if (resume.size > 5 * 1024 * 1024) {
      return { success: false, error: "Resume must be smaller than 5MB." };
    }

    const extension = path.extname(resume.name).toLowerCase() || ".pdf";
    const safeName = `resume-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    const uploadPath = path.join(uploadDir, safeName);

    await mkdir(uploadDir, { recursive: true });
    const bytes = await resume.arrayBuffer();
    await writeFile(uploadPath, Buffer.from(bytes));

    const resumePath = `/uploads/resumes/${safeName}`;
    await initDatabase();
    await query(
      "INSERT INTO leads (id, name, email, phone, visaSubclass, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        `career-${Date.now()}`,
        name,
        email,
        phone,
        `Career Application - ${role}`,
        [`Career application from /career page.`, `Role: ${role}`, `Resume: ${resumePath}`, `Message: ${message}`].join("\n"),
        "New",
        new Date().toISOString().split("T")[0],
      ]
    );

    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit career application:", error);
    return { success: false, error: error.message || String(error) };
  }
}
