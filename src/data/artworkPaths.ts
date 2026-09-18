import type { Artwork } from '../types';
import { artworks, getArtworksByCollection } from './artworks';
import { collections, getCollectionById } from './collections';

export const SITE_URL = 'https://viktoria-p.art';

export function slugifyTitle(title: string): string {
  return title
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getArtworkSlug(artwork: Artwork): string {
  return slugifyTitle(artwork.title) || artwork.id;
}

export function getArtworkPath(artwork: Artwork): string {
  const collection = getCollectionById(artwork.collectionId);
  const collectionSlug = collection?.slug ?? artwork.collectionId;
  return `/gallery/${collectionSlug}/${getArtworkSlug(artwork)}`;
}

export function getArtworkBySlug(
  collectionSlug: string,
  artworkSlug: string,
): Artwork | undefined {
  const collection = collections.find(
    (item) => item.slug === collectionSlug || item.id === collectionSlug,
  );
  if (!collection) return undefined;
  return getArtworksByCollection(collection.id).find(
    (artwork) => getArtworkSlug(artwork) === artworkSlug || artwork.id === artworkSlug,
  );
}

export function getAllArtworkPaths(): string[] {
  return artworks.map(getArtworkPath);
}
