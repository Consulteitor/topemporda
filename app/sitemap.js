import fs from "fs";
import path from "path";
import { getGuies, getNegocis } from "../lib/sheets";
import { editorialLastModified } from "../lib/editorialDates";

export const revalidate = 604800;

const BASE = "https://topemporda.com";
const SUBTEMES = ["que-fer", "restaurants", "allotjament", "immobiliaria", "rutes", "amb-nens"];

function getMdFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .sort()
      .map(f => ({ slug: f.replace(".md", "") }));
  } catch {
    return [];
  }
}

// Només dates editorials explícites; ni rellotge ni mtime del desplegament.
async function getGuiesLastModified() {
  try {
    const rows = await getGuies();
    const map = new Map();
    for (const g of rows) {
      const slug = g.slug || String(g.id || "");
      const date = editorialLastModified(g);
      if (slug && date) map.set(slug, date);
    }
    return map;
  } catch {
    return new Map();
  }
}

// Negocis publicats (exclou esborranys) → /negocis/[id]
async function getNegocisPublicats() {
  try {
    const rows = await getNegocis();
    return rows.filter(n => n.id && n.estat !== "esborrany");
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const urls = [];

  const [lastModMap, negocis] = await Promise.all([
    getGuiesLastModified(),
    getNegocisPublicats(),
  ]);

  // Pàgines estàtiques
  [
    { url: BASE,                    p: 1.0 },
    { url: `${BASE}/pobles`,        p: 0.9 },
    { url: `${BASE}/guies`,         p: 0.9 },
    { url: `${BASE}/noticies`,      p: 0.8 },
    { url: `${BASE}/inmobiliaria`,  p: 0.8 },
    { url: `${BASE}/directori`,     p: 0.7 },
    { url: `${BASE}/agenda`,        p: 0.6 },
  ].forEach(({ url, p }) => urls.push({ url, priority: p }));

  // /guies/[slug] — lastModified des del Sheets quan està disponible
  getMdFiles(path.join(process.cwd(), "content/guies"))
    .forEach(({ slug }) =>
      urls.push({ url: `${BASE}/guies/${slug}`, lastModified: lastModMap.get(slug), priority: 0.8 })
    );

  // /negocis/[id]
  negocis.forEach(n => {
    urls.push({
      url: `${BASE}/negocis/${n.id}`,
      lastModified: editorialLastModified(n),
      priority: n.premium === "TRUE" || n.premium === true ? 0.8 : 0.6,
    });
  });

  // /pobles/[slug] + /pobles/[slug]/[subtema]
  // Detecta pobles base: fitxers sense guió complet (figueres.md) vs subguies (figueres-que-fer.md)
  getMdFiles(path.join(process.cwd(), "content/pobles"))
    .filter(({ slug }) => !slug.match(/^.+-[a-z]/))
    .forEach(({ slug }) => {
      urls.push({ url: `${BASE}/pobles/${slug}`, priority: 0.9 });
      SUBTEMES.forEach(subtema => {
        urls.push({ url: `${BASE}/pobles/${slug}/${subtema}`, priority: 0.8 });
      });
    });

  // /noticies/[id]
  getMdFiles(path.join(process.cwd(), "content/noticies"))
    .forEach(({ slug }) =>
      urls.push({ url: `${BASE}/noticies/${slug}`, priority: 0.6 })
    );

  return urls;
}
