// app/inmobiliaria/page.js

export const metadata = {
  title: "Immobiliària a l'Empordà: comprar, llogar i invertir (2026)",
  description: "Tot sobre el mercat immobiliari de l'Empordà: guies per comprar o llogar, preus per municipi, agències locals de confiança i propietats destacades.",
  openGraph: {
    title: "Immobiliària a l'Empordà",
    description: "Guies del mercat immobiliari de l'Empordà: comprar casa, llogar, preus i tot el que cal saber per invertir o viure a la comarca.",
    url: "https://topemporda.com/inmobiliaria",
    siteName: "Top Empordà",
    locale: "ca_ES",
    type: "website",
  },
  alternates: { canonical: "https://topemporda.com/inmobiliaria" },
};

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbwiKLh4vUWXIotw9sI2oj5yDN5UXB_jIdGuiYW47liHWY8FFcdsFpybKPagMZ9ApWxuYA/exec";

async function getGuiesImmobiliaria() {
  try {
    const res = await fetch(`${SHEETS_URL}?sheet=Guies`, { next: { revalidate: 3600 } });
    const json = await res.json();
    const data = Array.isArray(json) ? json : (json.data || []);
    return data.filter(g => g.slug && g.titol && (
      g.slug.includes('comprar') || g.slug.includes('preu') ||
      g.slug.includes('lloguer') || g.slug.includes('invertir') ||
      g.slug.includes('hipoteca') || g.slug.includes('llicencia') ||
      g.slug.includes('immobilia') || g.slug.includes('segona-residencia')
    ));
  } catch (e) {
    return [];
  }
}

const AGENCIES_DESTACADES = {
  principal: {
    nom: 'Empordà Finques',
    descripcio: "Especialistes en compravenda i lloguer a l'Empordà. Amb presència a Figueres, Cadaqués i Begur, assessoren tant compradors de primera residència com inversors en propietats de costa.",
    web: 'https://topemporda.com',
    telefon: '972 XX XX XX',
    poblacions: ['Figueres', 'Cadaqués', 'Begur', 'Roses'],
    badge: 'Agència de referència',
  },
  secundaries: [
    {
      nom: 'Costa Brava Immobiliària',
      descripcio: "Experts en propietats de luxe i segones residències a la Costa Brava central: Begur, Palafrugell, Tamariu i Llafranc.",
      web: 'https://topemporda.com',
      telefon: '972 XX XX XX',
      badge: 'Propietats de costa',
    },
    {
      nom: 'Alt Empordà Cases',
      descripcio: "Especialistes en el mercat del nord de l'Empordà: Figueres, Roses, Empuriabrava i Cap de Creus. Més de 20 anys al sector.",
      web: 'https://topemporda.com',
      telefon: '972 XX XX XX',
      badge: 'Alt Empordà',
    },
  ],
};

const PROPIETATS_DESTACADES = [
  {
    tipus: 'Casa amb jardí',
    poblacio: 'Begur',
    preu: '680.000 €',
    hab: 4,
    m2: 210,
    descripcio: "Casa amb jardí i piscina a 10 minuts de les cales de Begur. Vistes al mar, reformada el 2023. Ideal com a segona residència o inversió turística.",
    badge: 'Destacada',
  },
  {
    tipus: 'Apartament',
    poblacio: 'Roses',
    preu: '185.000 €',
    hab: 2,
    m2: 60,
    descripcio: "Apartament a primera línia de mar a Roses. Llicència turística en vigor. Rendibilitat anual estimada del 5-6%.",
    badge: 'Inversió',
  },
  {
    tipus: 'Masia restaurada',
    poblacio: 'Peratallada',
    preu: '950.000 €',
    hab: 6,
    m2: 380,
    descripcio: "Masia del segle XVIII completament restaurada al cor del Baix Empordà medieval. Piscina, bodega i 2 hectàrees de terreny.",
    badge: 'Exclusiva',
  },
];

const MUNICIPIS = [
  { nom: 'Begur',          descripcio: 'Costa Brava exclusiva · Cales úniques · Des de 4.000 €/m²',   slug: 'comprar-casa-emporda' },
  { nom: 'Cadaqués',       descripcio: 'Mercat limitat · Molt demandat · Des de 5.000 €/m²',           slug: 'comprar-casa-emporda' },
  { nom: 'Figueres',       descripcio: 'Capital comarcal · Tots els serveis · Des de 1.400 €/m²',      slug: 'comprar-casa-emporda' },
  { nom: 'Roses',          descripcio: 'Badia protegida · Inversió turística · Des de 2.000 €/m²',     slug: 'comprar-casa-emporda' },
  { nom: 'Empuriabrava',   descripcio: 'Marina residencial · Canals navegables · Des de 2.500 €/m²',   slug: 'comprar-casa-emporda' },
  { nom: 'Peratallada',    descripcio: 'Mercat exclusiu · Masies medievals · Mercat molt limitat',      slug: 'comprar-casa-emporda' },
];

export default async function InmobiliariaPage() {
  const guies = await getGuiesImmobiliaria();

  const guiesCompra   = guies.filter(g => g.slug && (g.slug.includes('comprar') || g.slug.includes('preu') || g.slug.includes('hipoteca') || g.slug.includes('impostos')));
  const guiesLloguer  = guies.filter(g => g.slug && (g.slug.includes('lloguer') || g.slug.includes('temporada')));
  const guiesInversio = guies.filter(g => g.slug && (g.slug.includes('invertir') || g.slug.includes('llicencia') || g.slug.includes('segona-residencia')));
  const guiesResta    = guies.filter(g => !guiesCompra.includes(g) && !guiesLloguer.includes(g) && !guiesInversio.includes(g));

  return (
    <>
      {/* ── HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1f2d 60%, #1a3a4a 100%)',
        color: '#faf9f6', padding: '80px 0 60px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <p style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '16px',
          }}>Immobiliària · L'Empordà</p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900,
            lineHeight: 1.1, marginBottom: '24px', color: '#faf9f6',
          }}>
            El mercat immobiliari<br />
            <em style={{ fontStyle: 'italic', color: '#a8c8e0' }}>de l'Empordà</em>
          </h1>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: '18px', lineHeight: 1.6,
            color: '#c8c0b0', maxWidth: '620px', marginBottom: '32px',
          }}>
            L'Empordà concentra alguns dels mercats immobiliaris més actius de Catalunya.
            Des de les masies del Baix Empordà fins als apartaments de primera línia de mar
            a Roses o Cadaqués. Guies completes per comprar, llogar o invertir.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/guies" style={{
              background: '#1a5c8a', color: '#faf9f6',
              padding: '12px 24px', textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em',
            }}>Comprar casa →</a>
            <a href="/guies" style={{
              background: 'transparent', color: '#faf9f6',
              border: '1px solid #faf9f640',
              padding: '12px 24px', textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em',
            }}>Llogar per temporada →</a>
          </div>
        </div>
      </section>

      {/* ── FRANJA NÚMEROS */}
      <section style={{ background: '#1a5c8a', color: '#faf9f6', padding: '20px 0' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0',
        }}>
          {[
            { n: '220 km', label: 'de litoral costat' },
            { n: '60%',    label: 'segones residències' },
            { n: '3.500€', label: 'preu mitjà/m² a Begur' },
            { n: '2',      label: 'comarques cobertes' },
          ].map((item, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '12px 8px',
              borderRight: i < 3 ? '1px solid #ffffff30' : 'none',
            }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 900, lineHeight: 1 }}>{item.n}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8, marginTop: '4px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── AGÈNCIES */}
        <section style={{ padding: '60px 0 40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '8px' }}>Professionals de confiança</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, margin: '0' }}>Agències immobiliàries a l'Empordà</h2>
          </div>

          <a href={AGENCIES_DESTACADES.principal.web} target="_blank" rel="noopener" style={{
            display: 'block', textDecoration: 'none', color: 'inherit',
            border: '2px solid #0a0a0a', padding: '28px 32px', marginBottom: '16px', background: '#faf9f6',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a5c8a', display: 'block', marginBottom: '8px' }}>⭐ {AGENCIES_DESTACADES.principal.badge}</span>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, margin: '0 0 10px' }}>{AGENCIES_DESTACADES.principal.nom}</h3>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '15px', lineHeight: 1.5, color: '#444', margin: '0 0 12px' }}>{AGENCIES_DESTACADES.principal.descripcio}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {AGENCIES_DESTACADES.principal.poblacions.map(p => (
                    <span key={p} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', padding: '3px 10px', border: '1px solid #e8e4dc', color: '#666' }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#0a0a0a' }}>{AGENCIES_DESTACADES.principal.telefon}</div>
                <div style={{ marginTop: '12px', background: '#0a0a0a', color: '#faf9f6', padding: '8px 20px', fontSize: '11px', fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.08em' }}>Visitar →</div>
              </div>
            </div>
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {AGENCIES_DESTACADES.secundaries.map((ag, i) => (
              <a key={i} href={ag.web} target="_blank" rel="noopener" style={{
                display: 'block', textDecoration: 'none', color: 'inherit',
                border: '1px solid #e8e4dc', padding: '20px 24px', background: '#faf9f6',
              }}>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a5c8a', display: 'block', marginBottom: '6px' }}>{ag.badge}</span>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>{ag.nom}</h3>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '13px', lineHeight: 1.5, color: '#555', margin: '0 0 12px' }}>{ag.descripcio}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '12px', color: '#888' }}>{ag.telefon}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '11px', color: '#1a5c8a', fontWeight: 500 }}>Visitar →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── PROPIETATS DESTACADES */}
        <section style={{ borderTop: '1px solid #e8e4dc', padding: '48px 0' }}>
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '8px' }}>Propietats seleccionades</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, margin: '0' }}>Propietats destacades</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {PROPIETATS_DESTACADES.map((p, i) => (
              <div key={i} style={{ border: '1px solid #e8e4dc', background: '#faf9f6', overflow: 'hidden' }}>
                <div style={{ height: '140px', background: 'linear-gradient(135deg, #d4e8f0 0%, #a8c8d8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '24px', opacity: 0.3 }}>🏡</span>
                  <span style={{ position: 'absolute', top: '10px', left: '10px', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', background: '#1a5c8a', color: '#fff', padding: '3px 8px' }}>{p.badge}</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', color: '#888', display: 'block' }}>{p.tipus} · {p.poblacio}</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, display: 'block' }}>{p.preu}</span>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '12px', lineHeight: 1.4, color: '#555', margin: '6px 0 12px' }}>{p.descripcio}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', color: '#666', padding: '2px 8px', border: '1px solid #e8e4dc' }}>{p.hab} hab.</span>
                    <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', color: '#666', padding: '2px 8px', border: '1px solid #e8e4dc' }}>{p.m2} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GUIES */}
        <section style={{ borderTop: '1px solid #e8e4dc', padding: '48px 0' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '8px' }}>Informació pràctica</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, margin: '0' }}>Guies del mercat immobiliari</h2>
          </div>
          {[
            { title: 'Comprar', guies: guiesCompra },
            { title: 'Llogar', guies: guiesLloguer },
            { title: 'Invertir & fiscalitat', guies: guiesInversio },
            { title: 'Altres guies', guies: guiesResta },
          ].filter(bloc => bloc.guies.length > 0).map((bloc, bi) => (
            <div key={bi} style={{ marginBottom: '36px' }}>
              <h3 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 0 12px', paddingBottom: '8px', borderBottom: '1px solid #e8e4dc' }}>{bloc.title}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: '#e8e4dc' }}>
                {bloc.guies.map((g, i) => (
                  <a key={i} href={`/guies/${g.slug}`} style={{ background: '#faf9f6', padding: '14px 16px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '13px', fontWeight: 400, lineHeight: 1.3, color: '#0a0a0a', display: 'block', marginBottom: '4px' }}>{g.titol}</span>
                    {g.meta_description && (
                      <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '11px', color: '#999', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{g.meta_description}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
          {guies.length === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: '#e8e4dc' }}>
              {["Comprar casa a l'Empordà", "Lloguer de temporada a l'Empordà", "Preu de l'habitatge a l'Empordà", "Invertir en immobiliària a l'Empordà", "Llicència turística a l'Empordà", "Masia o casa rural: com comprar", "Lloguer d'estiu a la Costa Brava", "Impostos en comprar habitatge a Catalunya", "Segona residència a l'Empordà", "Hipoteca per a l'Empordà"].map((t, i) => (
                <div key={i} style={{ background: '#faf9f6', padding: '14px 16px' }}>
                  <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '13px', color: '#0a0a0a' }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── MUNICIPIS */}
        <section style={{ borderTop: '1px solid #e8e4dc', padding: '48px 0' }}>
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '8px' }}>On comprar</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, margin: '0' }}>Preus per municipi</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: '#e8e4dc' }}>
            {MUNICIPIS.map((m, i) => (
              <a key={i} href={`/guies/${m.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: '#faf9f6', padding: '18px 20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, margin: '0 0 6px' }}>{m.nom}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '11px', color: '#888', margin: '0', lineHeight: 1.4 }}>{m.descripcio}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL */}
        <section style={{ borderTop: '1px solid #e8e4dc', padding: '48px 0 64px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Tens una propietat o una agència?</h2>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '16px', color: '#666', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.5 }}>
            TopEmpordà és el directori de referència de la comarca. Posa't en contacte amb nosaltres per aparèixer aquí.
          </p>
          <a href="mailto:info@topemporda.com" style={{ background: '#0a0a0a', color: '#faf9f6', padding: '14px 32px', textDecoration: 'none', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', display: 'inline-block' }}>
            Contactar →
          </a>
        </section>

      </div>
    </>
  );
}
