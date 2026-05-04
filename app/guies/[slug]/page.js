import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuies, getGuiaBySlug } from "@/lib/sheets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const guies = await getGuies();
  return guies.map((g) => ({ slug: g.slug || String(g.id) }));
}



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guia = await getGuiaBySlug(slug);
  if (!guia) return { title: "Guia no trobada | Top Empordà" };

  const titol = guia.titol || slug;
  const desc = guia.meta_description || `Guia completa sobre ${titol} a l'Empordà. Informació pràctica i actualitzada 2026.`;

  return {
    title: titol,
    description: desc,
    openGraph: {
      title: titol,
      description: desc,
      url: `https://topemporda.com/guies/${slug}`,
      siteName: "Top Empordà",
      locale: "ca_ES",
      type: "article",
      ...(guia.imatge ? { images: [{ url: guia.imatge, width: 1200, height: 630, alt: titol }] } : {}),
    },
    alternates: {
      canonical: `https://topemporda.com/guies/${slug}`,
    },
  };
}

function getContingut(slug) {
  try {
    const filePath = path.join(process.cwd(), "content", "guies", `${slug}.md`);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#1a5c8a",
};


const STATIC_SCHEMAS = {
  "aiguamolls-emporda-guia-visita": {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Parc Natural dels Aiguamolls de l'Empordà",
    "url": "https://topemporda.com/guies/aiguamolls-emporda-guia-visita",
    "description": "Reserva natural a l'Alt Empordà, un dels espais naturals més importants de Catalunya per a l'observació d'aus migratòries. Flamencs, garses i més de 300 espècies.",
    "address": { "@type": "PostalAddress", "addressLocality": "Castelló d'Empúries", "addressRegion": "Girona", "addressCountry": "ES" },
    "geo": { "@type": "GeoCoordinates", "latitude": 42.217, "longitude": 3.083 },
    "touristType": ["Natura", "Ornitologia", "Família", "Fotografia"],
    "isAccessibleForFree": true,
  },
  "cap-de-creus-que-fer-visitar": {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Cap de Creus",
    "url": "https://topemporda.com/guies/cap-de-creus-que-fer-visitar",
    "description": "El punt més oriental de la península Ibèrica i parc natural marítimo-terrestre. Far, cales verges, reserva marina i el Camí de Ronda des de Cadaqués.",
    "address": { "@type": "PostalAddress", "addressLocality": "Roses", "addressRegion": "Girona", "addressCountry": "ES" },
    "geo": { "@type": "GeoCoordinates", "latitude": 42.319, "longitude": 3.319 },
    "touristType": ["Natura", "Senderisme", "Fotografia", "Busseig"],
    "isAccessibleForFree": true,
  },
  "cami-de-ronda-emporda-guia-completa": {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Camí de Ronda de l'Empordà",
    "url": "https://topemporda.com/guies/cami-de-ronda-emporda-guia-completa",
    "description": "Sender litoral que recorre la Costa Brava de l'Empordà: des del Cap de Creus fins a Begur, passant per Cadaqués, Roses i l'Escala. Trams de dificultat variada.",
    "touristType": ["Senderisme", "Natura", "Costa Brava"],
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Cap de Creus — Cadaqués" },
        { "@type": "ListItem", "position": 2, "name": "Cadaqués — Port de la Selva" },
        { "@type": "ListItem", "position": 3, "name": "Roses — L'Escala" },
        { "@type": "ListItem", "position": 4, "name": "L'Escala — Begur" },
      ]
    }
  },
};

function extractRestaurantList(markdown, slug, titol) {
  if (!markdown || !slug.includes("restaurants")) return null;
  const blocks = markdown.split(/^## \d+\./m).slice(1); // skip intro
  if (blocks.length === 0) return null;

  const items = blocks.map((block, i) => {
    const nameMatch = block.match(/^([^\n]+)/);
    const name = nameMatch ? nameMatch[1].trim() : null;
    if (!name) return null;

    const ratingMatch = block.match(/★\s*([\d,]+)\s*·\s*([\d.,]+)\s*ressen/);
    const ratingValue = ratingMatch ? ratingMatch[1].replace(",", ".") : null;
    const reviewCount = ratingMatch ? parseInt(ratingMatch[2].replace(/\./g, "")) : null;

    const cityMatch = block.match(/→\s*([^·\n]+)/);
    const city = cityMatch ? cityMatch[1].trim() : null;

    return {
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Restaurant",
        "name": name,
        ...(city ? { "address": { "@type": "PostalAddress", "addressLocality": city, "addressCountry": "ES" } } : {}),
        ...(ratingValue && reviewCount ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": reviewCount,
            "bestRating": "5",
            "worstRating": "1"
          }
        } : {}),
      }
    };
  }).filter(Boolean);

  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": titol,
    "url": `https://topemporda.com/guies/${slug}`,
    "numberOfItems": items.length,
    "itemListElement": items,
  };
}

function extractFAQs(markdown) {
  if (!markdown) return [];
  const faqSection = markdown.split(/^## Preguntes freqüents/mi)[1];
  if (!faqSection) return [];
  const nextSection = faqSection.split(/^## /m)[0];
  const questionBlocks = nextSection.split(/^\*\*/m).filter(b => b.trim());
  const faqs = [];
  for (const block of questionBlocks) {
    const match = block.match(/^([^*]+)\*\*\s*\n([\s\S]+?)(?=\n\n|$)/);
    if (match) {
      const question = match[1].trim();
      const answer = match[2].trim().replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      if (question && answer) faqs.push({ question, answer });
    }
  }
  return faqs.slice(0, 10);
}

export default async function GuiaPage({ params }) {
  const { slug } = await params;
  const guia = await getGuiaBySlug(slug);
  if (!guia) notFound();

  const contingut = getContingut(slug);

  const itemListSchema = extractRestaurantList(contingut, slug, guia.titol);
  const staticSchema = STATIC_SCHEMAS[slug] || null;

  const faqs = extractFAQs(contingut);
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      {staticSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(staticSchema) }}
        />
      )}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>

        {/* Breadcrumb */}
        <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", color: C.midGray, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "32px", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/" style={{ color: C.midGray, textDecoration: "none" }}>Inici</Link>
          <span>·</span>
          <Link href="/guies" style={{ color: C.midGray, textDecoration: "none" }}>Guies</Link>
          <span>·</span>
          <span style={{ color: C.black }}>{guia.titol}</span>
        </div>

        {/* Imatge destacada */}
        {guia.imatge && (
          <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "40px" }}>
            <img
              src={guia.imatge}
              alt={guia.titol}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        {/* Capçalera */}
        <div style={{ borderBottom: `3px solid ${C.black}`, paddingBottom: "32px", marginBottom: "48px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "20px", color: C.black }}>
            {guia.titol}
          </h1>
          {guia.meta_description && (
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "20px", fontWeight: 300, lineHeight: 1.6, color: "#3a3733", maxWidth: "700px" }}>
              {guia.meta_description}
            </p>
          )}
        </div>

        <div className="guia-layout" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "56px", alignItems: "start" }}>
          <div className="article-body">
            {contingut ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{contingut}</ReactMarkdown>
            ) : (
              <p style={{ fontStyle: "italic", color: C.midGray, fontSize: "17px" }}>
                Afegeix el fitxer <code>content/guies/{slug}.md</code> al projecte.
              </p>
            )}
          </div>

          <aside style={{ position: "sticky", top: "24px" }}>
            <div style={{ border: `1px dashed ${C.midGray}`, padding: "60px 20px", textAlign: "center", color: C.midGray, fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", background: C.warmGray, marginBottom: "24px" }}>
              Anunci · 300×250
            </div>
            <div style={{ border: `1px solid ${C.black}`, padding: "20px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: `2px solid ${C.black}`, paddingBottom: "12px", marginBottom: "16px" }}>Directori</div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", fontWeight: 300, color: "#5a5550", lineHeight: 1.5, marginBottom: "14px" }}>Troba negocis, restaurants i allotjaments a l'Empordà.</p>
              <Link href="/directori" style={{ display: "block", background: C.black, color: C.white, padding: "12px", textAlign: "center", fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                Veure el directori →
              </Link>
            </div>
            <div style={{ border: `1px solid ${C.black}`, padding: "20px", background: C.black }}>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "12px", marginBottom: "16px", color: C.white }}>Ets un negoci?</div>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: "14px" }}>Apareix a Top Empordà i posa el badge al teu web.</p>
              <Link href="/badge" style={{ display: "block", background: C.accent, color: C.white, padding: "12px", textAlign: "center", fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                Aconseguir el badge →
              </Link>
            </div>
          </aside>
        </div>

        <div style={{ borderTop: `1px solid ${C.warmGray}`, marginTop: "56px", paddingTop: "24px", paddingBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/guies" style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.midGray, textDecoration: "none", borderBottom: `1px solid ${C.midGray}`, paddingBottom: "2px" }}>
            ← Totes les guies
          </Link>
          <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", color: C.midGray, letterSpacing: "0.05em" }}>Top Empordà · 2026</span>
        </div>
      </div>
    </div>
  );
}
