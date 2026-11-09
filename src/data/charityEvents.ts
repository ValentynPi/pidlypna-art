import type { CharityEventContent } from './siteContentTypes';

const CHILDHOOD_INSTAGRAM_URL = 'https://www.instagram.com/reel/DUQl9HyCO8i/';

/** Default charity events (used until overridden in site-content.json). */
export const defaultCharityEvents: CharityEventContent[] = [
  {
    id: 'charity-pysanka-2025',
    date: { en: 'April 2025' },
    title: { en: 'Charity master class in pysankarstvo' },
    photos: [
      {
        src: '/images/charity-pysanka-2025-1.jpg',
        alt: 'Pysankarstvo charity workshop with candles and eggs',
      },
      {
        src: '/images/charity-pysanka-2025-2.jpg',
        alt: 'Instructor with participants at the pysanka master class',
      },
      {
        src: '/images/charity-pysanka-2025-4.jpg',
        alt: 'Dyeing eggs during the charity pysankarstvo class',
      },
    ],
  },
  {
    id: 'charity-childhood-without-war',
    title: { en: 'Charity master class: "Childhood without war"' },
    instagramUrl: CHILDHOOD_INSTAGRAM_URL,
    photos: [
      {
        src: '/images/charity-childhood-without-war-1.jpg',
        alt: 'Child painting a Ukrainian flag drawing at the workshop',
      },
      {
        src: '/images/charity-childhood-without-war-2.jpg',
        alt: 'Children drawing together at Childhood without war master class',
      },
      {
        src: '/images/charity-childhood-without-war-3.jpg',
        alt: 'Handprints on a blue-and-yellow Ukrainian flag painting',
      },
      {
        src: '/images/charity-childhood-without-war-4.jpg',
        alt: 'Boy painting a dove on the Ukrainian flag',
      },
      {
        src: '/images/charity-childhood-without-war-5.jpg',
        alt: 'Instructor guiding children with markers and paints',
      },
    ],
  },
  {
    id: 'charity-independence-ornaments',
    title: {
      en: 'Charity master class on painting wooden ornaments dedicated to the Independence Day of Ukraine',
    },
    photos: [
      {
        src: '/images/charity-independence-ornaments-1.jpg',
        alt: 'Children painting wooden ornaments under a park tent',
      },
      {
        src: '/images/charity-independence-ornaments-2.jpg',
        alt: 'Artist at the Independence Day ornaments charity class',
      },
      {
        src: '/images/charity-independence-ornaments-3.jpg',
        alt: 'Heart ornament painted in Ukrainian colors',
      },
      {
        src: '/images/charity-independence-ornaments-4.jpg',
        alt: 'Painted wooden ornaments and art supplies on the table',
      },
      {
        src: '/images/charity-independence-ornaments-5.jpg',
        alt: 'Blue and yellow bird ornament with ribbons',
      },
    ],
  },
  {
    id: 'charity-petrykivka-2024',
    date: { en: 'August 24, 2024' },
    title: { en: 'Charity master class in Petrykivka painting' },
    photos: [
      {
        src: '/images/charity-petrykivka-2024-1.jpg',
        alt: 'Petrykivka paintings from the charity master class',
      },
      {
        src: '/images/charity-petrykivka-2024-2.jpg',
        alt: 'Participants painting Petrykivka outdoors',
      },
      {
        src: '/images/charity-petrykivka-2024-3.jpg',
        alt: 'Charity Petrykivka workshop at long tables in the park',
      },
      {
        src: '/images/charity-petrykivka-2024-4.jpg',
        alt: 'Group painting session under the trees',
      },
    ],
  },
];
