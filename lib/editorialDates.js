// Dates editorials, mai dates del rellotge o del checkout del servidor.
export function editorialDate(value) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const raw = value.trim();
  const local = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const iso = local
    ? `${local[3]}-${local[2].padStart(2, '0')}-${local[1].padStart(2, '0')}`
    : raw;
  if (!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(iso)) return undefined;
  const day = iso.slice(0, 10);
  const date = new Date(`${day}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== day) return undefined;
  if (Number.isNaN(new Date(iso).getTime())) return undefined;
  return day;
}

export function editorialLastModified(item) {
  return editorialDate(item.data_modificacio) || editorialDate(item.data_publicacio);
}
