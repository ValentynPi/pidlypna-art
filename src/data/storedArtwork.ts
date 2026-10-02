import type { Artwork } from '../types';
import type { SiteContent, StoredArtwork } from './siteContentTypes';
import { resolvePublicImage } from './siteContent';

export function storedToArtwork(stored: StoredArtwork): Artwork {
  const image = stored.image ? resolvePublicImage(stored.image) : '';
  return {
    ...stored,
    image,
    images: stored.images?.map((img) => ({
      src: resolvePublicImage(img.src),
      alt: img.alt,
    })),
  };
}

export function getStoredArtworks(content: SiteContent): StoredArtwork[] {
  return content.customArtworks ?? [];
}

export function nextArtworkId(collectionId: string, content: SiteContent, builtInIds: string[]): string {
  const prefix = `${collectionId}-`;
  const allIds = [
    ...builtInIds.filter((id) => id.startsWith(prefix) || id.startsWith(collectionId)),
    ...getStoredArtworks(content).map((a) => a.id),
  ];
  let max = 0;
  for (const id of allIds) {
    const match = id.match(/-(\d+)$/);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `${collectionId}-${String(max + 1).padStart(2, '0')}`;
}

export function defaultStoredArtwork(id: string, collectionId: string): StoredArtwork {
  const technique =
    collectionId === 'petrykivka'
      ? 'Petrykivka decorative painting'
      : collectionId === 'alcohol-ink-art'
        ? 'Fluid abstract'
        : 'Mixed media';
  return {
    id,
    collectionId,
    title: 'New artwork',
    year: new Date().getFullYear(),
    dimensions: 'Contact for dimensions',
    materials: 'Acrylic',
    technique,
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description: '',
    image: '',
    imageAlt: 'New artwork',
  };
}
