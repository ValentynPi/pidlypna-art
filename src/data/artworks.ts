import { photos } from './images';
import type { Artwork, ArtworkImage } from '../types';

/** Shared buyer notes for international collectors */
export const SHIPPING_NOTE = 'Worldwide shipping available.';
export const CARE_INSTRUCTIONS =
  'Avoid direct sunlight and high humidity. Dust gently with a soft, dry cloth. Do not use liquid cleaners on the painted surface.';

export const artworks: Artwork[] = [
  {
    id: 'textured-01',
    title: 'Halo',
    year: 2025,
    dimensions: '2 × 50 × 70 cm',
    materials: 'Mixed media, metallic gold',
    technique: 'Textured diptych',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'A white and gold circle spanning two panels — one form, two breaths. Concentric textured lines build a halo that glows quietly against clean white space. The diptych format suggests connection across distance, a theme close to diaspora life. Standing before it, the eye completes the circle where the panels meet. Painted as a meditation on wholeness that can live in two places at once.',
    image: photos.texturedHalo3,
    imageAlt: 'White and gold textured circle diptych on easels',
    images: [
      { src: photos.texturedHalo3, alt: 'Halo — front view on easels' },
      { src: photos.texturedHalo1, alt: 'Halo — close detail of texture' },
      { src: photos.texturedHalo2, alt: 'Halo — angled view showing depth' },
    ],
    collectionId: 'textured-art',
    featured: true,
  },
  {
    id: 'textured-02',
    title: 'Gold Arcs',
    year: 2025,
    dimensions: '80 × 100 cm',
    materials: 'Mixed media, metallic gold',
    technique: 'Textured abstract composition',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'Minimal white space crossed by textured metallic gold arcs — a quiet architecture of light. Three curved forms anchor the corners and center, inviting the eye to travel slowly along each ridge. Inspired by morning reflections and the idea of a path that never quite closes. Viewers often describe calm elevation and presence. Created for spaces that value stillness and tactile beauty.',
    image: photos.texturedGoldArcs7,
    imageAlt: 'White canvas with three textured metallic gold arcs',
    images: [
      { src: photos.texturedGoldArcs7, alt: 'Gold Arcs — front view' },
      { src: photos.texturedGoldArcs6, alt: 'Gold Arcs — full canvas view' },
      { src: photos.texturedGoldArcs5, alt: 'Gold Arcs — side angle showing texture' },
      { src: photos.texturedGoldArcs4, alt: 'Gold Arcs — close detail of ridges' },
      { src: photos.texturedGoldArcs3, alt: 'Gold Arcs — angled studio view' },
      { src: photos.texturedGoldArcs2, alt: 'Gold Arcs — texture detail' },
      { src: photos.texturedGoldArcs1, alt: 'Gold Arcs — close-up of gold arc' },
    ],
    collectionId: 'textured-art',
    featured: true,
  },
];

export const featuredArtworks = artworks.filter((a) => a.featured);

export function getArtworkImages(artwork: Artwork): ArtworkImage[] {
  if (artwork.images && artwork.images.length > 0) {
    return artwork.images;
  }
  return [{ src: artwork.image, alt: artwork.imageAlt }];
}

export function getArtworksByCollection(collectionId: string): Artwork[] {
  return artworks.filter((a) => a.collectionId === collectionId);
}

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}
