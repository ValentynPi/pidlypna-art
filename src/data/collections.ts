import { photos } from './images';
import type { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 'petrykivka-painting',
    name: 'Petrykivka Painting',
    slug: 'petrykivka-painting',
    coverImage: photos.petrykivkaBlueGold,
    coverAlt: 'Petrykivka blue flower with orange leaves on black background',
    intro:
      'The Ukrainian decorative painting tradition — stylized florals, berries, and brush-stroke ornaments on canvas.',
  },
  {
    id: 'abstract-art',
    name: 'Abstract Art',
    slug: 'abstract-art',
    coverImage: photos.goldArcs,
    coverAlt: 'Minimal white canvas with textured metallic gold arcs',
    intro:
      'Compositions that speak through color, gesture, and form — atmospheres beyond the literal.',
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    slug: 'pop-art',
    coverImage: photos.tigerBloom,
    coverAlt: 'Surreal painting of a tiger and woman joined by pink peonies',
    intro:
      'Bold color, graphic energy, and contemporary icons — art that speaks with confidence.',
  },
  {
    id: 'female-portraits',
    name: 'Female Portraits',
    slug: 'female-portraits',
    coverImage: photos.floralCrownClean,
    coverAlt: 'Floral Crown — grayscale portrait with vibrant flowers',
    intro:
      'Faces and figures of women — from floral-crowned silhouettes to dreamlike seascapes of identity.',
  },
  {
    id: 'affirmation-art',
    name: 'Affirmation Art',
    slug: 'affirmation-art',
    coverImage: photos.soyFuerte,
    coverAlt: 'Seascape with stylized blue waves and the words Soy Fuerte',
    intro:
      'Words and images woven together — paintings that hold strength, intention, and daily courage.',
  },
  {
    id: 'ukrainian-symbolism',
    name: 'Ukrainian Symbolism',
    slug: 'ukrainian-symbolism',
    coverImage: photos.heritageFace,
    coverAlt: 'Portrait merging realism with Ukrainian folk embroidery',
    intro:
      'Heritage held in paint — embroidery, memory, and symbols that carry Ukraine into the present.',
  },
  {
    id: 'textured-art',
    name: 'Textured Art',
    slug: 'textured-art',
    coverImage: photos.sunsetNew,
    coverAlt: 'Sunset seascape with turquoise water and fiery horizon',
    intro:
      'Surface as story — impasto, metallic layers, and tactile depths you can almost feel.',
  },
  {
    id: 'alcohol-ink-art',
    name: 'Alcohol Ink Art',
    slug: 'alcohol-ink-art',
    coverImage: photos.inkCircle,
    coverAlt: 'Circular fluid art in pink, lavender and indigo with gold accents',
    intro:
      'Fluid pigment on panel — luminous landscapes and circles born from chance and control.',
  },
  {
    id: 'plein-air-paintings',
    name: 'Plein Air Paintings',
    slug: 'plein-air-paintings',
    coverImage: photos.snowPeaks,
    coverAlt: 'Snow-capped mountain peaks under a pale blue sky',
    intro:
      'Painted from life and light — mountains, florals, and horizons observed with a quiet eye.',
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
