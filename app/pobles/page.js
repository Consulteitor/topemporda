import Link from "next/link";
import { getPobles } from "@/lib/sheets";

export const metadata = {
  title: "Pobles de l'Empordà | Top Empordà",
  description: "Guies completes dels pobles de l'Empordà: Figueres, Cadaqués, Begur, Peratallada, Roses i molts més. Tot el que cal saber per visitar, viure i descobrir cada municipi.",
  openGraph: {
    title: "Pobles de l'Empordà",
    description: "Guies completes dels pobles de l'Empordà: Figueres, Cadaqués, Begur, Peratallada, Roses i molts més.",
    url: "https://topemporda.com/pobles",
    siteName: "Top Empordà",
    locale: "ca_ES",
    type: "website",
  },
  alternates: { canonical: "https://topemporda.com/pobles" },
};

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#1a5c8a",
};

const SECCIONS_POBLE = [
  { href: "que-fer",      label: "Què fer" },
  { href: "restaurants",  label: "Restaurants" },
  { href: "allotjament",  label: "Dormir" },
  { href: "immobiliaria", label: "Immobiliària" },
  { href: "rutes",        label: "Rutes" },
  { href: "amb-nens",     label: "Amb nens" },
];

const POBLES_PROXIMAMENT = [
  { slug: "lescala",       titol: "L'Escala",         descripcio: "El poble de les anxoves, amb el jaciment d'Empúries a tocar i una badia protegida de la tramuntana." },
  { slug: "lestartit",     titol: "L'Estartit",       descripcio: "La porta d'accés a les Illes Medes, reserva marina i paradís del busseig a la Costa Brava." },
  { slug: "empuriabrava",  titol: "Empuriabrava",     descripcio: "La marina residencial més gran d'Europa, amb canals navegables i una oferta immobiliària única." },
  { slug: "pals",          titol: "Pals",              descripcio: "Poble medieval ben conservat al Baix Empordà, amb les seves torres i el recinte emmurallat intacte." },
  { slug: "llafranc",      titol: "Llafranc",          descripcio: "Una de les cales més boniques de la Costa Brava, entre Calella de Palafrugell i Tamariu." },
  { slug: "castellodempuries", titol: "Castelló d'Empúries", descripcio: "Capital històrica del comtat d'Empúries, amb una de les col·legiates gòtiques més importants de Catalunya." },
];

export default async function PoblesPage() {
  const poblesSheet = await getPobles().catch(() => []);

  const slugsActius = new Set(poblesSheet.map(p => p.slug || String(p.id)));
  const proximament = POBLES_PROXIMAMENT.filter(p => !slugsActius.has(p.slug));

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* HERO */}
      <div style={{ background: C.black, color: C.white, padding: "56px 40px 64px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", marginBottom: "20px",
            display: "flex", gap: "8px", alignItems: "center"
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Inici</Link>
            <span>·</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Pobles</span>
          </div>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.accent, marginBottom: "16px"
          }}>
            L'Empordà · Territori
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900,
            lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "24px",
            maxWidth: "700px"
          }}>
            Els pobles de l'Empordà
          </h1>
          <p style={{
            fontSize: "18px", lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)", maxWidth: "580px",
            fontStyle: "italic"
          }}>
            Cada poble de la comarca té un caràcter propi. Aquí trobaràs les guies
            per conèixer-los de debò: on menjar, on dormir, quines rutes fer i per
            on passejar sense presses.
          </p>

          {/* STATS */}
          <div style={{
            display: "flex", gap: "40px", marginTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "32px",
            flexWrap: "wrap"
          }}>
            {[
              { num: "68", label: "municipis" },
              { num: "220 km", label: "de litoral" },
              { num: "140.000", label: "habitants" },
              { num: "2.950 km²", label: "superfície" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em"
                }}>{num}</div>
                <div style={{
                  fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                  fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", marginTop: "4px"
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTRO EDITORIAL */}
      <div style={{ background: "#f0ede6", borderBottom: "1px solid #d4d0c8", padding: "40px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{
            fontSize: "17px", lineHeight: 1.8, color: "#3a3530",
            fontStyle: "italic"
          }}>
            L'Empordà no és un sol lloc. És una plana oberta al mar on cada nucli
            ha construït una identitat diferent: la capital amb el Museu Dalí, el poble blanc
            de pescadors que s'aferra a la seva cala, la vila medieval envoltada de bosc,
            la badia que mira les Illes Medes. Conèixer la comarca de debò vol dir conèixer
            els seus pobles un per un.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 40px" }}>

        {/* POBLES ACTIUS (del Sheet) */}
        {poblesSheet.length > 0 && (
          <section style={{ marginBottom: "64px" }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", color: C.accent,
              borderBottom: `2px solid ${C.black}`, paddingBottom: "12px", marginBottom: "32px"
            }}>
              Guies completes
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2px", background: C.black
            }}>
              {poblesSheet.map((poble) => {
                const slug = poble.slug || String(poble.id);
                return (
                  <div key={slug} style={{ background: C.white, padding: "32px" }}>
                    <Link href={`/pobles/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{
                        fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                        fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: C.accent, marginBottom: "10px"
                      }}>
                        Guia completa · 2026
                      </div>
                      <h2 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "28px", fontWeight: 800, letterSpacing: "-0.01em",
                        marginBottom: "12px", lineHeight: 1.1
                      }}>
                        {poble.titol}
                      </h2>
                      {poble.meta_description && (
                        <p style={{
                          fontSize: "14px", lineHeight: 1.6, color: "#5a5550",
                          marginBottom: "20px"
                        }}>
                          {poble.meta_description}
                        </p>
                      )}
                    </Link>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                      {SECCIONS_POBLE.map(s => (
                        <Link key={s.href} href={`/pobles/${slug}/${s.href}`} style={{
                          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                          fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                          color: C.black, textDecoration: "none",
                          border: `1px solid ${C.black}`, padding: "4px 10px",
                        }}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* POBLES EN PREPARACIÓ */}
        <section>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.midGray,
            borderBottom: `1px solid ${C.warmGray}`, paddingBottom: "12px", marginBottom: "32px"
          }}>
            Properament
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1px", background: C.warmGray
          }}>
            {proximament.map((poble) => (
              <div key={poble.slug} style={{ background: C.white, padding: "24px 28px", opacity: 0.7 }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: C.black
                }}>
                  {poble.titol}
                </h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                  fontSize: "13px", lineHeight: 1.5, color: C.midGray
                }}>
                  {poble.descripcio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA EDITORIAL */}
        <div style={{
          background: C.black, color: C.white,
          padding: "40px 48px", marginTop: "64px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "24px"
        }}>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "22px", fontWeight: 700, marginBottom: "8px"
            }}>
              La comarca, de costa a interior
            </div>
            <p style={{
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6
            }}>
              Totes les guies, rutes i recomanacions de l'Empordà en un sol lloc.
            </p>
          </div>
          <Link href="/guies" style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: C.white, textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.4)", padding: "12px 24px",
            whiteSpace: "nowrap"
          }}>
            Veure totes les guies →
          </Link>
        </div>

      </div>
    </div>
  );
}
