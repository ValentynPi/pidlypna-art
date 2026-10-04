import { artworks } from '../data/artworks';
import { galleryCollections } from '../data/collections';
import { enrichCustomArtworksForSave } from './artworkEditorUtils';
import { cloneSiteContent, normalizeSiteContent } from '../data/siteContent';
import type { SiteContent } from '../data/siteContentTypes';
import { artworkDescriptions } from '../i18n/artworkDescriptions';
import { artworkTitles } from '../i18n/artworkTitles';
import type { Artwork } from '../types';

export function buildInitialSiteContent(): SiteContent {
  const base = cloneSiteContent();
  for (const lang of ['en', 'uk', 'es'] as const) {
    for (const [id, title] of Object.entries(artworkTitles[lang])) {
      if (!base.titles[lang][id]) base.titles[lang][id] = title;
    }
    for (const [id, description] of Object.entries(artworkDescriptions[lang])) {
      if (!base.descriptions[lang][id]) base.descriptions[lang][id] = description;
    }
  }
  for (const collection of galleryCollections) {
    if (base.galleryOrder[collection.id]?.length) continue;
    const ids = artworks
      .filter((a) => a.collectionId === collection.id)
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
      .map((a) => a.id);
    base.galleryOrder[collection.id] = ids;
  }
  return base;
}

export function parseSiteContentJson(json: string): SiteContent {
  try {
    return normalizeSiteContent(JSON.parse(json));
  } catch {
    return buildInitialSiteContent();
  }
}

export function mergeEditorContent(remote: SiteContent): SiteContent {
  const seed = buildInitialSiteContent();
  const merged: SiteContent = {
    version: remote.version ?? 1,
    titles: {
      en: { ...seed.titles.en, ...remote.titles.en },
      uk: { ...seed.titles.uk, ...remote.titles.uk },
      es: { ...seed.titles.es, ...remote.titles.es },
    },
    descriptions: {
      en: { ...seed.descriptions.en, ...remote.descriptions.en },
      uk: { ...seed.descriptions.uk, ...remote.descriptions.uk },
      es: { ...seed.descriptions.es, ...remote.descriptions.es },
    },
    galleryOrder: { ...seed.galleryOrder, ...remote.galleryOrder },
    artworks: { ...remote.artworks },
    customArtworks: remote.customArtworks ?? [],
    deletedArtworkIds: remote.deletedArtworkIds ?? [],
  };
  return prepareSiteContentForPublish(merged);
}

/** Normalize content before save so deleted works never reappear from gallery order. */
export function prepareSiteContentForPublish(content: SiteContent): SiteContent {
  const enriched = enrichCustomArtworksForSave(content);
  const deleted = new Set(enriched.deletedArtworkIds ?? []);
  const galleryOrder: SiteContent['galleryOrder'] = {};
  for (const [collectionId, ids] of Object.entries(enriched.galleryOrder ?? {})) {
    galleryOrder[collectionId] = (ids ?? []).filter((id) => !deleted.has(id));
  }
  const customArtworks = (enriched.customArtworks ?? []).filter((a) => !deleted.has(a.id));
  const deletedArtworkIds = [...deleted];
  return {
    ...enriched,
    galleryOrder,
    customArtworks,
    deletedArtworkIds,
  };
}

export function orderedArtworksForCollection(
  collectionId: string,
  content: SiteContent,
): Artwork[] {
  const order = content.galleryOrder[collectionId] ?? [];
  const byId = new Map(
    artworks.filter((a) => a.collectionId === collectionId).map((a) => [a.id, a]),
  );
  const list: Artwork[] = [];
  const seen = new Set<string>();
  const deleted = new Set(content.deletedArtworkIds ?? []);
  for (const id of order) {
    if (deleted.has(id)) continue;
    const art = byId.get(id);
    if (art) {
      list.push(art);
      seen.add(id);
    }
  }
  for (const art of byId.values()) {
    if (!seen.has(art.id) && !deleted.has(art.id)) list.push(art);
  }
  return list;
}

export function serializeSiteContent(content: SiteContent): string {
  return `${JSON.stringify(content, null, 2)}\n`;
}
