import { artworks } from '../data/artworks';
import type {
  ArtworkContentPatch,
  ListingDetailKey,
  SiteContent,
  StoredArtwork,
} from '../data/siteContentTypes';
import type { Language } from '../i18n/types';
import { defaultStoredArtwork, nextArtworkId } from '../data/storedArtwork';
import type { Artwork, ArtworkImage } from '../types';

/** Store paths like `/images/foo.jpg` in site-content.json. */
export function toStorageImagePath(src: string): string {
  if (!src) return '';
  const withoutQuery = src.split('?')[0] ?? src;
  if (withoutQuery.startsWith('/images/')) return withoutQuery;
  try {
    const parsed = new URL(withoutQuery, 'https://viktoria-p.art');
    const path = parsed.pathname;
    if (path.includes('/images/')) {
      return path.slice(path.indexOf('/images/'));
    }
    return path;
  } catch {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    if (base && withoutQuery.startsWith(base)) {
      return withoutQuery.slice(base.length) || withoutQuery;
    }
    return withoutQuery;
  }
}

export interface EditorPhotoSet {
  cover: string;
  extras: ArtworkImage[];
}

export function getArtworkPhotosForEditor(
  artwork: Artwork,
  patch: ArtworkContentPatch,
): EditorPhotoSet {
  const cover = toStorageImagePath(patch.image ?? artwork.image);
  let extras: ArtworkImage[];
  if (patch.images !== undefined) {
    extras = patch.images.map((img) => ({
      src: toStorageImagePath(img.src),
      alt: img.alt,
    }));
  } else {
    extras = (artwork.images ?? []).map((img) => ({
      src: toStorageImagePath(img.src),
      alt: img.alt,
    }));
  }
  extras = extras.filter((img) => img.src && img.src !== cover);
  return { cover, extras };
}

export function buildPhotoPatch(cover: string, extras: ArtworkImage[]): Partial<ArtworkContentPatch> {
  const normalizedExtras = extras
    .map((img) => ({ src: toStorageImagePath(img.src), alt: img.alt.trim() || 'Detail' }))
    .filter((img) => img.src && img.src !== cover);
  return {
    image: cover || undefined,
    images: normalizedExtras.length > 0 ? normalizedExtras : [],
  };
}

export function patchFor(
  artworks: Record<string, ArtworkContentPatch>,
  id: string,
): ArtworkContentPatch {
  return artworks[id] ?? {};
}

export function updateGalleryOrder(
  content: SiteContent,
  collectionId: string,
  nextIds: string[],
): SiteContent {
  return {
    ...content,
    galleryOrder: { ...content.galleryOrder, [collectionId]: nextIds },
  };
}

function syncStoredArtwork(
  stored: StoredArtwork,
  patch: Partial<ArtworkContentPatch>,
  enTitle?: string,
): StoredArtwork {
  const next = { ...stored };
  if (patch.image !== undefined) next.image = patch.image;
  if (patch.imageAlt) next.imageAlt = patch.imageAlt;
  if (patch.images !== undefined) next.images = patch.images;
  if (patch.dimensions) next.dimensions = patch.dimensions;
  if (patch.availability) next.availability = patch.availability;
  if (patch.title) next.title = patch.title;
  if (enTitle?.trim()) next.title = enTitle.trim();
  if (patch.sizeCm) {
    next.dimensions = `${patch.sizeCm.width} × ${patch.sizeCm.height} cm`;
  }
  if (patch.materials) next.materials = patch.materials;
  if (patch.technique) next.technique = patch.technique;
  if (patch.surface) next.surface = patch.surface;
  return next;
}

export function updateArtworkListingField(
  content: SiteContent,
  id: string,
  key: ListingDetailKey,
  lang: Language,
  value: string,
): SiteContent {
  const prev = patchFor(content.artworks, id);
  const listing = { ...prev.listing };
  const row = { ...listing[key], [lang]: value };
  if (!value.trim()) {
    delete row[lang];
  }
  if (Object.keys(row).length > 0) {
    listing[key] = row;
  } else {
    delete listing[key];
  }
  const prevPatch = patchFor(content.artworks, id);
  const nextPatch: ArtworkContentPatch = { ...prevPatch, listing };
  if (Object.keys(listing).length === 0) {
    delete nextPatch.listing;
  }
  return {
    ...content,
    artworks: { ...content.artworks, [id]: nextPatch },
  };
}

export function updateArtworkPatch(
  content: SiteContent,
  id: string,
  patch: Partial<ArtworkContentPatch>,
): SiteContent {
  const customArtworks = [...(content.customArtworks ?? [])];
  const index = customArtworks.findIndex((a) => a.id === id);
  if (index >= 0) {
    customArtworks[index] = syncStoredArtwork(customArtworks[index]!, patch);
  }
  return {
    ...content,
    customArtworks,
    artworks: {
      ...content.artworks,
      [id]: { ...patchFor(content.artworks, id), ...patch },
    },
  };
}

export function updateArtworkTitle(
  content: SiteContent,
  id: string,
  lang: 'en' | 'uk' | 'es',
  value: string,
): SiteContent {
  let customArtworks = content.customArtworks ?? [];
  if (lang === 'en') {
    customArtworks = customArtworks.map((a) =>
      a.id === id ? { ...a, title: value.trim() || a.title } : a,
    );
  }
  return {
    ...content,
    customArtworks,
    titles: {
      ...content.titles,
      [lang]: { ...content.titles[lang], [id]: value },
    },
  };
}

export function updateArtworkDescription(
  content: SiteContent,
  id: string,
  lang: 'en' | 'uk' | 'es',
  value: string,
): SiteContent {
  let customArtworks = content.customArtworks ?? [];
  if (lang === 'en') {
    customArtworks = customArtworks.map((a) =>
      a.id === id ? { ...a, description: value } : a,
    );
  }
  return {
    ...content,
    customArtworks,
    descriptions: {
      ...content.descriptions,
      [lang]: { ...content.descriptions[lang], [id]: value },
    },
  };
}

export function isCustomArtwork(content: SiteContent, id: string): boolean {
  return (content.customArtworks ?? []).some((a) => a.id === id);
}

/** Merge CMS patches into customArtworks before writing site-content.json. */
export function enrichCustomArtworksForSave(content: SiteContent): SiteContent {
  const customArtworks = (content.customArtworks ?? []).map((stored) => {
    const synced = syncStoredArtwork(
      stored,
      patchFor(content.artworks, stored.id),
      content.titles.en[stored.id],
    );
    const description = content.descriptions.en[stored.id]?.trim();
    return description ? { ...synced, description } : synced;
  });
  return { ...content, customArtworks };
}

export function addArtworkToCollection(content: SiteContent, collectionId: string): SiteContent {
  const id = nextArtworkId(
    collectionId,
    content,
    artworks.map((a) => a.id),
  );
  const stored = defaultStoredArtwork(id, collectionId);
  const order = [...(content.galleryOrder[collectionId] ?? []), id];
  return {
    ...content,
    customArtworks: [...(content.customArtworks ?? []), stored],
    galleryOrder: { ...content.galleryOrder, [collectionId]: order },
    titles: {
      en: { ...content.titles.en, [id]: stored.title },
      uk: { ...content.titles.uk, [id]: '' },
      es: { ...content.titles.es, [id]: '' },
    },
    descriptions: {
      en: { ...content.descriptions.en, [id]: '' },
      uk: { ...content.descriptions.uk, [id]: '' },
      es: { ...content.descriptions.es, [id]: '' },
    },
  };
}

function withoutId<T extends Record<string, string>>(map: T, id: string): T {
  const next = { ...map };
  delete next[id as keyof T];
  return next;
}

export function removeArtworkFromSite(
  content: SiteContent,
  id: string,
  collectionId: string,
): SiteContent {
  const isCustom = isCustomArtwork(content, id);
  const artworksPatch = { ...content.artworks };
  delete artworksPatch[id];

  return {
    ...content,
    customArtworks: isCustom
      ? (content.customArtworks ?? []).filter((a) => a.id !== id)
      : (content.customArtworks ?? []),
    deletedArtworkIds: isCustom
      ? (content.deletedArtworkIds ?? [])
      : [...new Set([...(content.deletedArtworkIds ?? []), id])],
    galleryOrder: {
      ...content.galleryOrder,
      [collectionId]: (content.galleryOrder[collectionId] ?? []).filter((x) => x !== id),
    },
    artworks: artworksPatch,
    titles: {
      en: withoutId(content.titles.en, id),
      uk: withoutId(content.titles.uk, id),
      es: withoutId(content.titles.es, id),
    },
    descriptions: {
      en: withoutId(content.descriptions.en, id),
      uk: withoutId(content.descriptions.uk, id),
      es: withoutId(content.descriptions.es, id),
    },
  };
}
