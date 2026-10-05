import { resolvePublicImage } from '../data/siteContent';

const JS_DELIVR = 'https://cdn.jsdelivr.net/gh/ValentynPi/pidlypna-art@main/public';
const GITHUB_RAW =
  'https://raw.githubusercontent.com/ValentynPi/pidlypna-art/main/public';

function storageRel(path: string): string {
  const clean = path.split('?')[0] ?? path;
  return clean.startsWith('/images/') ? clean : `/images/${clean.replace(/^\/+/, '')}`;
}

/** Ordered URLs to try for admin thumbnails (new uploads appear before Pages deploy). */
export function editorImageCandidates(path: string | undefined): string[] {
  if (!path?.trim()) return [];
  if (path.startsWith('blob:') || path.startsWith('data:')) return [path];
  let rel: string;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const match = path.match(/\/images\/[^?#]+/);
    if (!match) return [path];
    rel = match[0];
  } else {
    rel = storageRel(path);
  }
  const unique = new Set<string>([
    `${JS_DELIVR}${rel}`,
    `${GITHUB_RAW}${rel}`,
    resolvePublicImage(path),
    resolvePublicImage(rel),
  ]);
  return [...unique];
}

export function editorImageUrl(path: string | undefined): string | undefined {
  return editorImageCandidates(path)[0];
}

export function editorImageUrlWithFallback(path: string | undefined): string | undefined {
  return editorImageUrl(path);
}
