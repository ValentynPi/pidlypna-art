import type { Artwork } from '../types';
import { listingHeight, listingWidth } from './artworks';
import { getArtworkDescription } from '../i18n/artworkDescriptions';
import { getArtworkTitle } from '../i18n/artworkTitles';
import type { Language } from '../i18n/types';

export type TranslateFn = (path: string, params?: Record<string, string>) => string;

function translateSurface(surface: string, t: TranslateFn): string {
  const key = surface.trim().toLowerCase();
  if (key === 'canvas') return t('lightbox.surfaceCanvas');
  if (key === 'paper') return t('lightbox.surfacePaper');
  if (key === 'wood') return t('lightbox.surfaceWood');
  return surface.toLowerCase();
}

function translateSurfaceOn(surface: string, t: TranslateFn): string {
  const key = surface.trim().toLowerCase();
  if (key === 'canvas') return t('lightbox.surfaceOnCanvas');
  if (key === 'paper') return t('lightbox.surfaceOnPaper');
  if (key === 'wood') return t('lightbox.surfaceOnWood');
  return surface.toLowerCase();
}

export function madeToOrderText(
  artwork: Artwork,
  t: TranslateFn,
  language: Language = 'en',
): string {
  if (artwork.availability === 'Sold') {
    return t('lightbox.madeToOrderSold', {
      title: getArtworkTitle(artwork.id, language, artwork.title),
    });
  }
  return t('lightbox.madeToOrderAvailable');
}

export function listingMedium(artwork: Artwork, t: TranslateFn): string {
  const materials = artwork.materials.toLowerCase();
  const surface = translateSurfaceOn(artwork.surface, t);
  if (materials.includes('alcohol ink')) return t('lightbox.mediumAlcoholInk', { surface });
  if (materials.includes('gouache')) return t('lightbox.mediumGouache', { surface });
  if (materials.includes('metallic')) return t('lightbox.mediumMetallic', { surface });
  if (materials.includes('mixed')) return t('lightbox.mediumMixed', { surface });
  if (materials.includes('acrylic')) return t('lightbox.mediumAcrylic', { surface });
  return t('lightbox.mediumDefault', { surface });
}

export function listingTechniqueLabel(artwork: Artwork, t: TranslateFn): string {
  if (artwork.technique.trim().toLowerCase() === 'textured abstract landscape') {
    return t('lightbox.techniqueTexturedLandscape');
  }
  if (artwork.collectionId === 'petrykivka') return t('lightbox.techniquePetrykivka');
  if (artwork.collectionId === 'alcohol-ink-art') return t('lightbox.techniqueFluidInk');
  if (artwork.collectionId === 'affirmation-collection') {
    return t('lightbox.techniqueHandLettered');
  }
  if (
    artwork.collectionId === 'textured-and-light' ||
    artwork.collectionId === 'female-portraits' ||
    artwork.materials.toLowerCase().includes('impasto')
  ) {
    return t('lightbox.techniqueImpasto');
  }
  if (artwork.materials.toLowerCase().includes('acrylic')) {
    return t('lightbox.techniqueImpasto');
  }
  return artwork.technique;
}

export function listingMaterialsFull(artwork: Artwork, t: TranslateFn): string {
  const materials = artwork.materials.toLowerCase();
  const surface = translateSurface(artwork.surface, t);

  if (artwork.id === 'female-portraits-01' || artwork.title === 'Blooming Silence') {
    return t('lightbox.materialsFloralCrown');
  }
  if (materials.includes('alcohol ink')) {
    return t('lightbox.materialsAlcoholInk', { surface });
  }
  if (materials.includes('gouache') && artwork.surface.toLowerCase() === 'paper') {
    return t('lightbox.materialsGouachePaper');
  }
  if (materials.includes('gouache')) {
    return t('lightbox.materialsGouache');
  }
  if (materials.includes('metallic')) {
    return t('lightbox.materialsMetallic');
  }
  return t('lightbox.materialsDefault');
}

export function listingDescription(
  artwork: Artwork,
  language: Language = 'en',
): string {
  const desc = getArtworkDescription(artwork.id, language, artwork.description);
  if (language === 'en') return desc;

  const localized = getArtworkTitle(artwork.id, language, artwork.title);
  const english = getArtworkTitle(artwork.id, 'en', artwork.title);
  if (localized === english) return desc;

  // Descriptions often open with the English title — swap it for the localized name.
  if (desc.startsWith(english)) {
    return localized + desc.slice(english.length);
  }
  return desc;
}

function formatDimension(raw: string, t: TranslateFn): string {
  if (raw === 'Contact') return t('lightbox.contactValue');
  const match = raw.match(/^([\d.]+)\s*inches$/i);
  if (match) return t('lightbox.inches', { value: match[1] });
  return raw;
}

export function listingDetails(
  artwork: Artwork,
  t: TranslateFn,
  language: Language = 'en',
) {
  return [
    {
      labelKey: 'lightbox.name',
      value: getArtworkTitle(artwork.id, language, artwork.title),
    },
    { labelKey: 'lightbox.medium', value: listingMedium(artwork, t) },
    { labelKey: 'lightbox.technique', value: listingTechniqueLabel(artwork, t) },
    { labelKey: 'lightbox.authenticity', value: t('lightbox.authenticityValue') },
    {
      labelKey: 'lightbox.certification',
      value: artwork.certificateOfAuthenticity
        ? t('lightbox.certificationValue')
        : t('lightbox.signedValue'),
    },
    { labelKey: 'lightbox.materials', value: listingMaterialsFull(artwork, t) },
    {
      labelKey: 'lightbox.width',
      value: formatDimension(listingWidth(artwork), t),
    },
    {
      labelKey: 'lightbox.height',
      value: formatDimension(listingHeight(artwork), t),
    },
  ];
}
