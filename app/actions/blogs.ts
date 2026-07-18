"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { query } from "../lib/db";

export interface BlogData {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  orderIndex: number;
}

const CREATE_BLOGS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(191) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    videoUrl TEXT NULL,
    orderIndex INT NOT NULL DEFAULT 0,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

const DEFAULT_BLOGS: BlogData[] = [
  {
    id: "blog-skilled-points",
    title: "How to read your skilled migration points",
    description: "A practical overview of age, English, education and work experience factors before starting a PR strategy.",
    image: "/testimonial-consultation.png",
    videoUrl: "",
    orderIndex: 1,
  },
  {
    id: "blog-student-pathway",
    title: "Choosing a course that supports your future plan",
    description: "Why course logic, genuine study intent and long-term goals should be aligned before lodging a student visa.",
    image: "/premium-hero-bg.png",
    videoUrl: "",
    orderIndex: 2,
  },
  {
    id: "blog-document-review",
    title: "Documents that make applications easier to review",
    description: "Simple ways to organize evidence, timelines and supporting files so your case is clearer from the beginning.",
    image: "/image.png",
    videoUrl: "",
    orderIndex: 3,
  },
];

async function ensureBlogsTable() {
  await query(CREATE_BLOGS_TABLE_SQL);
  const countResult = await query<Array<{ count: number }>>("SELECT COUNT(*) as count FROM blogs");
  const count = countResult[0]?.count ?? 0;

  if (count === 0) {
    for (const blog of DEFAULT_BLOGS) {
      await insertBlog(blog);
    }
  }
}

async function insertBlog(blog: BlogData) {
  await query(
    "INSERT INTO blogs (id, title, description, image, videoUrl, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
    [blog.id, blog.title, blog.description, blog.image, blog.videoUrl, blog.orderIndex]
  );
}

function normalizeBlog(row: any): BlogData {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description),
    image: String(row.image),
    videoUrl: String(row.videoUrl || ""),
    orderIndex: Number(row.orderIndex ?? 0),
  };
}

export async function getBlogsAction() {
  try {
    await ensureBlogsTable();
    const rows = await query("SELECT * FROM blogs ORDER BY orderIndex ASC, createdAt DESC");
    return { success: true, data: (rows as any[]).map(normalizeBlog) };
  } catch (error: any) {
    console.error("Failed to fetch blogs:", error);
    return { success: false, error: error.message || String(error), data: DEFAULT_BLOGS };
  }
}

export async function createBlogAction(blog: BlogData) {
  try {
    await ensureBlogsTable();
    await insertBlog(blog);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create blog:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function updateBlogAction(blog: BlogData) {
  try {
    await ensureBlogsTable();
    await query(
      "UPDATE blogs SET title = ?, description = ?, image = ?, videoUrl = ?, orderIndex = ? WHERE id = ?",
      [blog.title, blog.description, blog.image, blog.videoUrl, blog.orderIndex, blog.id]
    );
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update blog:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function deleteBlogAction(id: string) {
  try {
    await ensureBlogsTable();
    await query("DELETE FROM blogs WHERE id = ?", [id]);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete blog:", error);
    return { success: false, error: error.message || String(error) };
  }
}

export async function uploadBlogImageAction(formData: FormData) {
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
    const safeName = `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
    const uploadPath = path.join(uploadDir, safeName);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(uploadPath, Buffer.from(await file.arrayBuffer()));

    return { success: true, path: `/uploads/blogs/${safeName}` };
  } catch (error: any) {
    console.error("Failed to upload blog image:", error);
    return { success: false, error: error.message || String(error) };
  }
}
