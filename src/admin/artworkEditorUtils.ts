import type { ArtworkContentPatch } from '../data/siteContentTypes';
import type { SiteContent } from '../data/siteContentTypes';

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

export function updateArtworkPatch(
  content: SiteContent,
  id: string,
  patch: Partial<ArtworkContentPatch>,
): SiteContent {
  return {
    ...content,
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
  return {
    ...content,
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
  return {
    ...content,
    descriptions: {
      ...content.descriptions,
      [lang]: { ...content.descriptions[lang], [id]: value },
    },
  };
}
