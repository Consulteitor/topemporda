import './globals.css'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import CookieBanner from '../components/CookieBanner'

export const metadata = {
  title: 'Top Empordà — El directori de l\'Empordà',
  description: 'Directori de negocis locals, restaurants, allotjaments i activitats a l\'Empordà. Alt Empordà i Baix Empordà.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>
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
              Top<span style={{ color: '#c8423a' }}>.</span>Empordà
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
