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
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
