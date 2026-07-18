import { photos } from './images';
import type { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 'still-life',
    name: 'Still Life',
    slug: 'still-life',
    coverImage: photos.lilacsNew,
    coverAlt: 'White lilacs in a glass vase — floral still life',
    intro:
      'Classic still lifes — lilacs, sunflowers, and bouquets studied for light, texture, and the quiet drama of everyday beauty.',
  },
  {
    id: 'portraits',
    name: 'Portraits',
    slug: 'portraits',
    coverImage: photos.floralCrownClean,
    coverAlt: 'Floral Crown — grayscale portrait with vibrant flowers',
    intro:
      'Faces and figures — from floral-crowned silhouettes to surreal tiger blooms and expressive color portraits.',
  },
  {
    id: 'ukrainian-heritage',
    name: 'Ukrainian Heritage',
    slug: 'ukrainian-heritage',
    coverImage: photos.heritageFace,
    coverAlt: 'Portrait merging realism with Ukrainian folk embroidery',
    intro:
      'Works that carry Ukraine forward — embroidery patterns woven into contemporary faces, memory held in paint.',
  },
  {
    id: 'petrykivka',
    name: 'Petrykivka',
    slug: 'petrykivka',
    coverImage: photos.petrykivkaBlueGold,
    coverAlt: 'Petrykivka blue flower with orange leaves on black background',
    intro:
      'The Ukrainian decorative painting tradition — stylized florals, berries, and brush-stroke ornaments on canvas.',
  },
  {
    id: 'seascapes',
    name: 'Seascapes',
    slug: 'seascapes',
    coverImage: photos.sunsetNew,
    coverAlt: 'Sunset seascape with turquoise water and fiery horizon',
    intro:
      'Mediterranean light on water — textured sunsets, coastal horizons, and the strength of the sea.',
  },
  {
    id: 'landscapes',
    name: 'Landscapes',
    slug: 'landscapes',
    coverImage: photos.balloonCastle,
    coverAlt: 'Golden hot air balloon over misty coastal landscape',
    intro:
      'Mountains, dream balloons, symbolic trees, and fluid horizons — places both real and imagined.',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    slug: 'abstract',
    coverImage: photos.goldArcs,
    coverAlt: 'Minimal white canvas with textured metallic gold arcs',
    intro:
      'Texture, gold, ink, and gesture — compositions that speak through color and surface alone.',
  },
];
