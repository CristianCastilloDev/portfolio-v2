/** Prefija rutas internas con el base de despliegue (p. ej. GitHub Pages). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}

/** Ruta relativa al sitio, sin el base de despliegue. */
export function sitePath(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') return pathname;
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length) || '/';
  }
  return pathname;
}
