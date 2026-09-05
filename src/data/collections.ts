import { photos } from './images';
import type { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 'ukrainian-symbolism',
    name: 'Ukrainian Symbolism',
    slug: 'ukrainian-symbolism',
    coverImage: photos.ukrainian_symbolism_cover,
    coverAlt: 'Ukrainian Symbolism collection cover',
    intro: 'Heritage held in paint — embroidery, memory, and symbols that carry Ukraine into the present.',
  },
  {
    id: 'female-portraits',
    name: 'Female Portraits',
    slug: 'female-portraits',
    coverImage: photos.female_portraits_cover,
    coverAlt: 'Female Portraits collection cover',
    intro: 'Faces and figures of women — from floral-crowned silhouettes to dreamlike seascapes of identity.',
  },
  {
    id: 'abstract-art',
    name: 'Abstract Art',
    slug: 'abstract-art',
    coverImage: photos.abstract_art_cover,
    coverAlt: 'Beyond Visibility — Abstract Art collection cover',
    intro: 'Compositions that speak through color, gesture, and form — atmospheres beyond the literal.',
  },
  {
    id: 'floral-collection',
    name: 'Floral Collection',
    slug: 'floral-collection',
    coverImage: photos.floral_collection_cover,
    coverAlt: 'Floral Collection collection cover',
    intro: 'Classic floral still lifes — bouquets studied for light, texture, and quiet drama.',
  },
  {
    id: 'petrykivka',
    name: 'Petrykivka',
    slug: 'petrykivka',
    coverImage: photos.petrykivka_cover,
    coverAlt: 'Petrykivka collection cover',
    intro: 'The Ukrainian decorative painting tradition — stylized florals, berries, and brush-stroke ornaments.',
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    slug: 'pop-art',
    coverImage: photos.pop_art_cover,
    coverAlt: 'Pop Art collection cover',
    intro: 'Bold color, graphic energy, and contemporary icons — art that speaks with confidence.',
  },
  {
    id: 'inspired-by-nature',
    name: 'Inspired by Nature',
    slug: 'inspired-by-nature',
    coverImage: photos.inspired_by_nature_cover,
    coverAlt: 'Inspired by Nature collection cover',
    intro: 'Landscapes, seas, and skies observed with feeling — nature translated into color and light.',
  },
  {
    id: 'inspired-by-places',
    name: 'Inspired by Places',
    slug: 'inspired-by-places',
    coverImage: photos.inspired_by_places_cover,
    coverAlt: 'Inspired by Places collection cover',
    intro: 'Landmarks remembered in paint — cities, coasts, and journeys translated into atmosphere.',
  },
  {
    id: 'plain-air-collection',
    name: 'Plain Air Collection',
    slug: 'plain-air-collection',
    coverImage: photos.plain_air_collection_cover,
    coverAlt: 'Plain Air Collection collection cover',
    intro: 'Painted from life and light — mountains, coasts, and horizons observed with a quiet eye.',
  },
  {
    id: 'alcohol-ink-art',
    name: 'Alcohol Ink Art',
    slug: 'alcohol-ink-art',
    coverImage: photos.alcohol_ink_art_cover,
    coverAlt: 'Alcohol Ink Art collection cover',
    intro: 'Fluid pigment on panel — luminous landscapes and circles born from chance and control.',
  },
  {
    id: 'textured-and-light',
    name: 'Textured & Light',
    slug: 'textured-and-light',
    coverImage: photos.textured_and_light_cover,
    coverAlt: 'Textured & Light collection cover',
    intro: 'Surface as story — impasto, metallic layers, and tactile depths you can almost feel.',
  },
  {
    id: 'affirmation-collection',
    name: 'Affirmation Collection',
    slug: 'affirmation-collection',
    coverImage: photos.affirmation_collection_cover,
    coverAlt: 'Affirmation Collection collection cover',
    intro: 'Words and images woven together — paintings that hold strength, intention, and daily courage.',
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
