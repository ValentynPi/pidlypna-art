import { photos } from './images';
import type { Exhibition } from '../types';

export const exhibitions: Exhibition[] = [
  {
    id: 'casa-caragols',
    title: 'Roots & Horizons',
    location: 'Casa dels Caragols, Castellón',
    dates: 'March 14 – April 28, 2026',
    description:
      'A solo exhibition exploring the dialogue between Ukrainian folk tradition and Mediterranean landscape — paintings that carry memory across borders.',
    image: photos.heritageFace,
    imageAlt: 'Heritage portrait — Ukrainian motifs meeting contemporary painting',
    status: 'upcoming',
  },
  {
    id: 'madrid-spring',
    title: 'Jardines de Madrid',
    location: 'Galería Contemporánea, Madrid',
    dates: 'November 8 – December 20, 2025',
    description:
      'Botanical paintings inspired by the royal gardens of Madrid — an intimate study of light, leaf, and the quiet poetry of urban green spaces.',
    image: photos.floralCrownClean,
    imageAlt: 'Floral portrait painting — botanical and figurative works',
    status: 'past',
  },
  {
    id: 'festival-castellon',
    title: 'Festival de las Artes',
    location: 'Castellón de la Plana, Spain',
    dates: 'July 12 – 14, 2025',
    description:
      'Live painting demonstrations and a pop-up gallery featuring works from the Mediterranean and Floral collections during the annual arts festival.',
    image: photos.colorfulPortraitNew,
    imageAlt: 'Bold colorful portrait — featured at arts festival',
    status: 'past',
  },
  {
    id: 'france-provence',
    title: 'Couleurs de Provence',
    location: 'Atelier des Lavandes, Provence, France',
    dates: 'May 3 – June 15, 2025',
    description:
      'Paintings created during a residency among lavender fields — a chromatic love letter to the landscapes that shaped her palette.',
    image: photos.sunsetNew,
    imageAlt: 'Mediterranean sunset seascape — Provence residency works',
    status: 'past',
  },
  {
    id: 'ukraine-solidarity',
    title: 'Threads of Home',
    location: 'Community Arts Center, Valencia',
    dates: 'February 1 – March 1, 2025',
    description:
      'A group exhibition featuring Ukrainian artists in Spain — Pidlypna Art presented new works from the Ukrainian Motifs series alongside fellow creatives.',
    image: photos.petrykivkaBlueGold,
    imageAlt: 'Petrykivka painting — Threads of Home exhibition',
    status: 'past',
  },
  {
    id: 'upcoming-barcelona',
    title: 'Between Two Shores',
    location: 'Espai d\'Art, Barcelona',
    dates: 'September 2026 (dates TBA)',
    description:
      'Upcoming solo show — a curated selection spanning all collections, tracing the artist\'s journey from Ukraine to Spain and the worlds between.',
    image: photos.tigerBloom,
    imageAlt: 'Tiger Bloom — upcoming Barcelona exhibition highlight',
    status: 'upcoming',
  },
];
