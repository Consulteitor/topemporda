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
