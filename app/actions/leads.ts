"use server";

import { query } from "../lib/db";
import { initDatabase } from "../lib/dbInit";

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  pathway: string;
  status: "New" | "In Progress" | "Approved" | "Action Required";
  date: string;
  notes: string;
}

/**
 * Server Action to initialize the database
 */
export async function initDbAction() {
  try {
    return await initDatabase();
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Server Action to fetch all leads from MySQL database
 */
export async function getLeadsAction() {
  try {
    // Maps existing schema (visaSubclass, message, createdAt) to the UI fields (pathway, notes, date) using AS aliasing
    const leads = await query(
      "SELECT id, name, email, phone, visaSubclass as pathway, status, DATE_FORMAT(createdAt, '%Y-%m-%d') as date, message as notes FROM leads ORDER BY createdAt DESC, id DESC"
    );
    return { success: true, data: leads as LeadData[] };
  } catch (error: any) {
    console.error("Failed to fetch leads from database:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Server Action to add a new lead record to the database
 */
export async function addLeadAction(lead: LeadData) {
  try {
    // Inserts utilizing the exact physical column names of the database
    await query(
      "INSERT INTO leads (id, name, email, phone, visaSubclass, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [lead.id, lead.name, lead.email, lead.phone, lead.pathway, lead.notes, lead.status, lead.date]
    );
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add lead to database:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Server Action to update the status of a lead record in the database
 */
export async function updateLeadStatusAction(id: string, status: string) {
  try {
    await query("UPDATE leads SET status = ? WHERE id = ?", [status, id]);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update status in database:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Server Action to update the editable lead/inquiry record fields
 */
export async function updateLeadAction(lead: LeadData) {
  try {
    await query(
      "UPDATE leads SET name = ?, email = ?, phone = ?, visaSubclass = ?, message = ?, status = ? WHERE id = ?",
      [lead.name, lead.email, lead.phone, lead.pathway, lead.notes, lead.status, lead.id]
    );
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update lead in database:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Server Action to delete a lead record from the database
 */
export async function deleteLeadAction(id: string) {
  try {
    await query("DELETE FROM leads WHERE id = ?", [id]);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete lead from database:", error);
    return { success: false, error: error.message || String(error) };
  }
}
