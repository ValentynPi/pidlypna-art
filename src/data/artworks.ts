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

  // —— Floral Collection ——
  {
    id: 'floral-01',
    title: 'Sunflowers',
    year: 2025,
    dimensions: '50 × 70 cm',
    materials: 'Oil',
    technique: 'Floral still life',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'Three sunflowers in a green vase against teal — summer held in a simple arrangement. Studied for warmth, the tilt of each head, and the stubborn cheer of the bloom. Thick petals catch light like small fields of gold. Painted as a love letter to ordinary abundance and Mediterranean color.',
    image: photos.floralSunflowers1,
    imageAlt: 'Three sunflowers in a green vase against a teal background',
    images: [
      { src: photos.floralSunflowers1, alt: 'Sunflowers — front view' },
      { src: photos.floralSunflowers3, alt: 'Sunflowers — angled view' },
      { src: photos.floralSunflowers2, alt: 'Sunflowers — side angle showing texture' },
    ],
    collectionId: 'floral-collection',
    featured: true,
  },
  {
    id: 'floral-02',
    title: 'White Lilacs',
    year: 2025,
    dimensions: '80 × 100 cm',
    materials: 'Oil',
    technique: 'Floral still life',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'White lilacs in a glass vase against deep burgundy — perfume translated into paint. Observed for light, petal edge, and quiet drama. The dark ground lets the blooms glow like evening guests. Many viewers feel intimacy and freshness in the soft white clusters. Painted in the studio with natural light as co-author.',
    image: photos.floralLilacs1,
    imageAlt: 'White lilacs in a glass vase against a deep burgundy background',
    images: [
      { src: photos.floralLilacs1, alt: 'White Lilacs — front view' },
      { src: photos.floralLilacs2, alt: 'White Lilacs — angled view' },
      { src: photos.floralLilacs3, alt: 'White Lilacs — side angle' },
    ],
    collectionId: 'floral-collection',
    featured: true,
  },

  // —— Inspired by Places ——
  {
    id: 'places-01',
    title: 'City Light',
    year: 2024,
    dimensions: '100 × 80 cm',
    materials: 'Oil',
    technique: 'Abstract cityscape with symbolic overlay',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'An abstracted city skyline glowing from within — warm orange and red light rising through dark towers. White symbols float above the urban silhouette, inviting reflection on identity and place. Inspired by evenings in Spanish towns when windows turn amber. Built layer by layer to keep the light breathing through the darks.',
    image: photos.placesCity1,
    imageAlt: 'Abstract cityscape with glowing light and symbolic white marks',
    images: [
      { src: photos.placesCity1, alt: 'City Light — front view' },
      { src: photos.placesCity2, alt: 'City Light — angled view' },
      { src: photos.placesCity3, alt: 'City Light — side angle showing texture' },
    ],
    collectionId: 'inspired-by-places',
    featured: true,
  },
  {
    id: 'places-02',
    title: 'Golden Balloon',
    year: 2024,
    dimensions: '60 × 60 cm',
    materials: 'Mixed media',
    technique: 'Imaginative landscape',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description:
      'A golden hot air balloon over a misty coastal castle — travel as dream. Part observation, part wish: the landscape is familiar while the balloon is hope. Soft mist softens edges so the gold can shine against grey-blue water. Painted as a gentle escape that still belongs to a real coast remembered with love.',
    image: photos.placesBalloon1,
    imageAlt: 'Golden hot air balloon over misty coastal castle landscape',
    images: [
      { src: photos.placesBalloon1, alt: 'Golden Balloon — front view' },
      { src: photos.placesBalloon2, alt: 'Golden Balloon — angled view' },
      { src: photos.placesBalloon3, alt: 'Golden Balloon — side angle' },
    ],
    collectionId: 'inspired-by-places',
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
