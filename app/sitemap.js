import fs from "fs";
import path from "path";

const BASE = "https://topemporda.com";
const SHEETS_API =
  "https://script.google.com/macros/s/AKfycbwiKLh4vUWXIotw9sI2oj5yDN5UXB_jIdGuiYW47liHWY8FFcdsFpybKPagMZ9ApWxuYA/exec";
const SUBTEMES = ["que-fer", "restaurants", "allotjament", "immobiliaria", "rutes", "amb-nens"];

function getMdFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".md"))
      .map(f => ({ slug: f.replace(".md", ""), mtime: fs.statSync(path.join(dir, f)).mtime }));
  } catch {
    return [];
  }
}

// lastModified dinàmic des del camp data_publicacio del Sheets (format DD/MM/YYYY)
// → Google detecta canvis reals i augmenta la freqüència de crawl
async function getGuiesLastModified() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Guies`, { next: { revalidate: 172800 } });
    const json = await res.json();
    const rows = Array.isArray(json) ? json : (json.data || []);
    const map = new Map();
    for (const g of rows) {
      const slug = g.slug || String(g.id || "");
      if (!slug || !g.data_publicacio) continue;
      const raw = String(g.data_publicacio).trim();
      const date = raw.includes("/")
        ? new Date(raw.split("/").reverse().join("-"))
        : new Date(raw);
      if (!isNaN(date)) map.set(slug, date);
    }
    return map;
  } catch {
    return new Map();
  }
}

// Negocis publicats (exclou esborranys) → /negocis/[id]
async function getNegocisPublicats() {
  try {
    const res = await fetch(`${SHEETS_API}?sheet=Negocis`, { next: { revalidate: 172800 } });
    const json = await res.json();
    const rows = Array.isArray(json) ? json : (json.data || []);
    return rows.filter(n => n.id && n.estat !== "esborrany");
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();
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
  ].forEach(({ url, p }) => urls.push({ url, lastModified: now, priority: p }));

  // /guies/[slug] — lastModified des del Sheets quan està disponible
  getMdFiles(path.join(process.cwd(), "content/guies"))
    .forEach(({ slug, mtime }) =>
      urls.push({ url: `${BASE}/guies/${slug}`, lastModified: lastModMap.get(slug) || mtime, priority: 0.8 })
    );

  // /negocis/[id]
  negocis.forEach(n => {
    urls.push({
      url: `${BASE}/negocis/${n.id}`,
      lastModified: now,
      priority: n.premium === "TRUE" || n.premium === true ? 0.8 : 0.6,
    });
  });

  // /pobles/[slug] + /pobles/[slug]/[subtema]
  // Detecta pobles base: fitxers sense guió complet (figueres.md) vs subguies (figueres-que-fer.md)
  getMdFiles(path.join(process.cwd(), "content/pobles"))
    .filter(({ slug }) => !slug.match(/^.+-[a-z]/))
    .forEach(({ slug, mtime }) => {
      urls.push({ url: `${BASE}/pobles/${slug}`, lastModified: mtime, priority: 0.9 });
      SUBTEMES.forEach(subtema => {
        const sub = path.join(process.cwd(), "content/pobles", `${slug}-${subtema}.md`);
        const subMtime = fs.existsSync(sub) ? fs.statSync(sub).mtime : mtime;
        urls.push({ url: `${BASE}/pobles/${slug}/${subtema}`, lastModified: subMtime, priority: 0.8 });
      });
    });

  // /noticies/[id]
  getMdFiles(path.join(process.cwd(), "content/noticies"))
    .forEach(({ slug, mtime }) =>
      urls.push({ url: `${BASE}/noticies/${slug}`, lastModified: mtime, priority: 0.6 })
    );

  return urls;
}
