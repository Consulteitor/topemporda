# Cache de baix manteniment

Top Empordà té poc tràfic i molt poques edicions. El directori, guies, pobles i la selecció immobiliària passen de 48 hores a 7 dies (604800 segons). La portada conserva 48 hores perquè també llegeix notícies. Agenda, notícies i badges mantenen les 48 hores anteriors.

Les fitxes de negoci es generen en la primera visita i queden en ISR durant 7 dies. `generateStaticParams` retorna una llista buida: ja no es preparen més de mil fitxes a cada desplegament. Les URLs continuen existint i les desconegudes conserven el 404; la primera visita a una fitxa vàlida pot ser més lenta. No es desindexen negocis ni es bloquegen cercadors.

El sitemap comparteix les lectures setmanals de Guies/Negocis. `lastModified` només deriva de `data_modificacio` o `data_publicacio` vàlides; s'omet si no es coneix. Ni el rellotge ni els mtimes del checkout són dates editorials. Es conserven les URLs, prioritats i exclusions existents i s'ordenen els fitxers markdown per estabilitat.

## Quan es modifica contingut

Les edicions del full no tenen webhook d'invalidació en aquest projecte. Després de la caducitat, una visita provoca revalidació en segon pla; pot veure inicialment la còpia anterior. Set dies és l'interval de revalidació, no una garantia exacta de publicació. Per a una correcció urgent, invalidar la Data Cache i les rutes afectades des de Vercel i verificar el resultat. Un desplegament sol no garanteix buidar la Data Cache.

El contingut markdown del repositori requereix desplegament, com abans. No s'han afegit crons ni canviat la gestió editorial, l'agenda fixa antiga de portada o l'autenticació.

## Verificació

`node --test tests/cache-policy.test.mjs` comprova dates vàlides/impossibles, sitemap invariant amb dies diferents, exclusió d'esborranys i caducitats diferenciades. La compilació i una visita real a una fitxa generada sota demanda comproven el funcionament de Next.js.

L'auditoria del 7 octubre observava 70255 unitats ISR (28,9% del compte); són unitats de 8 KB, no 70255 regeneracions. La mostra recent i el codi són compatibles amb regeneracions temporals d'un directori gran, però no atribueixen tot el consum mensual a una causa única. La reducció real requereix comparar ISR Writes després de publicar durant almenys una setmana amb tràfic comparable; no es promet un percentatge.
