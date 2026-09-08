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

const MIXED_MEDIA_TEXTURE_IDS = new Set([
  'female-portraits-02',
  'female-portraits-03',
  'abstract-art-01',
  'abstract-art-02',
  'abstract-art-03',
  'abstract-art-06',
  'floral-collection-01',
  'floral-collection-03',
]);

const TRADITIONAL_BRUSH_IDS = new Set([
  'ukrainian-symbolism-01',
  'inspired-by-nature-01',
  'plain-air-collection-01',
  'plain-air-collection-02',
  'plain-air-collection-03',
  'plain-air-collection-04',
  'floral-collection-02',
]);

export function listingMedium(artwork: Artwork, t: TranslateFn): string {
  const materials = artwork.materials.toLowerCase();
  const surface = translateSurfaceOn(artwork.surface, t);
  if (
    artwork.id === 'female-portraits-02' ||
    artwork.id === 'female-portraits-03'
  ) {
    return t('lightbox.mediumMixed', { surface });
  }
  if (materials.includes('alcohol ink')) return t('lightbox.mediumAlcoholInk', { surface });
  if (materials.includes('gouache')) return t('lightbox.mediumGouache', { surface });
  if (materials.includes('metallic')) return t('lightbox.mediumMetallic', { surface });
  if (materials.includes('mixed')) return t('lightbox.mediumMixed', { surface });
  if (materials.includes('acrylic')) return t('lightbox.mediumAcrylic', { surface });
  return t('lightbox.mediumDefault', { surface });
}

const TECHNIQUE_KEYS: Record<string, string> = {
  'atmospheric abstract landscape': 'lightbox.techniqueAtmosphericLandscape',
  'abstract sunset landscape': 'lightbox.techniqueAbstractSunset',
  'abstract cityscape': 'lightbox.techniqueAbstractCityscape',
  'split-tone tree composition': 'lightbox.techniqueSplitToneTree',
  'textured abstract landscape': 'lightbox.techniqueTexturedLandscape',
  'gestural abstract': 'lightbox.techniqueGesturalAbstract',
  'abstract vertical composition': 'lightbox.techniqueAbstractVertical',
  'text affirmation seascape': 'lightbox.techniqueTextSeascape',
  'word and image composition': 'lightbox.techniqueWordImage',
  'text affirmation skyscape': 'lightbox.techniqueTextSkyscape',
  'text affirmation abstract': 'lightbox.techniqueTextAbstract',
  'fluid landscape': 'lightbox.techniqueFluidLandscape',
  'circular fluid composition': 'lightbox.techniqueCircularFluid',
  'fluid abstract': 'lightbox.techniqueFluidAbstract',
  'circular fluid landscape': 'lightbox.techniqueCircularFluidLandscape',
  'portrait with floral headpiece': 'lightbox.techniquePortraitFloral',
  'surrealist portrait': 'lightbox.techniqueSurrealistPortrait',
  'floral still life': 'lightbox.techniqueFloralStillLife',
  'textured floral still life': 'lightbox.techniqueTexturedFloralStillLife',
  'landscape study': 'lightbox.techniqueLandscapeStudy',
  'imaginative landscape': 'lightbox.techniqueImaginativeLandscape',
  'petrykivka decorative painting': 'lightbox.techniquePetrykivka',
  'mountain landscape': 'lightbox.techniqueMountainLandscape',
  'plein air landscape': 'lightbox.techniquePleinAir',
  'expressive color portrait': 'lightbox.techniqueExpressivePortrait',
  'textured diptych': 'lightbox.techniqueTexturedDiptych',
  'textured abstract composition': 'lightbox.techniqueTexturedAbstract',
  'textured still life': 'lightbox.techniqueTexturedStillLife',
  'portrait with folk embroidery motifs': 'lightbox.techniquePortraitEmbroidery',
};

export function listingTechniqueLabel(artwork: Artwork, t: TranslateFn): string {
  if (MIXED_MEDIA_TEXTURE_IDS.has(artwork.id)) {
    return t('lightbox.techniqueMixedMediaTexture');
  }
  if (
    TRADITIONAL_BRUSH_IDS.has(artwork.id) ||
    artwork.collectionId === 'plain-air-collection'
  ) {
    return t('lightbox.techniqueTraditionalBrush');
  }
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

  const techniqueKey = TECHNIQUE_KEYS[artwork.technique.trim().toLowerCase()];
  if (techniqueKey) return t(techniqueKey);

  return artwork.technique;
}

export function listingMaterialsFull(artwork: Artwork, t: TranslateFn): string {
  const materials = artwork.materials.toLowerCase();
  const surface = translateSurface(artwork.surface, t);

  if (artwork.id === 'female-portraits-01' || artwork.title === 'Blooming Silence') {
    return t('lightbox.materialsFloralCrown');
  }
  if (artwork.id === 'ukrainian-symbolism-01') {
    return t('lightbox.materialsHeritage');
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
  if (
    artwork.collectionId === 'petrykivka' ||
    artwork.collectionId === 'plain-air-collection' ||
    artwork.id === 'inspired-by-nature-01' ||
    artwork.id === 'abstract-art-06' ||
    artwork.id === 'pop-art-01' ||
    artwork.id === 'pop-art-02' ||
    TRADITIONAL_BRUSH_IDS.has(artwork.id) ||
    MIXED_MEDIA_TEXTURE_IDS.has(artwork.id)
  ) {
    return t('lightbox.materialsAcrylicNoPaste');
  }
  return t('lightbox.materialsDefault');
}

export function listingDescription(
  artwork: Artwork,
  language: Language = 'en',
): string {
  let desc = getArtworkDescription(artwork.id, language, artwork.description);
  const localized = getArtworkTitle(artwork.id, language, artwork.title);
  const english = getArtworkTitle(artwork.id, 'en', artwork.title);

  // Descriptions often open with the English title — swap it for the localized name.
  if (language !== 'en' && localized !== english && desc.startsWith(english)) {
    desc = localized + desc.slice(english.length);
  }

  // Title is already the lightbox heading — don't repeat it in the body.
  desc = stripLeadingTitle(desc, localized);
  if (localized !== english) {
    desc = stripLeadingTitle(desc, english);
  }
  return desc;
}

/** Remove a leading artwork title (and common separators / linking verbs). */
function stripLeadingTitle(desc: string, title: string): string {
  if (!title || !desc.startsWith(title)) return desc;
  let rest = desc.slice(title.length).trimStart();
  rest = rest.replace(/^(?:—|–|-|:|\.)\s*/u, '');
  rest = rest.replace(/^(?:is|es)\s+/i, '');
  rest = rest.trimStart();
  if (!rest) return desc;
  return rest.charAt(0).toUpperCase() + rest.slice(1);
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
