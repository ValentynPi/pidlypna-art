import { galleryCollections } from '../data/collections';
import { getArtworksByCollection } from '../data/artworks';
import { getArtworkPath } from '../data/artworkPaths';
import { SITE_URL } from './config';

const STATIC_PATHS = [
  '/',
  '/about',
  '/gallery',
  '/charity',
  '/exhibitions',
  '/press',
  '/journey',
  '/contact',
];

export function collectPublicPaths(): string[] {
  const paths = new Set<string>(STATIC_PATHS);

  for (const collection of galleryCollections) {
    paths.add(`/gallery/${collection.slug}`);
    for (const artwork of getArtworksByCollection(collection.id)) {
      paths.add(getArtworkPath(artwork));
    }
  }

  return [...paths].sort((a, b) => a.localeCompare(b));
}

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  const base = SITE_URL.replace(/\/$/, '');
  const urls = collectPublicPaths()
    .map(
      (path) =>
        `  <url><loc>${base}${path === '/' ? '/' : path}</loc><lastmod>${lastmod}</lastmod></url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
