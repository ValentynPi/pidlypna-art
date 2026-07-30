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
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
