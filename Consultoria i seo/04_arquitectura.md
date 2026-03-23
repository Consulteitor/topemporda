# TopEmpordà — Arquitectura Web i Taxonomia de Contingut

_Sessió 2 · 19/03/2026_

---

## Principi rector

Clonem l'arquitectura de TopCerdanya sense reinventar res. On TopCerdanya fa `/pobles/puigcerda/restaurants`, TopEmpordà fa `/pobles/figueres/restaurants`. L'única diferència és l'escala: l'Empordà té molts més pobles i una casuística immobiliària més complexa que justifica ampliar el cluster.

---

## 1. Estructura d'URLs

```
topemporda.com/
├── /pobles                          ← Hub de pobles (com TopCerdanya)
│   ├── /pobles/figueres             ← Megapilar: Figueres
│   │   ├── /pobles/figueres/que-fer
│   │   ├── /pobles/figueres/restaurants
│   │   ├── /pobles/figueres/allotjament
│   │   ├── /pobles/figueres/immobiliaria
│   │   ├── /pobles/figueres/rutes
│   │   └── /pobles/figueres/amb-nens
│   ├── /pobles/cadaques             ← Megapilar: Cadaqués
│   │   └── [mateixos 6 subtemes]
│   ├── /pobles/begur
│   ├── /pobles/roses
│   ├── /pobles/lescala
│   ├── /pobles/palafrugell
│   ├── /pobles/peratallada
│   ├── /pobles/pals
│   ├── /pobles/lestartit
│   ├── /pobles/llanca
│   ├── /pobles/la-bisbal-demporda
│   ├── /pobles/empuriabrava
│   ├── /pobles/port-de-la-selva
│   ├── /pobles/colera
│   └── /pobles/castelló-d'empuries
│
├── /guies                           ← Hub de guies editorials
│   ├── /guies/que-fer-a-lemporda-guia-practica-2026
│   ├── /guies/emporda-en-2-dies-itinerari-2026
│   ├── /guies/setmana-santa-emporda-2026
│   ├── /guies/pobles-medievals-emporda
│   ├── /guies/millors-platges-emporda-2026
│   ├── /guies/cami-de-ronda-emporda-guia
│   ├── /guies/rutes-cap-de-creus
│   ├── /guies/aiguamolls-emporda-com-visitar
│   ├── /guies/vi-do-emporda-guia-cellers
│   ├── /guies/anxoves-lescala-guia
│   ├── /guies/gastronomia-emporda-productes-locals
│   ├── /guies/on-menjar-emporda-guia-2026
│   ├── /guies/restaurants-amb-nens-emporda-2026
│   ├── /guies/emporda-amb-nens-que-fer-2026
│   ├── /guies/platges-nens-emporda-2026
│   ├── /guies/rutes-facils-emporda-amb-nens
│   ├── /guies/cases-rurals-emporda-guia
│   ├── /guies/on-dormir-emporda-guia-2026
│   └── /guies/allotjament-emporda-com-triar
│
├── /inmobiliaria                    ← Subhome immobiliària (com TopCerdanya)
│   └── (landing hub amb links a les guies i al directori)
│
├── /guies [immobiliàries]
│   ├── /guies/comprar-casa-emporda
│   ├── /guies/comprar-casa-figueres
│   ├── /guies/comprar-casa-cadaques
│   ├── /guies/comprar-casa-begur
│   ├── /guies/comprar-casa-roses
│   ├── /guies/comprar-casa-lescala
│   ├── /guies/preu-habitatge-emporda-2026
│   ├── /guies/lloguer-temporada-emporda
│   ├── /guies/lloguer-estiu-emporda
│   ├── /guies/lloguer-hivern-emporda
│   ├── /guies/invertir-emporda-immobiliaria
│   ├── /guies/segona-residencia-emporda
│   ├── /guies/empuriabrava-immobiliaria
│   ├── /guies/masia-emporda-comprar
│   ├── /guies/obra-nova-emporda
│   ├── /guies/llicencia-turistica-emporda
│   ├── /guies/impostos-compra-habitatge-emporda
│   ├── /guies/hipoteca-emporda
│   ├── /guies/inmobiliaries-emporda
│   └── /guies/vendre-casa-emporda
│
├── /noticies                        ← Notícies locals
├── /directori                       ← Directori de negocis
└── /agenda                          ← Agenda d'events (futur)
```

---

## 2. Subtemes per poble (6 subtemes estàndard)

Idèntic a TopCerdanya. Tots els pobles principals tindran aquests 6 subtemes:

| Subtema | URL pattern | Descripció |
|---|---|---|
| `que-fer` | `/pobles/[slug]/que-fer` | Guia pràctica d'activitats i llocs a visitar |
| `restaurants` | `/pobles/[slug]/restaurants` | Els millors restaurants amb recomanació editorial |
| `allotjament` | `/pobles/[slug]/allotjament` | On dormir (hotels, cases rurals, apartaments) |
| `immobiliaria` | `/pobles/[slug]/immobiliaria` | Mercat immobiliari local, preus, immobiliàries |
| `rutes` | `/pobles/[slug]/rutes` | Rutes de senderisme, bici, camí de ronda |
| `amb-nens` | `/pobles/[slug]/amb-nens` | Activitats i recomanacions per a famílies |

---

## 3. Pobles prioritaris per fase

### Fase 1 — Llançament (0-3 mesos): 5 pobles pilots

Criteris de selecció: volum de cerca alt + gap en català màxim + reconeixement de marca fort

| Poble | Comarca | Justificació SEO |
|---|---|---|
| **Figueres** | Alt | Capital, Dalí, màxima demanda de cerca, mercat immobiliari primari |
| **Cadaqués** | Alt | Icònic, màxima demanda turística, zero contingut editorial CA |
| **Begur** | Baix | Molt cercat, cales, mercat immobiliari luxe, cap guia CA |
| **Peratallada** | Baix | Poble medieval, molt fotogènic, alta demanda, zero CA |
| **Roses** | Alt | Turisme massiu, Costa Brava, gran mercat immobiliari |

**Fase 1 = 5 pobles × 6 subtemes + fitxer pilar = 35 fitxers .md de pobles**

### Fase 2 — Expansió (3-6 mesos): +5 pobles

| Poble | Comarca | Justificació |
|---|---|---|
| **L'Escala** | Alt | Anxoves, platja, família, demanda alta |
| **Palafrugell** | Baix | Hub del Baix Empordà, alta demanda |
| **Pals** | Baix | Medieval, arròs, turisme |
| **L'Estartit** | Baix | Illes Medes, submarinisme, nínxol |
| **Empuriabrava** | Alt | Marina única, mercat immobiliari enorme |

### Fase 3 — Cobertura completa (6-12 mesos): +6 pobles

| Poble | Comarca | Justificació |
|---|---|---|
| **Llançà** | Alt | Costa nord, platja, menys competit |
| **La Bisbal d'Empordà** | Baix | Capital comarcal, ceràmica, residencial |
| **Port de la Selva** | Alt | Pesca, menys turístic, nínxol |
| **Castelló d'Empúries** | Alt | Empúries, història, Empuriabrava |
| **Colera** | Alt | Cales verges, platges poc massificades |
| **La Jonquera** | Alt | Frontera, nínxol específic |

---

## 4. Arquitectura de guies — Roadmap per clusters

### Cluster Turisme (prioritat 1)
Articles a crear en ordre:

1. `que-fer-a-lemporda-guia-practica-2026` — pilar general
2. `emporda-en-2-dies-itinerari-2026` — high intent, no competit CA
3. `setmana-santa-emporda-2026` ← **URGENT** (temporada imminent)
4. `pobles-medievals-emporda` — molt cercat
5. `millors-platges-emporda-2026`
6. `cami-de-ronda-emporda-guia`
7. `rutes-cap-de-creus`

### Cluster Immobiliàri (prioritat 1)
Articles a crear en ordre (clonar directament de TopCerdanya adaptant):

1. `comprar-casa-emporda` — pilar general immobiliàri
2. `preu-habitatge-emporda-2026` — alta intencionalitat
3. `comprar-casa-figueres`
4. `comprar-casa-cadaques`
5. `comprar-casa-begur`
6. `lloguer-temporada-emporda`
7. `empuriabrava-immobiliaria` ← keyword específic
8. `invertir-emporda-immobiliaria`
9. `segona-residencia-emporda`
10. `inmobiliaries-emporda` ← directori immobiliàries

### Cluster Família (prioritat 2)
1. `emporda-amb-nens-que-fer-2026`
2. `platges-nens-emporda-2026`
3. `rutes-facils-emporda-amb-nens`
4. `restaurants-amb-nens-emporda-2026`
5. `on-dormir-emporda-amb-nens-2026`

### Cluster Gastronomia (prioritat 2)
1. `on-menjar-emporda-guia-2026` — pilar general
2. `anxoves-lescala-guia`
3. `vi-do-emporda-guia-cellers`
4. `gastronomia-emporda-productes-locals`

---

## 5. Diferències d'arquitectura vs. TopCerdanya

| Element | TopCerdanya | TopEmpordà | Justificació |
|---|---|---|---|
| Nombre de pobles Fase 1 | 4 (Puigcerdà, Bellver, Llívia, Alp) | 5 | Empordà té pobles més coneguts |
| Subtemes per poble | 6 | 6 | Idèntic |
| Cluster immobiliàri | Genèric comarca | + Empuriabrava + Cadaqués luxe | Mercat diferent |
| Gastronomia | Bolets, restaurants | + Anxoves, vi DO Empordà, oli | Productes locals específics |
| Cluster mar | No existeix | Platges, camí de ronda, cales | Costa Brava diferencial |
| Agenda | Sí | Sí | Idèntic |
| Directori | Sí | Sí | Idèntic |
| Noticies | Sí | Sí | Idèntic |

---

## 6. Stack tècnic i fitxers a crear

### Fitxers de codi a adaptar de TopCerdanya

```
06_codi/
├── sitemap.js          ← Canviar BASE, afegir pobles i subtemes nous
├── page.js (home)      ← Adaptar identitat visual (colors, copy)
├── layout.js           ← Canviar nom i favicon
├── globals.css         ← Palette visual (pendent decisió)
├── Navbar.js           ← Canviar "Top Cerdanya" per "Top Empordà"
├── Footer.js           ← Idem
└── CookieBanner.js     ← Canviar id GA4
```

### Canvis de nomenclatura obligatoris

| TopCerdanya | TopEmpordà |
|---|---|
| `topcerdanya.com` | `topemporda.com` |
| `Top Cerdanya` | `Top Empordà` |
| `G-QY8PYQMKHR` | [nou GA4 id] |
| `tc_cookies` (localStorage) | `te_cookies` |

### Google Sheet — estructura idèntica

Mateixos tabs: `Guies` · `Noticies` · `Negocis` · `Pobles` · `Badges`

Canvi: el tab `Pobles` tindrà molts més registres (fins a 16 pobles vs 4 a TopCerdanya).

---

## 7. Decisions d'arquitectura preses

**Decisió 1 — Scope geogràfic:** Cobreim Alt Empordà + Baix Empordà sota una sola marca "Empordà". No fem dues webs separades. Justificació: la marca "Empordà" és transversal i la majoria de cercadors no fan distinció de comarca.

**Decisió 2 — Empuriabrava com a poble independent:** Tot i que és un nucli de Castelló d'Empúries, té prou personalitat i demanda de cerca pròpia per justificar el seu propi pilar `/pobles/empuriabrava`. Mateixa lògica que Portlligat forma part de Cadaqués.

**Decisió 3 — Immobiliàri al mateix lloc:** No creem subdomini ni secció sepada. Les guies immobiliàries van a `/guies/[slug]` amb la categoria `immobiliaria` al Sheet, igual que TopCerdanya. La subhome `/inmobiliaria` actua de landing hub.

**Decisió 4 — URLs en català:** Tots els slugs en català (sense accents): `cadaques`, `lescala`, `peratallada`. Excepcions: `la-bisbal-demporda`, `castello-dempuries`.

**Decisió 5 — Camí de ronda com a contingut propi:** El "camí de ronda" de l'Empordà és un actiu SEO diferencial que no existeix a la Cerdanya. Creem una guia específica i linkant des de múltiples subtemes de pobles (rutes, que-fer).
