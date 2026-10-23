import { DEFAULT_OG_IMAGE_PATH, SITE_URL } from './config';

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, '')}${normalized}`;
}

export function absoluteImageUrl(src: string | undefined): string | undefined {
  if (!src) return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const path = src.startsWith('/') ? src : `/${src}`;
  return absoluteUrl(path);
}

/** Meta descriptions longer than ~160 chars are often truncated in SERPs. */
export function truncateMetaDescription(text: string, maxLength = 158): string {
  const trimmed = text.replace(/\s+/g, ' ').trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}
