import Link from "next/link";
import { getGuies } from "@/lib/sheets";

export const metadata = {
  title: "Guies de l'Empordà | Top Empordà",
  description: "Guies pràctiques per descobrir l'Empordà: què fer, on menjar, on dormir, rutes, pobles i molt més. Contingut actualitzat i recomanacions concretes.",
  openGraph: {
    title: "Guies de l'Empordà | Top Empordà",
    description: "Guies pràctiques per descobrir l'Empordà: què fer, on menjar, on dormir, rutes, pobles i molt més.",
    url: "https://topemporda.com/guies",
    siteName: "Top Empordà",
    locale: "ca_ES",
    type: "website",
  },
  alternates: { canonical: "https://topemporda.com/guies" },
};

const C = {
  black: "#0a0a0a",
  white: "#faf9f6",
  warmGray: "#e8e4dc",
  midGray: "#9a9489",
  accent: "#1a5c8a",
  darkGray: "#3a3530",
};

function inferirCategoria(g) {
  if (g.categoria) return g.categoria;
  const s = (g.slug || g.id || "").toLowerCase();
  if (/restaurant|menjar|gastronomia|cuina|top10/.test(s)) return "gastronomia";
  if (/ruta|senderisme|excursio|caminar|cami-de-ronda/.test(s)) return "rutes";
  if (/allotjament|dormir|casa-rural|cases-rurals|hotel/.test(s)) return "allotjament";
  if (/nens|familia|famili|infantil/.test(s)) return "amb-nens";
  if (/immobilia|comprar-casa|lloguer|hipoteca|invertir|obra-nova|vendre|preu-habitatge|segona-residencia|llicencia|impostos|mudarse/.test(s)) return "immobiliaria";
  if (/hivern|neu/.test(s)) return "hivern";
  if (/estiu|platja|cala/.test(s)) return "estiu";
  if (/tardor|bolet/.test(s)) return "tardor";
  if (/primavera|setmana-santa|pasqua/.test(s)) return "primavera";
  if (/pobles|figueres|cadaques|begur|peratallada|roses/.test(s)) return "pobles";
  return "general";
}

function perCategoria(guies, cat) {
  return guies
    .filter(g => inferirCategoria(g) === cat)
    .sort((a, b) => {
      const da = a.destacada === "TRUE" || a.destacada === true ? 1 : 0;
      const db = b.destacada === "TRUE" || b.destacada === true ? 1 : 0;
      return db - da;
    });
}

function TarjetaPetita({ guia }) {
  const slug = guia.slug || guia.id;
  return (
    <Link href={`/guies/${slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ padding: "16px 0", borderBottom: `1px solid ${C.warmGray}`, cursor: "pointer" }}>
        {guia.imatge && (
          <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "12px" }}>
            <img src={guia.imatge} alt={guia.titol} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        )}
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, lineHeight: 1.2, color: C.black, marginBottom: "6px" }}>{guia.titol}</h3>
        <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent }}>Llegir →</span>
      </div>
    </Link>
  );
}

function BlocCategoria({ titol, etiqueta, guies, showDivider = true }) {
  if (!guies || guies.length === 0) return null;
  const [destacada, ...resta] = guies;
  const slug = destacada.slug || destacada.id;
  const laterals = resta.slice(0, 3);

  return (
    <section style={{ borderTop: showDivider ? `2px solid ${C.black}` : "none", paddingTop: "36px", marginBottom: "clamp(40px,6vw,64px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
        <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, whiteSpace: "nowrap" }}>{etiqueta}</div>
        <div style={{ flex: 1, height: "1px", background: C.warmGray }} />
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 700, color: C.black, whiteSpace: "nowrap" }}>{titol}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: laterals.length > 0 ? "minmax(0,2fr) minmax(0,1fr)" : "1fr", gap: "clamp(20px,3vw,40px)", alignItems: "start" }}>
        <Link href={`/guies/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <article style={{ cursor: "pointer" }}>
            {destacada.imatge && (
              <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "20px" }}>
                <img src={destacada.imatge} alt={destacada.titol} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            )}
            <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: "10px" }}>{etiqueta}</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 800, lineHeight: 1.1, color: C.black, marginBottom: "14px", letterSpacing: "-0.01em" }}>{destacada.titol}</h2>
            {destacada.meta_description && (
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 300, lineHeight: 1.7, color: C.darkGray, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{destacada.meta_description}</p>
            )}
            <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, borderBottom: `1px solid ${C.accent}`, paddingBottom: "2px" }}>Llegir la guia →</span>
          </article>
        </Link>
        {laterals.length > 0 && (
          <div style={{ borderLeft: `1px solid ${C.warmGray}`, paddingLeft: "clamp(16px,3vw,32px)" }}>
            {laterals.map(g => <TarjetaPetita key={g.slug || g.id} guia={g} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function BlocPobles() {
  const pobles = [
    { label: "Figueres",    href: "/pobles/figueres",    desc: "La capital" },
    { label: "Cadaqués",    href: "/pobles/cadaques",    desc: "La joia de la costa" },
    { label: "Begur",       href: "/pobles/begur",       desc: "Cales i castells" },
    { label: "Peratallada", href: "/pobles/peratallada", desc: "Poble medieval" },
    { label: "Roses",       href: "/pobles/roses",       desc: "La badia" },
  ];
  return (
    <section style={{ background: C.black, padding: "36px clamp(20px,4vw,40px)", marginBottom: "clamp(40px,6vw,64px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>Territori</div>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 700, color: C.white }}>Guies per poble</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(180px,100%), 1fr))", gap: "2px" }}>
        {pobles.map(p => (
          <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "20px" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: C.white, marginBottom: "4px" }}>{p.label}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)", marginBottom: "12px" }}>{p.desc}</div>
              <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>Veure guia →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function GuiesPage() {
  const guies = await getGuies();
  const totes = guies.map(g => ({ ...g, _cat: inferirCategoria(g) }));

  const hero = totes.find(g => g.destacada === "TRUE" || g.destacada === true) || totes.find(g => g.imatge);

  const gastronomia  = perCategoria(totes, "gastronomia");
  const rutes        = perCategoria(totes, "rutes");
  const allotjament  = perCategoria(totes, "allotjament");
  const ambNens      = perCategoria(totes, "amb-nens");
  const immobiliaria = perCategoria(totes, "immobiliaria");
  const primavera    = perCategoria(totes, "primavera");
  const estiu        = perCategoria(totes, "estiu");
  const tardor       = perCategoria(totes, "tardor");

  const recents = [...totes]
    .filter(g => g !== hero)
    .sort((a, b) => {
      const da = a.data_publicacio ? new Date(a.data_publicacio.split('/').reverse().join('-')) : new Date(0);
      const db = b.data_publicacio ? new Date(b.data_publicacio.split('/').reverse().join('-')) : new Date(0);
      return db - da;
    })
    .slice(0, 4);

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif", overflowX: "hidden" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>

        {/* CAPÇALERA */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "28px 0 20px", marginBottom: "40px", borderBottom: `3px solid ${C.black}` }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Guies de l'Empordà</span>
          <div style={{ flex: 1, height: "1px", background: C.warmGray }} />
          <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", color: C.midGray, letterSpacing: "0.1em", textTransform: "uppercase" }}>{guies.length} guies publicades</span>
        </div>

        {/* HERO */}
        {hero && (() => {
          const slug = hero.slug || hero.id;
          return (
            <section style={{ marginBottom: "clamp(40px,6vw,64px)" }}>
              <Link href={`/guies/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)", gap: "clamp(20px,4vw,48px)", alignItems: "center", background: C.black, color: C.white, padding: "clamp(24px,4vw,48px)" }}>
                  {hero.imatge && (
                    <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                      <img src={hero.imatge} alt={hero.titol} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, marginBottom: "16px" }}>Guia destacada</div>
                    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "16px", color: C.white }}>{hero.titol}</h1>
                    {hero.meta_description && (
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", marginBottom: "24px" }}>{hero.meta_description}</p>
                    )}
                    <span style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.white, borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "2px" }}>Llegir la guia →</span>
                  </div>
                </div>
              </Link>
            </section>
          );
        })()}

        {/* BLOCS PER CATEGORIA */}
        <BlocCategoria titol="Gastronomia"    etiqueta="On menjar"       guies={gastronomia} />
        <BlocCategoria titol="Rutes i natura"  etiqueta="Senderisme"      guies={rutes} />
        <BlocCategoria titol="Amb nens"        etiqueta="Plans familiars" guies={ambNens} />
        <BlocCategoria titol="On dormir"       etiqueta="Allotjament"     guies={allotjament} />
        <BlocCategoria titol="Primavera"       etiqueta="Temporada"       guies={primavera} />
        <BlocCategoria titol="Estiu"           etiqueta="Temporada"       guies={estiu} />
        <BlocCategoria titol="Tardor"          etiqueta="Temporada"       guies={tardor} />

        {/* RECENTS */}
        {recents.length > 0 && (
          <section style={{ borderTop: `2px solid ${C.black}`, paddingTop: "36px", marginBottom: "clamp(40px,6vw,64px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>Noves</div>
              <div style={{ flex: 1, height: "1px", background: C.warmGray }} />
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 700, color: C.black }}>Publicades recentment</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px,100%), 1fr))", gap: "2px", background: C.black }}>
              {recents.map(g => {
                const slug = g.slug || g.id;
                return (
                  <Link key={slug} href={`/guies/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ background: C.white, padding: "20px" }}>
                      {g.imatge && (
                        <div style={{ width: "100%", aspectRatio: "3/2", overflow: "hidden", marginBottom: "12px" }}>
                          <img src={g.imatge} alt={g.titol} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                      <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "9px", color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{g._cat}</div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, lineHeight: 1.2, color: C.black }}>{g.titol}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* POBLES */}
        <BlocPobles />

        {/* IMMOBILIÀRIA */}
        <BlocCategoria titol="Immobiliària" etiqueta="Mercat i habitatge" guies={immobiliaria} />

        {/* TOTES LES GUIES */}
        <section style={{ borderTop: `2px solid ${C.black}`, paddingTop: "36px", marginBottom: "clamp(40px,6vw,64px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.midGray }}>Arxiu</div>
            <div style={{ flex: 1, height: "1px", background: C.warmGray }} />
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 700, color: C.black }}>Totes les guies ({guies.length})</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px,100%), 1fr))", gap: "1px", background: C.warmGray }}>
            {totes.map(g => {
              const slug = g.slug || g.id;
              return (
                <Link key={slug} href={`/guies/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: C.white, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                    <div>
                      <div style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "9px", color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{g._cat}</div>
                      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: 700, color: C.black, lineHeight: 1.2 }}>{g.titol}</span>
                    </div>
                    <span style={{ color: C.accent, fontSize: "14px", flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div style={{ borderTop: `1px solid ${C.warmGray}`, paddingTop: "20px", paddingBottom: "48px", fontFamily: "'IBM Plex Sans', Helvetica, sans-serif", fontSize: "11px", color: C.midGray, letterSpacing: "0.05em" }}>
          Guies actualitzades 2026 · Top Empordà
        </div>

      </div>
    </div>
  );
}
