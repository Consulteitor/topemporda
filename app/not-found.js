import Link from "next/link";

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  darkGray: "#3a3530",
  accent: "#1a5c8a",
};

const TARGETES = [
  {
    href: "/pobles",
    num: "01",
    titol: "Els pobles de l'Empordà",
    desc: "Figueres, Cadaqués, Begur, Peratallada, Roses i molts més. La guia completa de la comarca.",
  },
  {
    href: "/guies/setmana-santa-emporda-2026",
    num: "02",
    titol: "Setmana Santa a l'Empordà",
    desc: "Plans, processons i escapades per al pont de Pasqua 2026.",
  },
  {
    href: "/guies/que-fer-a-lemporda-guia-practica-2026",
    num: "03",
    titol: "Què fer a l'Empordà",
    desc: "La guia pràctica i completa per gaudir de la comarca tot l'any.",
  },
  {
    href: "/inmobiliaria",
    num: "04",
    titol: "Comprar casa a l'Empordà",
    desc: "El mercat, els preus, els municipis. Tot el que cal saber abans de decidir.",
  },
];

const CATEGORIES = [
  { label: "Pobles", href: "/pobles" },
  { label: "Restaurants", href: "/guies" },
  { label: "Amb nens", href: "/guies" },
  { label: "Rutes", href: "/guies" },
  { label: "Immobiliària", href: "/inmobiliaria" },
  { label: "Agenda", href: "/agenda" },
];

const POBLES = [
  { label: "Figueres",     href: "/pobles/figueres" },
  { label: "Cadaqués",     href: "/pobles/cadaques" },
  { label: "Begur",        href: "/pobles/begur" },
  { label: "Peratallada",  href: "/pobles/peratallada" },
  { label: "Roses",        href: "/pobles/roses" },
];

export default function NotFound() {
  return (
    <div style={{
      background: C.white,
      minHeight: "100vh",
      fontFamily: "'Source Serif 4', Georgia, serif",
      overflowX: "hidden",
    }}>

      {/* ── HERO ── */}
      <div style={{
        background: C.black,
        color: C.white,
        padding: "clamp(48px,8vw,96px) clamp(20px,5vw,40px) clamp(56px,8vw,96px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(160px,25vw,320px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}>404</div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: C.accent }} />
            Error 404 · Pàgina no trobada
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px,7vw,80px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            maxWidth: "680px",
          }}>
            T'has perdut<br />per l'Empordà.
          </h1>

          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "clamp(16px,2vw,19px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "500px",
            marginBottom: "40px",
          }}>
            El camí que buscaves no existeix, però no passa res. La comarca és plena de cales, pobles i restaurants on val la pena arribar per accident.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/" style={{
              background: C.white,
              color: C.black,
              padding: "14px 28px",
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
            }}>
              Torna a l'inici
            </Link>
            <Link href="/guies" style={{
              background: "transparent",
              color: C.white,
              padding: "13px 28px",
              fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>
              Veure totes les guies →
            </Link>
          </div>
        </div>
      </div>

      {/* ── POTSER BUSCAVES AIXÒ ── */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "clamp(40px,6vw,64px) clamp(20px,5vw,40px)",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
          textTransform: "uppercase", color: C.accent,
          borderBottom: `2px solid ${C.black}`, paddingBottom: "10px", marginBottom: "28px",
        }}>
          Potser buscaves això
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(240px,100%), 1fr))",
          gap: "2px", background: C.black, marginBottom: "clamp(40px,6vw,64px)",
        }}>
          {TARGETES.map((t) => (
            <Link key={t.href} href={t.href} style={{
              background: C.white, padding: "clamp(20px,3vw,28px)",
              textDecoration: "none", color: "inherit",
              display: "flex", flexDirection: "column", gap: "10px",
            }}>
              <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: C.midGray }}>{t.num}</span>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, color: C.black, lineHeight: 1.2 }}>{t.titol}</span>
              <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "13px", color: C.midGray, lineHeight: 1.5 }}>{t.desc}</span>
              <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", color: C.accent, letterSpacing: "0.1em", marginTop: "4px" }}>Llegir la guia →</span>
            </Link>
          ))}
        </div>

        {/* ── CATEGORIES ── */}
        <div style={{ marginBottom: "clamp(40px,6vw,64px)" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.midGray,
            borderBottom: `1px solid ${C.warmGray}`, paddingBottom: "10px", marginBottom: "20px",
          }}>
            Explora l'Empordà
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {CATEGORIES.map((c) => (
              <Link key={c.label} href={c.href} style={{
                fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
                fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em",
                textTransform: "uppercase", color: C.black, textDecoration: "none",
                border: `1px solid ${C.black}`, padding: "10px 20px", display: "inline-block",
              }}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── POBLES ── */}
        <div style={{ marginBottom: "clamp(40px,6vw,64px)" }}>
          <div style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.midGray,
            borderBottom: `1px solid ${C.warmGray}`, paddingBottom: "10px", marginBottom: "20px",
          }}>
            Pobles destacats
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(160px,100%), 1fr))",
            gap: "1px", background: C.warmGray,
          }}>
            {POBLES.map((p) => (
              <Link key={p.href} href={p.href} style={{
                background: C.white, padding: "20px",
                textDecoration: "none", display: "flex", flexDirection: "column", gap: "6px",
              }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "17px", fontWeight: 700, color: C.black }}>{p.label}</span>
                <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", letterSpacing: "0.1em", color: C.accent }}>Guia →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── MISSATGE FINAL ── */}
        <div style={{
          borderTop: `1px solid ${C.warmGray}`, paddingTop: "32px", paddingBottom: "48px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "16px",
        }}>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "14px", fontStyle: "italic", color: C.midGray,
            lineHeight: 1.7, maxWidth: "480px", margin: 0,
          }}>
            A l'Empordà, perdre's no és tan greu. La tramuntana et situa, el mar sempre és a prop i sempre hi ha una cala on aturar-se. Prova-ho.
          </p>
          <Link href="/" style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
            color: C.midGray, textDecoration: "none",
            borderBottom: `1px solid ${C.midGray}`, paddingBottom: "2px",
          }}>
            ← Torna a l'inici
          </Link>
        </div>
      </div>
    </div>
  );
}
