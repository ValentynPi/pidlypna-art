import { resolvePublicImage } from '../data/siteContent';

const GITHUB_RAW =
  'https://raw.githubusercontent.com/ValentynPi/pidlypna-art/main/public';

/** Admin previews: GitHub raw works right after upload, before GitHub Pages deploy. */
export function editorImageUrl(path: string | undefined): string | undefined {
  if (!path?.trim()) return undefined;
  if (path.startsWith('blob:') || path.startsWith('data:')) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const match = path.match(/\/images\/[^?#]+/);
    if (match) return `${GITHUB_RAW}${match[0]}`;
    return path;
  }
  const clean = path.split('?')[0] ?? path;
  const rel = clean.startsWith('/images/') ? clean : `/images/${clean.replace(/^\/+/, '')}`;
  return `${GITHUB_RAW}${rel}`;
}

export function editorImageUrlWithFallback(path: string | undefined): string | undefined {
  return editorImageUrl(path) ?? (path ? resolvePublicImage(path) : undefined);
}
