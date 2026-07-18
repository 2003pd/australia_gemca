"use server";

import { query } from "../lib/db";

// ==========================================
// CATEGORIES SERVER ACTIONS (RAW SQL)
// ==========================================

/**
 * Fetches all categories, ordered by displayOrder
 */
export async function getCategoryListAction() {
  try {
    const categories = await query("SELECT * FROM visa_categories ORDER BY displayOrder ASC");
    return { success: true, data: categories };
  } catch (error: any) {
    console.error("getCategoryListAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Creates a new visa category
 */
export async function createCategoryAction(data: any) {
  try {
    const id = data.id || `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await query(
      "INSERT INTO visa_categories (id, name, slug, description, icon, displayOrder, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        id, 
        data.name, 
        data.slug, 
        data.description || "", 
        data.icon || "Compass", 
        parseInt(data.displayOrder || "0", 10), 
        data.status || "Active"
      ]
    );
    return { success: true, data: { id, ...data } };
  } catch (error: any) {
    console.error("createCategoryAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Updates a visa category
 */
export async function updateCategoryAction(id: string, data: any) {
  try {
    await query(
      "UPDATE visa_categories SET name = ?, slug = ?, description = ?, icon = ?, displayOrder = ?, status = ?, updatedAt = NOW() WHERE id = ?",
      [data.name, data.slug, data.description, data.icon, parseInt(data.displayOrder || "0", 10), data.status, id]
    );
    return { success: true };
  } catch (error: any) {
    console.error("updateCategoryAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Deletes a visa category
 */
export async function deleteCategoryAction(id: string) {
  try {
    await query("DELETE FROM visa_categories WHERE id = ?", [id]);
    return { success: true };
  } catch (error: any) {
    console.error("deleteCategoryAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

// ==========================================
// VISAS SERVER ACTIONS (RAW SQL)
// ==========================================

/**
 * Fetches all visas with categories
 */
export async function getVisaListAction() {
  try {
    const visas = await query(`
      SELECT v.*, vc.name as categoryName, vc.slug as categorySlug 
      FROM visas v
      LEFT JOIN visa_categories vc ON v.categoryId = vc.id
      ORDER BY v.subclass ASC, v.name ASC
    `);

    // Format relation object to match UI expectation (visa.category.name)
    const formattedVisas = (visas as any[]).map((v) => ({
      ...v,
      category: v.categoryName ? { name: v.categoryName, slug: v.categorySlug } : null
    }));

    return { success: true, data: formattedVisas };
  } catch (error: any) {
    console.error("getVisaListAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Fetches a single visa by slug
 */
export async function getVisaBySlugAction(slug: string) {
  try {
    const visas = await query(`
      SELECT v.*, vc.name as categoryName, vc.slug as categorySlug 
      FROM visas v
      LEFT JOIN visa_categories vc ON v.categoryId = vc.id
      WHERE v.slug = ?
    `, [slug]);

    if ((visas as any[]).length === 0) {
      return { success: false, error: "Visa not found" };
    }

    const visa = (visas as any[])[0];
    const [eligibilities, documents, steps, faqs] = await Promise.all([
      query("SELECT title, description, detailUrl FROM visa_eligibility WHERE visaId = ? ORDER BY title ASC", [visa.id]),
      query("SELECT name, category, description, required FROM visa_documents WHERE visaId = ? ORDER BY category ASC, name ASC", [visa.id]),
      query("SELECT stepNumber, title, description FROM visa_steps WHERE visaId = ? ORDER BY stepNumber ASC", [visa.id]),
      query("SELECT question, answer FROM visa_faqs WHERE visaId = ? ORDER BY id ASC", [visa.id]),
    ]);

    const formattedVisa = {
      ...visa,
      category: visa.categoryName ? { name: visa.categoryName, slug: visa.categorySlug } : null,
      eligibilities,
      documents,
      steps,
      faqs,
    };

    return { success: true, data: formattedVisa };
  } catch (error: any) {
    console.error("getVisaBySlugAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Fetches a single visa by ID
 */
export async function getVisaByIdAction(id: string) {
  try {
    const visas = await query("SELECT * FROM visas WHERE id = ?", [id]);
    if ((visas as any[]).length === 0) {
      return { success: false, error: "Visa not found" };
    }
    return { success: true, data: (visas as any[])[0] };
  } catch (error: any) {
    console.error("getVisaByIdAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Creates a visa subclass in the database
 */
export async function createVisaAction(payload: any) {
  try {
    const id = payload.id || `visa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const { 
      name, subclass, slug, categoryId, status, heroImage, summary,
      whoCanApply, stay, travel, work, study, baseCost, effectiveDate, seoOgImage
    } = payload;

    await query(`
      INSERT INTO visas (
        id, name, subclass, slug, categoryId, status, heroImage, summary,
        whoCanApply, stay, travel, work, study, baseCost, effectiveDate, seoOgImage, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      id,
      name,
      subclass,
      slug,
      categoryId,
      status || "Published",
      heroImage || null,
      summary || "",
      whoCanApply || "",
      stay || "",
      travel || "",
      work || "",
      study || "",
      baseCost ? parseFloat(baseCost) : 0,
      effectiveDate ? new Date(effectiveDate) : new Date(),
      seoOgImage || null
    ]);

    return { success: true, data: { id, ...payload } };
  } catch (error: any) {
    console.error("createVisaAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Updates a visa record
 */
export async function updateVisaAction(id: string, payload: any) {
  try {
    const { 
      name, subclass, slug, categoryId, status, heroImage, summary,
      whoCanApply, stay, travel, work, study, baseCost, effectiveDate, seoOgImage
    } = payload;

    await query(`
      UPDATE visas SET 
        name = ?, subclass = ?, slug = ?, categoryId = ?, status = ?, 
        heroImage = ?, summary = ?, whoCanApply = ?, stay = ?, 
        travel = ?, work = ?, study = ?, baseCost = ?, effectiveDate = ?, 
        seoOgImage = ?, updatedAt = NOW() 
      WHERE id = ?
    `, [
      name,
      subclass,
      slug,
      categoryId,
      status,
      heroImage,
      summary,
      whoCanApply,
      stay,
      travel,
      work,
      study,
      baseCost ? parseFloat(baseCost) : 0,
      effectiveDate ? new Date(effectiveDate) : new Date(),
      seoOgImage,
      id
    ]);

    return { success: true };
  } catch (error: any) {
    console.error("updateVisaAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Deletes a visa subclass
 */
export async function deleteVisaAction(id: string) {
  try {
    await query("DELETE FROM visas WHERE id = ?", [id]);
    return { success: true };
  } catch (error: any) {
    console.error("deleteVisaAction error:", error);
    return { success: false, error: error.message || String(error) };
  }
}
