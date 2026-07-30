import { photos } from './images';
import type { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 'textured-art',
    name: 'Textured Art',
    slug: 'textured-art',
    coverImage: photos.texturedGoldArcs7,
    coverAlt: 'White canvas with textured metallic gold arcs',
    intro:
      'Surface as story — impasto, metallic layers, and tactile depths you can almost feel.',
  },
  {
    id: 'inspired-by-nature',
    name: 'Inspired by Nature',
    slug: 'inspired-by-nature',
    coverImage: photos.natureSnowPeaks3,
    coverAlt: 'Snow-capped mountain peaks under a pale blue sky',
    intro:
      'Landscapes, seas, and skies observed with feeling — nature translated into color and light.',
  },
  {
    id: 'floral-collection',
    name: 'Floral Collection',
    slug: 'floral-collection',
    coverImage: photos.floralLilacs1,
    coverAlt: 'White lilacs in a glass vase against a deep burgundy background',
    intro:
      'Classic floral still lifes — bouquets studied for light, texture, and the quiet drama of everyday beauty.',
  },
  {
    id: 'inspired-by-places',
    name: 'Inspired by Places',
    slug: 'inspired-by-places',
    coverImage: photos.placesBalloon1,
    coverAlt: 'Golden hot air balloon over misty coastal castle landscape',
    intro:
      'Places remembered and imagined — cities, coasts, and horizons that carry personal meaning.',
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
