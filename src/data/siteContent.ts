import type { Artwork } from '../types';
import siteContentJson from './site-content.json';
import type { ArtworkContentPatch, ArtworkSizeCm, SiteContent } from './siteContentTypes';
import { EMPTY_SITE_CONTENT } from './siteContentTypes';

export const siteContent = siteContentJson as SiteContent;

export function mergeSiteContent(partial: Partial<SiteContent>): SiteContent {
  return {
    version: partial.version ?? siteContent.version ?? 1,
    titles: {
      en: { ...siteContent.titles.en, ...partial.titles?.en },
      uk: { ...siteContent.titles.uk, ...partial.titles?.uk },
      es: { ...siteContent.titles.es, ...partial.titles?.es },
    },
    galleryOrder: { ...siteContent.galleryOrder, ...partial.galleryOrder },
    artworks: { ...siteContent.artworks, ...partial.artworks },
  };
}

export function resolvePublicImage(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path.startsWith('/')) return `${base}${path}`;
  return `${base}/images/${path}`;
}

export function applyArtworkPatch(artwork: Artwork): Artwork {
  const patch = siteContent.artworks[artwork.id];
  if (!patch) return artwork;

  const next: Artwork = { ...artwork };
  if (patch.title) next.title = patch.title;
  if (patch.image) next.image = resolvePublicImage(patch.image);
  if (patch.imageAlt) next.imageAlt = patch.imageAlt;
  if (patch.images) {
    next.images = patch.images.map((img) => ({
      src: resolvePublicImage(img.src),
      alt: img.alt,
    }));
  }
  if (patch.dimensions) next.dimensions = patch.dimensions;
  if (patch.availability) next.availability = patch.availability;
  return next;
}

export function isArtworkHidden(artworkId: string): boolean {
  return siteContent.artworks[artworkId]?.hidden === true;
}

export function getGalleryOrder(collectionId: string): string[] | undefined {
  const order = siteContent.galleryOrder[collectionId];
  return order?.length ? order : undefined;
}

export function getArtworkSizeCmFromContent(artworkId: string): ArtworkSizeCm | undefined {
  return siteContent.artworks[artworkId]?.sizeCm;
}

export function getTitleFromContent(
  artworkId: string,
  language: keyof SiteContent['titles'],
): string | undefined {
  const value = siteContent.titles[language][artworkId];
  return value?.trim() ? value : undefined;
}

export function cloneSiteContent(): SiteContent {
  return structuredClone(siteContent);
}

export function normalizeSiteContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== 'object') return structuredClone(EMPTY_SITE_CONTENT);
  const data = raw as SiteContent;
  return {
    version: typeof data.version === 'number' ? data.version : 1,
    titles: {
      en: data.titles?.en ?? {},
      uk: data.titles?.uk ?? {},
      es: data.titles?.es ?? {},
    },
    galleryOrder: data.galleryOrder ?? {},
    artworks: data.artworks ?? {},
  };
}

export type { ArtworkContentPatch, SiteContent };
