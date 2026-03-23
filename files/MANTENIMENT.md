# Top Empordà — Manual de Manteniment

**Live:** topemporda.com (pendent de crear)  
**Stack:** Google Sheets → Apps Script → Next.js → Vercel  
**Referència:** Clonat de topcerdanya.com. Consultar el manual de TopCerdanya per detalls de codi no coberts aquí.

---

## Índex ràpid

1. [Publicar contingut nou](#1-publicar-contingut-nou)
2. [Gestionar el Google Sheet](#2-gestionar-el-google-sheet)
3. [Configuració inicial (una sola vegada)](#3-configuració-inicial)
4. [Control editorial de la home](#4-control-editorial-de-la-home)
5. [Sistema de pobles](#5-sistema-de-pobles)
6. [SEO i Google Search Console](#6-seo-i-google-search-console)
7. [Deploy i Vercel](#7-deploy-i-vercel)
8. [Gestió d'imatges (Cloudinary)](#8-gestió-dimatges-cloudinary)
9. [Legal i cookies](#9-legal-i-cookies)
10. [Diagnòstic d'errors freqüents](#10-diagnòstic-derrors-freqüents)
11. [Resum de comandes habituals](#11-resum-de-comandes-habituals)
12. [Estructura del projecte](#12-estructura-del-projecte)

---

## 1. Publicar contingut nou

### Publicar una nova guia

**Pas 1 — Crear el fitxer markdown**

```bash
touch ~/Projects/topemporda/content/guies/NOM-SLUG.md
```

**Regles importants per al markdown:**
- **No** posar `# Títol` a la primera línia — el `<h1>` ja el posa el `page.js` al hero
- Comença directament amb `## Primera secció` (`<h2>`)

**Pas 2 — Afegir la fila al Google Sheet (tab Guies)**

| Camp | Exemple |
|---|---|
| `id` | `que-fer-a-lemporda-guia-practica-2026` |
| `slug` | `que-fer-a-lemporda-guia-practica-2026` |
| `titol` | Què fer a l'Empordà: la guia pràctica 2026 |
| `meta_description` | Text per a Google (155 caràcters màx) |
| `categoria` | gastronomia / rutes / allotjament / amb-nens / immobiliaria / hivern / estiu / tardor / primavera / pobles / general |
| `posicio_home` | hero / home1 / home2 / home3 / home4 *(o buit)* |
| `destacada` | TRUE / FALSE |
| `estat` | publicat |
| `data_publicacio` | 19/03/2026 |
| `imatge` | URL de Cloudinary |

**Pas 3 — Push**
```bash
cd ~/Projects/topemporda
git add content/guies/NOM-SLUG.md
git commit -m "feat: nova guia NOM-SLUG"
git push
```

---

### Publicar una nova notícia

Les notícies s'afegeixen directament al **Google Sheet (tab Noticies)**. No cal fitxer markdown.

| Camp | Valor |
|---|---|
| `id` | slug-de-la-noticia |
| `titol` | Títol de la notícia |
| `resum` | 2-3 frases de resum |
| `cat` | Salut / Mobilitat / Cultura / Esports / Patrimoni / Economia / Turisme |
| `autor` | Redacció Top Empordà |
| `data` | 19 mar 2026 |
| `min` | 3 |
| `imatge` | URL de Cloudinary (opcional) |

Si és urgent, forçar redeploy:
```bash
cd ~/Projects/topemporda
git commit --allow-empty -m "redeploy: nova noticia"
git push
```

---

### Publicar un negoci al directori

Afegir fila al **Google Sheet (tab Negocis)**, llavors sincronitzar:
```bash
python3 ~/Projects/sync-negocis-emporda.py
cd ~/Projects/topemporda
git add data/negocis.json
git commit -m "data: actualitzar directori"
git push
```

---

## 2. Gestionar el Google Sheet

**URL de l'Apps Script API:**
```
[PENDENT — crear nou Google Sheet i nou Apps Script per TopEmpordà]
```

> ⚠️ No compartir el Sheet de TopCerdanya. TopEmpordà necessita el seu propi Sheet independent.

**Tabs necessaris:** `Guies` · `Noticies` · `Negocis` · `Pobles` · `Badges`

### Camps per tab (idèntics a TopCerdanya)

**Tab Guies:**
`id · slug · titol · meta_description · categoria · posicio_home · destacada · estat · data_publicacio · imatge`

**Tab Noticies:**
`id · titol · resum · cat · autor · data · min · imatge`

**Tab Negocis:**
`id · nom · categoria · poble · descripcio · telefon · web · valoracio · ressenyes · tags · destacat`

**Tab Pobles:**
`id · slug · titol · meta_description · imatge`

**Tab Badges:**
`slug · nom · poble · categoria · tipus · actiu · data_inici · data_fi`

### Categories de negocis específiques de l'Empordà

A `categoria` del tab Negocis, a més de les estàndard, afegir:
- `celler` — cellers DO Empordà
- `platja` — bars de platja, xiringuitos
- `pesca` — llotges, peixateries
- `ceramica` — específic La Bisbal d'Empordà

---

## 3. Configuració inicial (una sola vegada)

Pas a pas per arrencar TopEmpordà des de zero:

### 3.1 Clonar repositori TopCerdanya

```bash
cd ~/Projects
git clone https://github.com/Consulteitor/topcerdanya.git topemporda
cd topemporda
# Desconnectar del repo original i crear repo nou
rm -rf .git
git init
git remote add origin https://github.com/[usuari]/topemporda.git
```

### 3.2 Substituir fitxers adaptats

Copiar des de `top-emporda/06_codi/` al repo clonat:

```bash
# Components
cp ~/top-emporda/06_codi/Navbar.js components/Navbar.js
cp ~/top-emporda/06_codi/CookieBanner.js components/CookieBanner.js

# App
cp ~/top-emporda/06_codi/layout.js app/layout.js
cp ~/top-emporda/06_codi/globals.css app/globals.css
cp ~/top-emporda/06_codi/sitemap.js app/sitemap.js
cp ~/top-emporda/06_codi/next.config.ts next.config.ts
```

### 3.3 Canvis addicionals al codi (cerca global)

Fer cerca global al repo de `topcerdanya` i substituir:

| Cerca | Substitueix per |
|---|---|
| `topcerdanya.com` | `topemporda.com` |
| `Top Cerdanya` | `Top Empordà` |
| `TopCerdanya` | `TopEmpordà` |
| `top-cerdanya` | `top-emporda` |
| `G-QY8PYQMKHR` | `G-XXXXXXXXXX` *(nou GA4)* |
| `tc_cookies` | `te_cookies` |
| `info@topcerdanya.com` | `info@topemporda.com` |
| `La Cerdanya` | `L'Empordà` |
| `Pirineu` | `Empordà` *(al footer)* |
| `Puigcerdà` | `Figueres` *(al Navbar, temps)* |

> ⚠️ Revisar manualment `app/inmobiliaria/page.js` i `app/pobles/page.js` — contenen textos descriptius de la Cerdanya que cal reescriure.

### 3.4 Crear Google Sheet nou

1. Crear Sheet a Google Drive: "TopEmpordà — Base de dades"
2. Crear els tabs: `Guies`, `Noticies`, `Negocis`, `Pobles`, `Badges`
3. Configurar Apps Script (copiar script de TopCerdanya i actualitzar)
4. Publicar com a Web App → copiar URL
5. Actualitzar la URL a `lib/sheets.js`

### 3.5 Crear propietat GA4

1. Google Analytics → Crear propietat "Top Empordà"
2. Copiar l'ID de mesura (format `G-XXXXXXXXXX`)
3. Substituir `G-XXXXXXXXXX` a `layout.js`

### 3.6 Configurar Vercel

```bash
cd ~/Projects/topemporda
vercel --prod
# Connectar domini topemporda.com
# Afegir variable d'entorn SHEET_URL si s'usa
```

### 3.7 Registrar domini

- `topemporda.com` — verificar disponibilitat (pendent)
- Alternativa: `top-emporda.cat` / `topemporda.cat`

---

## 4. Control editorial de la home

Idèntic a TopCerdanya. Des del Google Sheet tab Guies:

| Valor `posicio_home` | On apareix |
|---|---|
| `hero` | Hero principal (imatge gran) |
| `home1` | Primera targeta gran del bloc Guies |
| `home2` | Segona targeta gran |
| `home3` | Tercera posició (compacte) |
| `home4` | Quarta posició (compacte) |
| *(buit)* | Apareix a `/guies` però no a la home |

---

## 5. Sistema de pobles

### Pobles Fase 1 (arrencar)

| Slug | Nom complet | Comarca |
|---|---|---|
| `figueres` | Figueres | Alt Empordà |
| `cadaques` | Cadaqués | Alt Empordà |
| `begur` | Begur | Baix Empordà |
| `peratallada` | Peratallada | Baix Empordà |
| `roses` | Roses | Alt Empordà |

### Fitxers necessaris per poble (× 5 pobles = 35 fitxers)

Per cada `[slug]`, crear:
```
content/pobles/[slug].md              ← pilar del poble
content/pobles/[slug]-que-fer.md
content/pobles/[slug]-restaurants.md
content/pobles/[slug]-allotjament.md
content/pobles/[slug]-immobiliaria.md
content/pobles/[slug]-rutes.md
content/pobles/[slug]-amb-nens.md
```

I afegir al tab `Pobles` del Sheet:
```
id: [slug]
slug: [slug]
titol: [Nom del poble] — Guia completa 2026
meta_description: Tot el que cal saber sobre [Nom]: restaurants, rutes, allotjament i més.
imatge: [URL Cloudinary]
```

### Afegir poble nou (Fase 2 i 3)

1. Crear els 7 fitxers `.md` a `content/pobles/`
2. Afegir fila al Sheet tab `Pobles`
3. Push i deploy

---

## 6. SEO i Google Search Console

### Configuració inicial

1. Verificar domini a Search Console
2. Enviar sitemap: `https://topemporda.com/sitemap.xml`
3. Sol·licitar indexació per a cada URL important publicada

### Prioritat d'indexació (ordre recomanat)

1. Home (`/`)
2. `/pobles` hub
3. `/pobles/figueres` + subtemes
4. `/pobles/cadaques` + subtemes
5. `/guies/que-fer-a-lemporda-guia-practica-2026`
6. `/guies/setmana-santa-emporda-2026` ← URGENT
7. Guies immobiliàries principals

### Canonical i OpenGraph

Igual que TopCerdanya:
- Pàgines estàtiques → `export const metadata`
- Pàgines dinàmiques → `generateMetadata()`
- `/directori` → sense OpenGraph (és `'use client'`)

---

## 7. Deploy i Vercel

**Vercel desplega automàticament** amb cada push a `main`. Temps: 2-3 minuts.

```bash
# Flux normal
cd ~/Projects/topemporda
git add .
git commit -m "descripció del canvi"
git push

# Forçar redeploy sense canvis
git commit --allow-empty -m "redeploy: motiu"
git push
```

**Cache del Sheet:** `revalidate: 3600` (1 hora). Forçar redeploy per actualitzacions urgents.

---

## 8. Gestió d'imatges (Cloudinary)

Estructura de carpetes a Cloudinary:

```
topemporda/
  guies/      → imatges de portada de guies (1200×675px, 16:9)
  pobles/     → fotos dels pobles hero (1600×900px, 16:9)
  negocis/    → fotos de negocis (800×600px, 4:3)
  badges/     → fitxers SVG/PNG de badges
```

> ⚠️ No allotjar imatges de Google Maps/Places. URLs expiren i els termes no ho permeten.

---

## 9. Legal i cookies

### Pàgines legals (cal crear)

| URL | Contingut |
|---|---|
| `/avis-legal` | LSSI-CE: titular Top Empordà (noindex) |
| `/politica-de-privacitat` | RGPD + LOPDGDD (noindex) |
| `/politica-de-cookies` | Explicació GA4, localStorage `te_cookies` (noindex) |

Copiar de TopCerdanya i substituir: "Top Cerdanya" → "Top Empordà", "topcerdanya.com" → "topemporda.com", "tc_cookies" → "te_cookies".

### Sistema de cookies

- Clau localStorage: `te_cookies` (diferent de `tc_cookies` de TopCerdanya)
- `te_cookies = 'acceptat'` → GA4 s'injecta
- `te_cookies = 'rebutjat'` → GA4 no es carrega

---

## 10. Diagnòstic d'errors freqüents

Mateixos errors que TopCerdanya. Consultar `MANTENIMENT.md` de TopCerdanya per detalls. Resumidament:

| Error | Causa | Solució |
|---|---|---|
| Application error client-side | Valoració numèrica corrupta | `python3 fix-valoracions.py` |
| Pàgina no s'actualitza | Cache del Sheet | Redeploy buit |
| Guia nova → 404 | Slug .md ≠ slug del Sheet | Revisar nomenclatura |
| H1 duplicat | `# Títol` a la primera línia del .md | Eliminar-lo |
| Build fail: metadata + use client | Incompatibles | Separar en Server + Client component |

---

## 11. Resum de comandes habituals

```bash
# ── Publicar canvis ───────────────────────────────────
cd ~/Projects/topemporda
git add . && git commit -m "descripció" && git push

# ── Forçar actualització ──────────────────────────────
git commit --allow-empty -m "redeploy" && git push

# ── Sincronitzar directori ────────────────────────────
python3 ~/Projects/sync-negocis-emporda.py
cd ~/Projects/topemporda
git add data/negocis.json && git commit -m "data: directori" && git push

# ── Nova guia (flux complet) ──────────────────────────
# 1. Crear content/guies/slug.md
# 2. Afegir fila al Sheet (slug, titol, meta, categoria, estat=publicat)
# 3. Pujar imatge a Cloudinary → posar URL al Sheet
git add content/guies/slug.md && git commit -m "feat: guia slug" && git push

# ── Nou poble (flux complet) ──────────────────────────
# 1. Crear els 7 fitxers content/pobles/slug*.md
# 2. Afegir fila al Sheet tab Pobles
git add content/pobles/ && git commit -m "feat: poble slug" && git push
```

---

## 12. Estructura del projecte

```
topemporda/
├── app/
│   ├── page.js                          ← Home
│   ├── layout.js                        ← Layout global (Navbar, Footer, CookieBanner)
│   ├── globals.css                      ← Estils globals
│   ├── guies/
│   │   ├── page.js                      ← Hub de guies (/guies)
│   │   └── [slug]/page.js               ← Guia individual
│   ├── pobles/
│   │   ├── page.js                      ← Hub de pobles (/pobles)
│   │   ├── [slug]/page.js               ← Megapilar del poble
│   │   └── [slug]/[subtema]/page.js     ← Subpàgines (que-fer, restaurants...)
│   ├── badge/
│   │   ├── page.js
│   │   └── verificat/[slug]/page.js
│   ├── directori/page.js                ← Directori ('use client')
│   ├── inmobiliaria/page.js             ← Subhome immobiliària
│   ├── noticies/
│   ├── avis-legal/page.js
│   ├── politica-de-privacitat/page.js
│   ├── politica-de-cookies/page.js
│   ├── not-found.js                     ← 404 personalitzada
│   └── sitemap.js                       ← Sitemap dinàmic
├── components/
│   ├── Navbar.js                        ← Capçalera (coords Figueres, texts Empordà)
│   └── CookieBanner.js                  ← Banner GDPR (clau: te_cookies)
├── content/
│   ├── guies/                           ← Fitxers .md de les guies
│   └── pobles/                          ← Fitxers .md dels pobles i subpàgines
├── data/
│   └── negocis.json                     ← Directori (sincronitzat des del Sheet)
└── lib/
    └── sheets.js                        ← Connexió al Google Sheet (revalidate: 3600)
```

### Google Sheet — tabs i camps principals

| Tab | Camps clau |
|---|---|
| `Guies` | id, slug, titol, meta_description, categoria, posicio_home, destacada, estat, data_publicacio, imatge |
| `Noticies` | id, titol, resum, cat, autor, data, min, imatge |
| `Negocis` | id, nom, categoria, poble, descripcio, telefon, web, valoracio, ressenyes, tags, destacat |
| `Pobles` | id, slug, titol, meta_description, imatge |
| `Badges` | slug, nom, poble, categoria, tipus, actiu, data_inici, data_fi |

---

*Document creat el 19/03/2026 · Top Empordà*  
*Clonat i adaptat de Top Cerdanya (topcerdanya.com)*
