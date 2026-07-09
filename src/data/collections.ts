import { photos } from './images';
import type { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 'floral',
    name: 'Floral Collection',
    slug: 'floral',
    coverImage: photos.lilacs,
    coverAlt: 'White lilacs in a glass vase — floral still life',
    intro:
      'Lush blooms painted with Mediterranean light — roses from Castellón gardens, wildflowers gathered along coastal paths, each petal rendered in layered, luminous color.',
  },
  {
    id: 'ukrainian-motifs',
    name: 'Ukrainian Motifs',
    slug: 'ukrainian-motifs',
    coverImage: photos.treeFramed,
    coverAlt: 'Duality tree painting — Ukrainian heritage in contemporary form',
    intro:
      'Heritage reimagined: traditional Ukrainian ornamentation woven into contemporary compositions, honoring memory while speaking a new visual language.',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean Collection',
    slug: 'mediterranean',
    coverImage: photos.sunsetFront,
    coverAlt: 'Sunset seascape with turquoise water and fiery horizon',
    intro:
      'The sea, the stone, the endless blue — paintings born from life along the Spanish coast, where Ukrainian soul meets Mediterranean warmth.',
  },
  {
    id: 'petrykivka',
    name: 'Petrykivka',
    slug: 'petrykivka',
    coverImage: photos.colorfulPortrait,
    coverAlt: 'Bold colorful portrait with expressive painterly texture',
    intro:
      'Inspired by the ancient Petrykivka decorative painting tradition — intricate florals and birds rendered with contemporary freedom and bold color.',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    slug: 'abstract',
    coverImage: photos.cityscapeFront,
    coverAlt: 'Abstract cityscape with glowing light and impasto texture',
    intro:
      'Pure emotion on canvas — gestural brushwork, atmospheric color fields, and the spontaneous energy of process made visible.',
  },
  {
    id: 'landscapes',
    name: 'Landscapes & Journeys',
    slug: 'landscapes',
    coverImage: photos.oceanWoman,
    coverAlt: 'Surrealist landscape — figure merging with ocean and sky',
    intro:
      'From Ukrainian wheat fields to Provence lavender rows — landscapes that map an artist\'s journey across continents and seasons.',
  },
];
