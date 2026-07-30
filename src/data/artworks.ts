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

  // —— Inspired by Nature ——
  {
    id: 'nature-01',
    title: 'Flight at Dusk',
    year: 2025,
    dimensions: '50 × 50 cm',
    materials: 'Acrylic',
    technique: 'Seascape',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'A quiet beach at dusk — dark sky, soft pink light on the horizon, and seagulls crossing the air. The sea shifts from turquoise near the shore to deep blue-grey in the distance. Painted as a moment of stillness before night, when the coast feels both familiar and far from home.',
    image: photos.natureSeagulls3,
    imageAlt: 'Seascape at dusk with seagulls flying over calm water',
    images: [
      { src: photos.natureSeagulls3, alt: 'Flight at Dusk — front view' },
      { src: photos.natureSeagulls1, alt: 'Flight at Dusk — angled view' },
      { src: photos.natureSeagulls2, alt: 'Flight at Dusk — side angle' },
    ],
    collectionId: 'inspired-by-nature',
    featured: true,
  },
  {
    id: 'nature-02',
    title: 'Sunset Reflection',
    year: 2025,
    dimensions: '90 × 120 cm',
    materials: 'Oil',
    technique: 'Impasto seascape',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'Turquoise water under a fiery horizon — Mediterranean light built in thick paint. The sun sinks into a band of red and gold while cool blues hold the sea below. Texture is part of the story: waves and reflection you can almost touch. Inspired by Castellón evenings when the sky burns and the sea answers.',
    image: photos.natureSunset1,
    imageAlt: 'Textured seascape with turquoise water and fiery sunset',
    images: [
      { src: photos.natureSunset1, alt: 'Sunset Reflection — front view' },
      { src: photos.natureSunset2, alt: 'Sunset Reflection — angled view showing texture' },
      { src: photos.natureSunset3, alt: 'Sunset Reflection — side angle' },
    ],
    collectionId: 'inspired-by-nature',
    featured: true,
  },
  {
    id: 'nature-03',
    title: 'Quiet Shore',
    year: 2024,
    dimensions: '80 × 100 cm',
    materials: 'Mixed media',
    technique: 'Textured abstract landscape',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'An abstract shoreline where cream sky meets dark water — ripples drawn softly into the surface. A rugged horizon band holds the meeting of earth and sea. Muted blues and warm neutrals keep the mood contemplative. Painted as a memory of coastlines watched in silence.',
    image: photos.natureShore3,
    imageAlt: 'Abstract textured landscape with horizon and water ripples',
    images: [
      { src: photos.natureShore3, alt: 'Quiet Shore — front view' },
      { src: photos.natureShore1, alt: 'Quiet Shore — angled view' },
      { src: photos.natureShore2, alt: 'Quiet Shore — side angle showing texture' },
    ],
    collectionId: 'inspired-by-nature',
  },
  {
    id: 'nature-04',
    title: 'Snow Peaks',
    year: 2024,
    dimensions: '70 × 50 cm',
    materials: 'Oil',
    technique: 'Mountain landscape',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'Snow-capped peaks under a pale blue sky — distance made clear and cold. Clean planes of white and blue keep the mood spacious and calm. Dark greens at the base anchor the mountains to earth. Painted to remember a horizon that asks nothing but attention.',
    image: photos.natureSnowPeaks3,
    imageAlt: 'Snow-capped mountain peaks under a pale blue sky',
    images: [
      { src: photos.natureSnowPeaks3, alt: 'Snow Peaks — front view' },
      { src: photos.natureSnowPeaks1, alt: 'Snow Peaks — angled view' },
      { src: photos.natureSnowPeaks2, alt: 'Snow Peaks — side angle' },
    ],
    collectionId: 'inspired-by-nature',
    featured: true,
  },
  {
    id: 'nature-05',
    title: 'Duality',
    year: 2024,
    dimensions: '100 × 100 cm',
    materials: 'Oil and gold leaf',
    technique: 'Symbolic tree painting',
    surface: 'Canvas',
    framing: 'Framed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'A tree divided between golden light and deep shadow — one root, two weathers. The symbol speaks to life between countries, languages, and selves. Gold catches real light so the bright half changes through the day. Painted as a personal emblem of balance without erasure.',
    image: photos.natureDuality1,
    imageAlt: 'Split tree painting — golden light and dark shadow halves',
    collectionId: 'inspired-by-nature',
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
