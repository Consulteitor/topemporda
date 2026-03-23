# TopEmpordà — Log de Sessions

## Sessió 1 — 19/03/2026

**Estat:** Inici de projecte  
**Tasques executades:**
- Creació de l'estructura de fitxers del framework
- Redacció del `01_brief.md`
- Benchmark SEO inicial → `03_benchmark.md`

**Decisions preses:**
- Scope inicial: Alt Empordà + Baix Empordà (comarca doble, com la marca "Empordà" és transversal)
- Domini suggerit: `topemporda.com` (pendent validar disponibilitat)
- Stack: clonem TopCerdanya (Next.js + Google Sheets + Vercel + Cloudinary)
- Idioma principal: català (com TopCerdanya), amb meta en castellà on la demanda ho justifiqui

**Insight clau del benchmark:**
La competència és institucional i genèrica. No hi ha cap referent digital local en català que cobreixi l'Empordà amb la mateixa granularitat (pobles, restaurants, immobiliària, rutes) que TopCerdanya cobreix la Cerdanya. El gap és enorme.

**Fitxers creats:**
- `00_log.md` (aquest)
- `01_brief.md`
- `03_benchmark.md`

**Fitxers pendents:**
- `02_oportunitat_seo.md` — keyword research detallat (propera sessió)
- `04_arquitectura.md` — estructura web i taxonomia
- `05_calendari.md` — pla de publicacions
- `06_codi/` — còpia i adaptació del codi TopCerdanya

**Proper pas:**
Sessió 2 — Keyword research: volums de cerca per als clusters principals (que fer, restaurants, rutes, immobiliària, pobles), identificació de keywords amb poc o nul contingut local en català, i priorització dels primers articles a publicar.

---

## Sessió 2 — 19/03/2026

**Estat:** Keyword research + Arquitectura  
**Tasques executades:**
- Keyword research per 7 clusters → `02_oportunitat_seo.md`
- Arquitectura web i taxonomia de pobles → `04_arquitectura.md`

**Decisions preses:**
- Scope geogràfic confirmat: Alt + Baix Empordà sota marca única "Empordà"
- Fase 1 de pobles: Figueres, Cadaqués, Begur, Peratallada, Roses (5 pobles × 7 fitxers = 35 .md)
- URLs en català sense accents, estructura idèntica a TopCerdanya
- Empuriabrava com a poble independent (demanda pròpia de cerca immobiliàri)
- Camí de ronda = actiu SEO diferencial inexistent a la Cerdanya, crear guia dedicada
- Immobiliàri és el cluster amb GAP màxim: zero competència editorial en català

**Insight clau del keyword research:**
- "Restaurants Begur" en català → cap guia editorial. Guiacat + botiguesdecatalunya (directoris bàsics). **Camp totalment obert.**
- Immobiliàri Empordà: Idealista + agències posicionen però cap guia editorial. El model TopCerdanya funciona directament aquí.
- Família/nens: zero contingut específic en català per a cap poble de l'Empordà. Oportunitat directa.
- "Setmana Santa Empordà 2026": **URGENT** (Setmana Santa és al mes d'abril 2026, cal publicar ASAP)

**Top 20 keywords prioritaris documentats** a `02_oportunitat_seo.md`

**Fitxers creats:**
- `02_oportunitat_seo.md`
- `04_arquitectura.md`

**Proper pas:**
Sessió 3 — Dues opcions:
  A) Escriure els primers continguts: `setmana-santa-emporda-2026` (URGENT) + megapilars de Figueres i Cadaqués
  B) Adaptar el codi de TopCerdanya: canvis de nomenclatura, nou GA4, ajust de Navbar/Footer, configuració inicial del Google Sheet
  
  **Recomanació:** Fer A i B en paral·lel. Primer crear la guia de Setmana Santa (contingut urgent), després codi base.

---

## Sessió 3 — 19/03/2026

**Estat:** Adaptació codi base  
**Tasques executades:**
- Llegits i analitzats: Navbar.js, Footer.js, CookieBanner.js, layout.js, globals.css, sitemap.js, next.config.ts de TopCerdanya
- Creats tots els fitxers adaptats a `06_codi/`

**Fitxers creats a `06_codi/`:**
- `Navbar.js` — coords Figueres (42.2669, 2.9603), texts Empordà, ticker Empordà
- `CookieBanner.js` — clau `te_cookies` (era `tc_cookies`)
- `layout.js` — títol, descripció, email, footer, GA4 placeholder `G-XXXXXXXXXX`
- `globals.css` — accent `#1a5c8a` (blau mediterrani, revisable), resta idèntic
- `sitemap.js` — BASE `https://topemporda.com`, lògica idèntica
- `next.config.ts` — net, sense redirects de TopCerdanya
- `MANTENIMENT.md` — manual operacional complet adaptat
- `SETUP.md` — guia pas a pas per arrencar el repo des de zero

**Decisions preses:**
- Color accent: `#1a5c8a` (blau mediterrani) en lloc del vermell de TopCerdanya — **revisable**
- `te_cookies` com a clau localStorage
- Ticker Navbar: anxoves L'Escala, Camí de Ronda, Mercat Figueres, DO Empordà
- `G-XXXXXXXXXX` com a placeholder GA4 — **pendent crear propietat GA4 real**

**Pendents tècnics (necessiten el repo real):**
- Reescriptura manual: `page.js`, `pobles/page.js`, `inmobiliaria/page.js`, `not-found.js`, `guies/page.js`, `directori/page.js`
- Configurar Apps Script + URL a `lib/sheets.js`
- Crear propietat GA4 i actualitzar ID
- Registrar domini `topemporda.com`

**Proper pas:**
Sessió 4 — Contingut:
- `setmana-santa-emporda-2026.md` (URGENT)
- Megapilar `figueres.md` + `figueres-que-fer.md` + `figueres-restaurants.md`
- Megapilar `cadaques.md` + `cadaques-que-fer.md`
