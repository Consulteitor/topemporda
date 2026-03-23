# TopEmpordà — Guia de Setup

_Com passar de zero a topemporda.com en producció._

---

## Prerequisits

- Repositori de TopCerdanya accessible (referència de codi)
- Compte Vercel
- Compte Google (per Sheet + Apps Script + Analytics)
- Compte Cloudinary
- Domini `topemporda.com` registrat (o alternatiu)

---

## Pas 1 — Clonar i desconnectar

```bash
cd ~/Projects
git clone https://github.com/Consulteitor/topcerdanya.git topemporda
cd topemporda
rm -rf .git
git init
git remote add origin https://github.com/[usuari]/topemporda.git
```

---

## Pas 2 — Copiar fitxers adaptats

Des de `top-emporda/06_codi/` (on és aquest fitxer):

```bash
CODI=~/top-emporda/06_codi
REPO=~/Projects/topemporda

cp $CODI/Navbar.js       $REPO/components/Navbar.js
cp $CODI/CookieBanner.js $REPO/components/CookieBanner.js
cp $CODI/layout.js       $REPO/app/layout.js
cp $CODI/globals.css     $REPO/app/globals.css
cp $CODI/sitemap.js      $REPO/app/sitemap.js
cp $CODI/next.config.ts  $REPO/next.config.ts
```

---

## Pas 3 — Cerca global i substitució al repo

Obrir el repo al VSCode i fer Cmd+Shift+H (cerca i substitueix a tots els fitxers):

| Cerca | Substitueix | Notes |
|---|---|---|
| `topcerdanya.com` | `topemporda.com` | URLs canòniques, metadata |
| `Top Cerdanya` | `Top Empordà` | Títols, textos visibles |
| `TopCerdanya` | `TopEmpordà` | Variables, comentaris |
| `top-cerdanya` | `top-emporda` | Slugs, noms de classe |
| `G-QY8PYQMKHR` | `G-XXXXXXXXXX` | ← Substituir pel GA4 real |
| `tc_cookies` | `te_cookies` | localStorage key |
| `info@topcerdanya.com` | `info@topemporda.com` | Footer |
| `La Cerdanya` | `l'Empordà` | Textos descriptius |
| `la Cerdanya` | `l'Empordà` | Textos descriptius |
| `el Pirineu` | `l'Empordà` | Footer i textos |
| `al Pirineu` | `a l'Empordà` | Footer |

### Fitxers que cal reescriure manualment (no sols cerca/substitueix)

Aquests fitxers contenen textos molt específics de la Cerdanya que no es poden substituir mecànicament:

| Fitxer | Què cal canviar |
|---|---|
| `app/page.js` | Textos de la home: intro comarca, pobles destacats, guies home |
| `app/pobles/page.js` | Llista de pobles (Puigcerdà → Figueres, Bellver → Cadaqués, etc.) |
| `app/inmobiliaria/page.js` | Intro mercat immobiliari: Cerdanya → Empordà |
| `app/not-found.js` | 4 targetes de contingut suggerit (links a guies Cerdanya → Empordà) |
| `app/guies/page.js` | Hub de guies: intro i categories |
| `app/directori/page.js` | Intro directori |

---

## Pas 4 — Crear Google Sheet

1. Anar a [sheets.google.com](https://sheets.google.com) → Crear nou Sheet
2. Reanomenar: "TopEmpordà — Base de dades"
3. Crear els tabs (pestanyes):
   - `Guies`
   - `Noticies`
   - `Negocis`
   - `Pobles`
   - `Badges`

4. A cada tab, crear la primera fila de capçaleres:

**Tab Guies:**
```
id | slug | titol | meta_description | categoria | posicio_home | destacada | estat | data_publicacio | imatge
```

**Tab Noticies:**
```
id | titol | resum | cat | autor | data | min | imatge
```

**Tab Negocis:**
```
id | nom | categoria | poble | descripcio | telefon | web | valoracio | ressenyes | tags | destacat
```

**Tab Pobles:**
```
id | slug | titol | meta_description | imatge
```

**Tab Badges:**
```
slug | nom | poble | categoria | tipus | actiu | data_inici | data_fi
```

5. Copiar l'Apps Script de TopCerdanya → Extensions → Apps Script
6. Actualitzar el nom del Sheet a l'script si cal
7. Publicar com a Web App → "Qualsevol persona"
8. Copiar la URL resultant
9. Enganxar la URL a `lib/sheets.js` (substituint la de TopCerdanya)

---

## Pas 5 — Crear propietat GA4

1. [analytics.google.com](https://analytics.google.com) → Crear propietat
2. Nom: "Top Empordà"
3. Zona horària: Europe/Madrid
4. Moneda: EUR
5. Crear → Flux de dades web → `topemporda.com`
6. Copiar l'ID de mesura (format `G-XXXXXXXXXX`)
7. Substituir `G-XXXXXXXXXX` a `app/layout.js`

---

## Pas 6 — Primer contingut (Pobles Fase 1)

Crear els fitxers `.md` buits de la Fase 1:

```bash
cd ~/Projects/topemporda

# Crear directoris si no existeixen
mkdir -p content/guies content/pobles

# Pobles Fase 1: 5 pobles × 7 fitxers = 35 fitxers
for POBLE in figueres cadaques begur peratallada roses; do
  touch content/pobles/${POBLE}.md
  touch content/pobles/${POBLE}-que-fer.md
  touch content/pobles/${POBLE}-restaurants.md
  touch content/pobles/${POBLE}-allotjament.md
  touch content/pobles/${POBLE}-immobiliaria.md
  touch content/pobles/${POBLE}-rutes.md
  touch content/pobles/${POBLE}-amb-nens.md
done

echo "Fitxers creats:"
ls content/pobles/
```

Afegir les files corresponents al Sheet tab `Pobles` per a cada poble.

---

## Pas 7 — Primer contingut (Guies urgents)

```bash
# Guia urgent: Setmana Santa
touch content/guies/setmana-santa-emporda-2026.md

# Guia general
touch content/guies/que-fer-a-lemporda-guia-practica-2026.md
```

Afegir files al Sheet tab `Guies` per a cada nova guia.

---

## Pas 8 — Deploy a Vercel

```bash
cd ~/Projects/topemporda
npm install
npm run build  # verificar que compila sense errors

git add .
git commit -m "feat: init topemporda"
git push

# Connectar a Vercel
vercel --prod
```

A Vercel:
1. Connectar el repositori GitHub
2. Framework: Next.js (autodetectat)
3. Configurar el domini `topemporda.com`

---

## Pas 9 — Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Afegir propietat: `topemporda.com`
3. Verificar via DNS o HTML tag
4. Enviar sitemap: `https://topemporda.com/sitemap.xml`

---

## Checklist final de llançament

- [ ] Repo clonat i adaptat (cerca global feta)
- [ ] Fitxers `06_codi/` copiats al repo
- [ ] Fitxers manuals reescrits (page.js, pobles/page.js, inmobiliaria/page.js, not-found.js)
- [ ] Google Sheet creat amb 5 tabs i capçaleres
- [ ] Apps Script configurat i publicat
- [ ] URL del Sheet actualitzada a `lib/sheets.js`
- [ ] GA4 creat i ID actualitzat a `layout.js`
- [ ] Domuni `topemporda.com` registrat
- [ ] Build local sense errors (`npm run build`)
- [ ] Deploy a Vercel
- [ ] Domini connectat a Vercel
- [ ] Search Console verificat i sitemap enviat
- [ ] Cloudinary configurat (carpetes: guies/, pobles/, negocis/, badges/)
- [ ] Pobles Fase 1 creats al Sheet (5 files)
- [ ] Primer contingut publicat (almenys guia Setmana Santa + pilar Figueres)
- [ ] Sol·licitar indexació a Search Console per a les primeres URLs

---

## Diferències tècniques vs TopCerdanya

| Element | TopCerdanya | TopEmpordà |
|---|---|---|
| Domini | topcerdanya.com | topemporda.com |
| GA4 ID | G-QY8PYQMKHR | G-XXXXXXXXXX *(nou)* |
| localStorage key | tc_cookies | te_cookies |
| Email contacte | info@topcerdanya.com | info@topemporda.com |
| Coords temps (Navbar) | 42.4317, 1.9317 (Puigcerdà) | 42.2669, 2.9603 (Figueres) |
| Referència ciutat temps | "Puigcerdà" | "Figueres" |
| Subtítol masthead | "El medi digital de la Cerdanya" | "El medi digital de l'Empordà" |
| Footer tagline | "Fet amb amor al Pirineu" | "Fet amb amor a l'Empordà" |
| Ticker notícies | Esquí, Llac de la Pera... | Anxoves, Camí de Ronda, Mercat... |
| Color accent CSS | #c8423a (vermell) | #1a5c8a (blau mediterrani) *(revisable)* |
| Pobles Fase 1 | Puigcerdà, Bellver, Llívia, Alp | Figueres, Cadaqués, Begur, Peratallada, Roses |

---

*Creat el 19/03/2026 · Sessió 3 TopEmpordà*
