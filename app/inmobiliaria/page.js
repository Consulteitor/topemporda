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
    const res = await fetch(`${SHEETS_URL}?sheet=Guies`, { next: { revalidate: 172800 } });
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
  { nom: 'Begur',          descripcio: 'Costa Brava exclusiva · Cales úniques · Des de 4.000 €/m²',   href: '/pobles/begur/immobiliaria' },
  { nom: 'Cadaqués',       descripcio: 'Mercat limitat · Molt demandat · Des de 5.000 €/m²',           href: '/pobles/cadaques/immobiliaria' },
  { nom: 'Figueres',       descripcio: 'Capital comarcal · Tots els serveis · Des de 1.400 €/m²',      href: '/pobles/figueres/immobiliaria' },
  { nom: 'Roses',          descripcio: 'Badia protegida · Inversió turística · Des de 2.000 €/m²',     href: '/pobles/roses/immobiliaria' },
  { nom: "L'Escala",       descripcio: 'Golf de Roses · Primera residència · Des de 2.000 €/m²',       href: '/pobles/lescala/immobiliaria' },
  { nom: 'Peratallada',    descripcio: 'Mercat exclusiu · Masies medievals · Mercat molt limitat',      href: '/pobles/peratallada/immobiliaria' },
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
            <a href="/guies/comprar-casa-emporda-guia-mercat" style={{
              background: '#1a5c8a', color: '#faf9f6',
              padding: '12px 24px', textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em',
            }}>Guia per comprar casa →</a>
            <a href="#municipis" style={{
              background: 'transparent', color: '#faf9f6',
              border: '1px solid #faf9f640',
              padding: '12px 24px', textDecoration: 'none',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em',
            }}>Preus per municipi →</a>
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

        {/* ── CTA AGÈNCIES */}
        <section style={{ padding: '60px 0 40px' }}>
          <div style={{ border: '2px solid #0a0a0a', padding: '40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ maxWidth: '520px' }}>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '10px' }}>Agències immobiliàries</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, margin: '0 0 12px' }}>Ets una agència a l'Empordà?</h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '16px', lineHeight: 1.6, color: '#444', margin: '0' }}>
                Top Empordà és el directori de referència de la comarca. Si tens una agència immobiliària a l'Alt o Baix Empordà i vols aparèixer aquí com a professional de confiança, posa't en contacte amb nosaltres.
              </p>
            </div>
            <a href="mailto:info@topemporda.com" style={{
              background: '#0a0a0a', color: '#faf9f6',
              padding: '14px 32px', textDecoration: 'none', whiteSpace: 'nowrap',
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0,
            }}>
              Contactar →
            </a>
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
          <div id="municipis" style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '8px' }}>On comprar</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, margin: '0' }}>Preus per municipi</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: '#e8e4dc' }}>
            {MUNICIPIS.map((m, i) => (
              <a key={i} href={m.href} style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: '#faf9f6', padding: '18px 20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, margin: '0 0 6px' }}>{m.nom}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '11px', color: '#888', margin: '0', lineHeight: 1.4 }}>{m.descripcio}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── BLOC CASTELLÀ (SEO: "inmobiliaria empordà") */}
        <section style={{ borderTop: '1px solid #e8e4dc', padding: '48px 0' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a5c8a', marginBottom: '8px' }}>En español</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, margin: '0' }}>Inmobiliaria en el Empordà: comprar, alquilar e invertir</h2>
          </div>
          <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '16px', lineHeight: 1.7, color: '#3a3733' }}>
            <p style={{ margin: '0 0 16px' }}>
              El Empordà reúne algunos de los mercados inmobiliarios más activos de Cataluña. Dos comarcas muy distintas: el <strong>Alt Empordà</strong>, con Figueres como capital de servicios y la Costa Brava norte (Roses, Cadaqués, l'Escala); y el <strong>Baix Empordà</strong>, con los pueblos medievales del interior (Peratallada, La Bisbal) y las calas de Begur, Pals o Palafrugell. Comprar aquí va desde un apartamento en primera línea de mar hasta una masía del siglo XVIII por restaurar.
            </p>
            <p style={{ margin: '0 0 16px' }}>
              Los precios varían muchísimo según la zona: rondan los <strong>5.000 €/m²</strong> en Cadaqués y Begur, los 2.000 €/m² en Roses o l'Escala y bajan a partir de <strong>1.400 €/m²</strong> en Figueres y el interior. Cerca del 60% de las operaciones son <strong>segundas residencias</strong>, lo que marca el ritmo del mercado: mucha demanda en verano y un peso importante de la compra como inversión turística.
            </p>
            <p style={{ margin: '0 0 16px' }}>
              <strong>Antes de comprar en el Empordà, ten en cuenta:</strong>
            </p>
            <ul style={{ margin: '0 0 16px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Licencia turística:</strong> si buscas alquilar a turistas, comprueba que la vivienda la tenga en vigor. En muchos municipios costeros ya no se conceden nuevas.</li>
              <li style={{ marginBottom: '8px' }}><strong>Impuestos:</strong> el ITP en Cataluña para vivienda de segunda mano va del 10% al 11% según el precio. Súmalo al presupuesto.</li>
              <li style={{ marginBottom: '8px' }}><strong>Estacionalidad:</strong> los mejores precios de alquiler de temporada se cierran en invierno; las ventas se aceleran de primavera a verano.</li>
            </ul>
            <p style={{ margin: '0' }}>
              Encontrarás el detalle de cada zona en las páginas de precios por municipio de <a href="/pobles/begur/immobiliaria" style={{ color: '#1a5c8a' }}>Begur</a>, <a href="/pobles/cadaques/immobiliaria" style={{ color: '#1a5c8a' }}>Cadaqués</a>, <a href="/pobles/roses/immobiliaria" style={{ color: '#1a5c8a' }}>Roses</a> y <a href="/pobles/figueres/immobiliaria" style={{ color: '#1a5c8a' }}>Figueres</a>, y en nuestras guías prácticas para comprar, alquilar e invertir en la comarca.
            </p>
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
