import { photos } from './images';
import type { Workshop, WorkshopPhoto } from '../types';

export const workshops: Workshop[] = [
  {
    id: 'petrykivka-intro',
    title: 'Introduction to Petrykivka',
    date: 'May 24, 2026',
    location: 'Casa dels Caragols, Castellón',
    level: 'Beginner friendly',
    description:
      'Discover the Ukrainian decorative painting tradition of Petrykivka. Using gouache and fine brushes, you\'ll create your own floral composition inspired by centuries-old folk art.',
  },
  {
    id: 'plein-air',
    title: 'Plein Air by the Sea',
    date: 'June 7, 2026',
    location: 'Benicàssim Coast',
    level: 'Intermediate',
    description:
      'Paint the Mediterranean coastline en plein air. Guidance on capturing light, atmosphere, and the ever-changing sea — all materials provided.',
  },
  {
    id: 'summer-intensive',
    title: 'Summer Painting Intensive',
    date: 'July 19–21, 2026',
    location: 'Castellón Studio',
    level: 'All levels',
    description:
      'A three-day immersive workshop covering landscape, floral, and abstract approaches. Includes studio time, group critique, and a final mini-exhibition of student works.',
  },
];

export const workshopPhotos: WorkshopPhoto[] = [
  {
    id: 'ws-01',
    image: photos.workshopCityLight2,
    imageAlt: 'City Light abstract painting with He and She symbols',
    caption: 'City Light — studio work in progress',
  },
  {
    id: 'ws-02',
    image: photos.workshopCityLight1,
    imageAlt: 'City Light painting textured skyline detail',
    caption: 'Palette-knife texture and city glow',
  },
  {
    id: 'ws-03',
    image: photos.workshopCityLight3,
    imageAlt: 'City Light painting on canvas against the wall',
    caption: 'Finished canvas — City Light',
  },
  {
    id: 'ws-04',
    image: photos.workshopPetrykivkaBlue1,
    imageAlt: 'Blue Petrykivka floral painting on a wooden easel',
    caption: 'Petrykivka on black — studio easel',
  },
  {
    id: 'ws-05',
    image: photos.workshopPetrykivkaBlue2,
    imageAlt: 'Close angle of blue Petrykivka painting',
    caption: 'Fine brushwork in Petrykivka style',
  },
  {
    id: 'ws-06',
    image: photos.workshopPetrykivkaGold1,
    imageAlt: 'Blue and gold Petrykivka painting on easel',
    caption: 'Blue & gold Petrykivka on white',
  },
  {
    id: 'ws-07',
    image: photos.workshopPetrykivkaGold2,
    imageAlt: 'Detail of blue and gold Petrykivka painting',
    caption: 'Gold petals and blue leaves — detail',
  },
];
