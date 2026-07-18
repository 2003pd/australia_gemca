"use server";

import { query } from "../lib/db";

export interface SitePageData {
  slug: string;
  title: string;
  content: string;
  updatedAt?: string;
}

interface SitePageRow {
  slug: string;
  title: string;
  content: string;
  updatedAt?: Date | string | null;
}

const DEFAULT_TERMS_CONTENT = `## Terms & Conditions

Welcome to GEMCA. By using this website, you agree to use the information provided here for general guidance only.

## General Information

The content on this website is provided for general education and information. It does not constitute personal migration advice, legal advice, or a guarantee of visa outcome.

## Consultations

Any consultation, assessment, or service provided by GEMCA depends on the information and documents supplied by the client. You are responsible for providing accurate, complete, and current information.

## No Guarantee of Outcome

Visa decisions are made by the relevant Australian Government authority. GEMCA cannot guarantee visa approval, processing times, invitations, nominations, or any specific migration outcome.

## Website Use

You must not misuse this website, attempt unauthorized access, copy content for commercial use without permission, or use the website in a way that may damage GEMCA or its users.

## Third-Party Links

This website may link to third-party websites. GEMCA is not responsible for the content, policies, or availability of those external websites.

## Updates

GEMCA may update these Terms & Conditions at any time. Continued use of the website after updates means you accept the revised terms.

## Contact

For questions about these Terms & Conditions, contact GEMCA at ansar@gemca.com.au.`;

const CREATE_SITE_PAGES_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS site_pages (
    slug VARCHAR(191) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

async function ensureSitePagesTable() {
  await query(CREATE_SITE_PAGES_TABLE_SQL);
  const rows = await query<Array<{ slug: string }>>("SELECT slug FROM site_pages WHERE slug = ?", ["terms-and-conditions"]);

  if (rows.length === 0) {
    await query("INSERT INTO site_pages (slug, title, content) VALUES (?, ?, ?)", [
      "terms-and-conditions",
      "Terms & Conditions",
      DEFAULT_TERMS_CONTENT,
    ]);
  }
}

function normalizePage(row: SitePageRow): SitePageData {
  return {
    slug: String(row.slug),
    title: String(row.title),
    content: String(row.content),
    updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : undefined,
  };
}

export async function getSitePageAction(slug: string) {
  try {
    await ensureSitePagesTable();
    const rows = await query<SitePageRow[]>("SELECT * FROM site_pages WHERE slug = ? LIMIT 1", [slug]);
    const page = rows[0];

    if (!page) {
      return { success: false, error: "Page not found." };
    }

    return { success: true, data: normalizePage(page) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to fetch site page:", error);
    return {
      success: false,
      error: message,
      data: {
        slug: "terms-and-conditions",
        title: "Terms & Conditions",
        content: DEFAULT_TERMS_CONTENT,
      },
    };
  }
}

export async function updateSitePageAction(page: SitePageData) {
  try {
    await ensureSitePagesTable();
    await query(
      `INSERT INTO site_pages (slug, title, content)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content)`,
      [page.slug, page.title, page.content]
    );

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to update site page:", error);
    return { success: false, error: message };
  }
}
