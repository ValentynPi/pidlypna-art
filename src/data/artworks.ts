import { photos } from './images';
import type { Artwork, ArtworkImage } from '../types';

export const artworks: Artwork[] = [
  // Still Life
  {
    id: 'still-01',
    title: 'White Lilacs',
    medium: 'Oil on canvas',
    size: '80 × 100 cm',
    image: photos.lilacsNew,
    imageAlt: 'White lilacs in a glass vase against a deep burgundy background',
    images: [
      { src: photos.lilacsNew, alt: 'White Lilacs — front view' },
      { src: photos.lilacs, alt: 'White Lilacs — alternate view' },
    ],
    collectionId: 'still-life',
    featured: true,
  },
  {
    id: 'still-02',
    title: 'Sunflowers',
    medium: 'Oil on canvas',
    size: '50 × 70 cm',
    image: photos.sunflowers,
    imageAlt: 'Three sunflowers in a green vase against a teal background',
    images: [
      { src: photos.sunflowers, alt: 'Sunflowers — front view' },
      { src: photos.sunflowersAngle, alt: 'Sunflowers — side angle showing texture' },
    ],
    collectionId: 'still-life',
    featured: true,
  },

  // Portraits
  {
    id: 'portrait-01',
    title: 'Floral Crown',
    medium: 'Mixed media on canvas',
    size: '60 × 80 cm',
    image: photos.floralCrownClean,
    imageAlt: 'Grayscale portrait with vibrant textured floral headpiece',
    images: [
      { src: photos.floralCrownClean, alt: 'Floral Crown — clean studio shot' },
      { src: photos.floralCrownNew, alt: 'Floral Crown — wall display' },
      { src: photos.floralHeadFront, alt: 'Floral Crown — framed interior view' },
      { src: photos.floralHeadClose, alt: 'Floral Crown — detail of floral texture' },
      { src: photos.floralHeadOutdoor, alt: 'Floral Crown — outdoor studio setting' },
    ],
    collectionId: 'portraits',
    featured: true,
  },
  {
    id: 'portrait-02',
    title: 'Tiger Bloom',
    medium: 'Mixed media on canvas',
    size: '70 × 90 cm',
    image: photos.tigerBloom,
    imageAlt: 'Surreal painting of a tiger and woman joined by pink peonies',
    images: [
      { src: photos.tigerBloom, alt: 'Tiger Bloom — front view' },
      { src: photos.tigerBloomAngle, alt: 'Tiger Bloom — angled view' },
    ],
    collectionId: 'portraits',
    featured: true,
  },
  {
    id: 'portrait-03',
    title: 'Vibrant Spirit',
    medium: 'Acrylic on canvas',
    size: '50 × 70 cm',
    image: photos.colorfulPortraitNew,
    imageAlt: 'Bold colorful expressive portrait with painterly texture',
    images: [
      { src: photos.colorfulPortraitNew, alt: 'Vibrant Spirit — front view' },
      { src: photos.colorfulPortrait, alt: 'Vibrant Spirit — outdoor display' },
    ],
    collectionId: 'portraits',
    featured: true,
  },
  {
    id: 'portrait-04',
    title: 'Ocean Dream',
    medium: 'Oil on canvas',
    size: '80 × 100 cm',
    image: photos.oceanWomanNew,
    imageAlt: 'Surrealist portrait merging with ocean waves and sky',
    images: [
      { src: photos.oceanWomanNew, alt: 'Ocean Dream — front view' },
      { src: photos.oceanWoman, alt: 'Ocean Dream — angled view' },
    ],
    collectionId: 'portraits',
  },
  {
    id: 'portrait-05',
    title: 'LOVE',
    medium: 'Mixed media on canvas',
    size: '60 × 80 cm',
    image: photos.loveFigure,
    imageAlt: 'Expressive figure painting with LOVE typography in red',
    collectionId: 'portraits',
  },

  // Ukrainian Heritage
  {
    id: 'heritage-01',
    title: 'Heritage',
    medium: 'Oil and acrylic on canvas',
    size: '80 × 100 cm',
    image: photos.heritageFace,
    imageAlt: 'Portrait split between realistic face and Ukrainian folk patterns',
    images: [
      { src: photos.heritageFace, alt: 'Heritage — front view' },
      { src: photos.heritageFaceAlt, alt: 'Heritage — alternate angle' },
      { src: photos.heritageFaceClose, alt: 'Heritage — close detail' },
    ],
    collectionId: 'ukrainian-heritage',
    featured: true,
  },

  // Petrykivka
  {
    id: 'petrykivka-01',
    title: 'Kalyna Night',
    medium: 'Acrylic on canvas',
    size: '40 × 50 cm',
    image: photos.petrykivkaBurgundy,
    imageAlt: 'Petrykivka-style white berries and leaves on burgundy ground',
    images: [
      { src: photos.petrykivkaBurgundy, alt: 'Kalyna Night — on easel' },
      { src: photos.petrykivkaBurgundyAlt, alt: 'Kalyna Night — alternate angle' },
    ],
    collectionId: 'petrykivka',
    featured: true,
  },
  {
    id: 'petrykivka-02',
    title: 'Blue Bloom',
    medium: 'Acrylic on canvas',
    size: '40 × 40 cm',
    image: photos.petrykivkaBlueGold,
    imageAlt: 'Petrykivka blue flower with orange leaves on black background',
    collectionId: 'petrykivka',
    featured: true,
  },
  {
    id: 'petrykivka-03',
    title: 'Blue & Gold',
    medium: 'Acrylic on canvas',
    size: '20 × 20 cm',
    image: photos.petrykivkaBlueSmall,
    imageAlt: 'Small Petrykivka floral sprig in blue and gold',
    collectionId: 'petrykivka',
  },
  {
    id: 'petrykivka-04',
    title: 'Teal Peonies',
    medium: 'Acrylic on canvas',
    size: '20 × 20 cm',
    image: photos.petrykivkaBlueRed,
    imageAlt: 'Petrykivka teal and burgundy flowers on white canvas',
    collectionId: 'petrykivka',
  },

  // Seascapes
  {
    id: 'sea-01',
    title: 'Sunset Reflection',
    medium: 'Oil on canvas',
    size: '90 × 120 cm',
    image: photos.sunsetNew,
    imageAlt: 'Textured seascape with turquoise water and fiery sunset',
    images: [
      { src: photos.sunsetNew, alt: 'Sunset Reflection — front view' },
      { src: photos.sunsetFront, alt: 'Sunset Reflection — front alternate' },
      { src: photos.sunsetStudio, alt: 'Sunset Reflection — studio lean' },
      { src: photos.sunsetAngle, alt: 'Sunset Reflection — side angle showing texture' },
    ],
    collectionId: 'seascapes',
    featured: true,
  },
  {
    id: 'sea-02',
    title: 'Soy Fuerte',
    medium: 'Acrylic on canvas',
    size: '50 × 70 cm',
    image: photos.soyFuerte,
    imageAlt: 'Seascape with stylized blue waves and the words Soy Fuerte',
    images: [
      { src: photos.soyFuerte, alt: 'Soy Fuerte — front view' },
      { src: photos.soyFuerteAngle, alt: 'Soy Fuerte — side angle' },
    ],
    collectionId: 'seascapes',
    featured: true,
  },

  // Landscapes
  {
    id: 'land-01',
    title: 'Snow Peaks',
    medium: 'Oil on canvas',
    size: '70 × 50 cm',
    image: photos.snowPeaks,
    imageAlt: 'Snow-capped mountain peaks under a pale blue sky',
    collectionId: 'landscapes',
    featured: true,
  },
  {
    id: 'land-02',
    title: 'Golden Balloon',
    medium: 'Mixed media on canvas',
    size: '60 × 60 cm',
    image: photos.balloonCastle,
    imageAlt: 'Golden hot air balloon over misty coastal castle landscape',
    collectionId: 'landscapes',
    featured: true,
  },
  {
    id: 'land-03',
    title: 'Duality',
    medium: 'Oil and gold leaf on canvas',
    size: '100 × 100 cm',
    image: photos.treeWall,
    imageAlt: 'Split tree painting — golden light and dark shadow halves',
    images: [
      { src: photos.treeWall, alt: 'Duality — on wall' },
      { src: photos.treeStudio, alt: 'Duality — studio light and shadows' },
      { src: photos.treeFramed, alt: 'Duality — framed in interior' },
      { src: photos.treeAngle, alt: 'Duality — angled view of texture' },
    ],
    collectionId: 'landscapes',
    featured: true,
  },
  {
    id: 'land-04',
    title: 'Pastel Hills',
    medium: 'Alcohol ink on panel',
    size: '30 × 30 cm',
    image: photos.inkPastelLandscape,
    imageAlt: 'Abstract pastel landscape in rose, lavender and yellow',
    collectionId: 'landscapes',
  },
  {
    id: 'land-05',
    title: 'Soft Terrain',
    medium: 'Alcohol ink on panel',
    size: '30 × 30 cm',
    image: photos.inkHills,
    imageAlt: 'Fluid ink landscape with pink sky and dark rolling hills',
    collectionId: 'landscapes',
  },

  // Abstract
  {
    id: 'abstract-01',
    title: 'Gold Arcs',
    medium: 'Mixed media on canvas',
    size: '80 × 100 cm',
    image: photos.goldArcs,
    imageAlt: 'Minimal white canvas with textured metallic gold arcs',
    images: [
      { src: photos.goldArcs, alt: 'Gold Arcs — front view' },
      { src: photos.goldArcsAlt, alt: 'Gold Arcs — alternate composition view' },
      { src: photos.goldArcsDetail, alt: 'Gold Arcs — texture detail' },
      { src: photos.goldArcsHome, alt: 'Gold Arcs — shown in a living space' },
    ],
    collectionId: 'abstract',
    featured: true,
  },
  {
    id: 'abstract-02',
    title: 'Halo',
    medium: 'Mixed media on canvas (diptych)',
    size: '2 × 50 × 70 cm',
    image: photos.goldCircleDiptych,
    imageAlt: 'White and gold textured circle spanning two panels',
    collectionId: 'abstract',
    featured: true,
  },
  {
    id: 'abstract-03',
    title: 'Thoughts',
    medium: 'Mixed media on canvas',
    size: '60 × 80 cm',
    image: photos.thoughts,
    imageAlt: 'Abstract pastel painting with recurring handwritten word Thoughts',
    collectionId: 'abstract',
  },
  {
    id: 'abstract-04',
    title: 'City Light',
    medium: 'Oil on canvas',
    size: '100 × 80 cm',
    image: photos.cityscapeFront,
    imageAlt: 'Abstract cityscape with glowing central light and warm accents',
    images: [
      { src: photos.cityscapeFront, alt: 'City Light — front view' },
      { src: photos.cityscapeAngle, alt: 'City Light — side angle' },
    ],
    collectionId: 'abstract',
  },
  {
    id: 'abstract-05',
    title: 'Deep Current',
    medium: 'Mixed media on canvas',
    size: '80 × 100 cm',
    image: photos.darkTealVertical,
    imageAlt: 'Abstract landscape with metallic texture and teal reflections',
    images: [
      { src: photos.darkTealVertical, alt: 'Deep Current — front view' },
      { src: photos.abstractTealMetallic, alt: 'Deep Current — side angle showing texture' },
    ],
    collectionId: 'abstract',
  },
  {
    id: 'abstract-06',
    title: 'Moonlit Horizon',
    medium: 'Oil on canvas',
    size: '70 × 100 cm',
    image: photos.moonHorizonNew,
    imageAlt: 'Atmospheric abstract landscape with moon motif and blue tones',
    images: [
      { src: photos.moonHorizonNew, alt: 'Moonlit Horizon — front view' },
      { src: photos.moonLandscape, alt: 'Moonlit Horizon — alternate view' },
    ],
    collectionId: 'abstract',
  },
  {
    id: 'abstract-07',
    title: 'Ink Circle',
    medium: 'Alcohol ink on panel',
    size: '30 × 30 cm',
    image: photos.inkCircle,
    imageAlt: 'Circular fluid art in pink, lavender and indigo with gold accents',
    images: [
      { src: photos.inkCircle, alt: 'Ink Circle — front view' },
      { src: photos.inkCircleAlt, alt: 'Ink Circle — on easel' },
    ],
    collectionId: 'abstract',
  },
  {
    id: 'abstract-08',
    title: 'Horizon Line',
    medium: 'Mixed media on canvas',
    size: '90 × 70 cm',
    image: photos.abstractHorizon,
    imageAlt: 'Abstract horizon with terracotta texture and blue wash',
    collectionId: 'abstract',
  },
  {
    id: 'abstract-09',
    title: 'Inner Circle',
    medium: 'Mixed media on canvas',
    size: '80 × 60 cm',
    image: photos.abstractCircle,
    imageAlt: 'Textured abstract landscape with circular sun motif',
    collectionId: 'abstract',
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
