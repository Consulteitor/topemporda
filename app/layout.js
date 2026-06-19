import './globals.css'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import CookieBanner from '../components/CookieBanner'

// ─── IMATGE PER DEFECTE (OG / Twitter) ────────────────────────────────────────
// TODO: crear una imatge representativa 1200×630px, desar-la a
// public/images/og-topemporda.jpg i descomentar la línia de sota + les
// referències `images` a openGraph i twitter.
// const OG_IMAGE_DEFAULT = 'https://topemporda.com/images/og-topemporda.jpg'

// ─── METADATA GLOBAL ──────────────────────────────────────────────────────────
// Les pàgines que generen el seu propi generateMetadata() sobreescriuen
// aquests valors. Aquí definim els fallbacks i els camps globals.
export const metadata = {
  title: {
    default: 'Top Empordà — El directori de l\'Empordà',
    template: '%s | Top Empordà',
  },
  description: 'Directori de negocis locals, restaurants, allotjaments i activitats a l\'Empordà. Alt Empordà i Baix Empordà.',
  metadataBase: new URL('https://topemporda.com'),

  // Open Graph global
  openGraph: {
    siteName: 'Top Empordà',
    locale: 'ca_ES',
    type: 'website',
    // images: [{ url: OG_IMAGE_DEFAULT, width: 1200, height: 630, alt: 'Top Empordà — Directori i guies de l\'Empordà' }],
  },

  // Twitter / X Card global
  twitter: {
    card: 'summary_large_image',
    site: '@topemporda',
    // images: [OG_IMAGE_DEFAULT],
  },

  // robots global — indexar i seguir tot per defecte
  robots: {
    index: true,
    follow: true,
    maxImagePreview: 'large',
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: 'large',
    },
  },
}

// ─── SCHEMAS JSON-LD GLOBALS ──────────────────────────────────────────────────

// Organization: qui som
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://topemporda.com/#organization',
  name: 'Top Empordà',
  url: 'https://topemporda.com',
  logo: 'https://topemporda.com/favicon.svg',
  sameAs: [
    // Afegir perfils de xarxes socials quan estiguin creats
    // 'https://www.instagram.com/topemporda',
  ],
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Empordà',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Catalunya',
    },
  },
  description: 'Directori i guia de viatge per a la comarca de l\'Empordà (Alt i Baix Empordà, Costa Brava, Catalunya).',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@topemporda.com',
    contactType: 'customer support',
    availableLanguage: ['Catalan', 'Spanish'],
  },
}

// WebSite: nom del site + SearchAction (habilita el Sitelinks Search Box a Google)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://topemporda.com/#website',
  name: 'Top Empordà',
  url: 'https://topemporda.com',
  publisher: {
    '@id': 'https://topemporda.com/#organization',
  },
  inLanguage: 'ca',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://topemporda.com/directori?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const SITE_SCHEMAS = [organizationSchema, websiteSchema]

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>
        {SITE_SCHEMAS.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <Navbar />
        <main
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}
          className="main-layout"
        >
          {children}
        </main>
        <footer
          className="site-footer"
          style={{
            borderTop: '3px solid #0a0a0a',
            padding: '32px 40px',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '10px',
            color: '#9a9489',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: '#0a0a0a' }}>
              Top<span style={{ color: '#1a5c8a' }}>.</span>Empordà
            </span>
            <span>© 2026 Top Empordà · Tots els drets reservats · Fet amb amor a l'Empordà</span>
          </div>
          <div style={{ borderTop: '1px solid #e8e4dc', marginTop: '20px', paddingTop: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/badge" style={{ color: '#9a9489', textDecoration: 'none' }}>Badge</Link>
            <a href="mailto:info@topemporda.com" style={{ color: '#9a9489', textDecoration: 'none' }}>Contacte</a>
            <Link href="/avis-legal" style={{ color: '#9a9489', textDecoration: 'none' }}>Avís legal</Link>
            <Link href="/politica-de-privacitat" style={{ color: '#9a9489', textDecoration: 'none' }}>Política de privacitat</Link>
            <Link href="/politica-de-cookies" style={{ color: '#9a9489', textDecoration: 'none' }}>Política de cookies</Link>
          </div>
        </footer>
        {/* GA4 id: pendent configurar a Google Analytics. Substituir XXXXXXXXXX pel nou id */}
        <CookieBanner gaId="G-Z5CMSYG9V4" />
      </body>
    </html>
  )
}
