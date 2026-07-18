import { photos } from './images';
import type { JourneyEntry } from '../types';

export const journeyEntries: JourneyEntry[] = [
  {
    id: 'provence',
    title: 'Lavender & Light',
    location: 'Provence, France',
    date: 'May 2025',
    narrative:
      'The rows stretch farther than the eye can follow, purple against a sky so blue it hums. I set up my easel at the edge of a field outside Valensole and lost track of time — the scent, the heat, the way the color shifted with every passing cloud. These paintings smell of lavender still.',
    images: [
      {
        src: photos.sunsetNew,
        alt: 'Sunset seascape painted during Provence residency',
      },
      {
        src: photos.inkPastelLandscape,
        alt: 'Soft pastel landscape inspired by southern light',
      },
      {
        src: photos.lilacsNew,
        alt: 'Floral still life inspired by southern blooms',
      },
    ],
  },
  {
    id: 'la-mancha',
    title: 'Windmills & Wonder',
    location: 'La Mancha, Spain',
    date: 'October 2024',
    narrative:
      'Don Quixote\'s giants stand on every hilltop, white sails turning slowly against an enormous sky. I drove through La Mancha with sketchbooks open on the passenger seat, stopping whenever a windmill appeared — each one a story, each one a painting waiting.',
    images: [
      {
        src: photos.balloonCastle,
        alt: 'Dreamlike balloon over a misty castle landscape',
      },
      {
        src: photos.treeAngle,
        alt: 'Tree painting showing impasto texture up close',
      },
    ],
  },
  {
    id: 'madrid-gardens',
    title: 'Gardens of Madrid',
    location: 'Madrid, Spain',
    date: 'November 2025',
    narrative:
      'The Retiro in autumn — golden leaves floating on still water, the Crystal Palace catching afternoon light like a jewel. I spent three weeks walking Madrid\'s gardens with my camera and my paints, preparing for the exhibition that would bring these green sanctuaries to the gallery walls.',
    images: [
      {
        src: photos.floralCrownClean,
        alt: 'Floral portrait — botanical inspiration from Madrid gardens',
      },
      {
        src: photos.goldArcsHome,
        alt: 'Gold abstract paintings in a contemporary home',
      },
      {
        src: photos.sunflowers,
        alt: 'Sunflower still life from garden light studies',
      },
    ],
  },
  {
    id: 'festival',
    title: 'Festival Days',
    location: 'Castellón de la Plana',
    date: 'July 2025',
    narrative:
      'Three days of music, color, and community — the Festival de las Artes transforms our city into an open studio. I painted live while people watched, asked questions, shared their own stories of home. Art, I remembered again, is never solitary.',
    images: [
      {
        src: photos.colorfulPortraitNew,
        alt: 'Vibrant portrait displayed at arts festival',
      },
      {
        src: photos.tigerBloom,
        alt: 'Tiger Bloom painting — festival highlight piece',
      },
    ],
  },
  {
    id: 'masterclass',
    title: 'Learning from Masters',
    location: 'Florence, Italy',
    date: 'September 2024',
    narrative:
      'A week in Florence studying Renaissance glazing techniques — standing before Botticelli and Fra Angelico, then returning to the studio to experiment. Old masters whisper; you only have to learn how to listen.',
    images: [
      {
        src: photos.goldCircleDiptych,
        alt: 'Gold and white textured circle diptych',
      },
      {
        src: photos.goldArcs,
        alt: 'Minimal gold arc abstract after Florence studies',
      },
    ],
  },
  {
    id: 'home',
    title: 'Memory of Home',
    location: 'Ukraine',
    date: 'Ongoing',
    narrative:
      'I carry Ukraine in my pigments — the red of borscht evenings, the gold of wheat fields I may not see for years, the intricate patterns my grandmother embroidered by lamplight. Every painting is a letter I cannot mail.',
    images: [
      {
        src: photos.heritageFace,
        alt: 'Portrait bridging realism and Ukrainian folk embroidery',
      },
      {
        src: photos.petrykivkaBurgundy,
        alt: 'Petrykivka kalyna motifs — memory of home',
      },
      {
        src: photos.petrykivkaBlueGold,
        alt: 'Traditional decorative floral on black ground',
      },
    ],
  },
];
