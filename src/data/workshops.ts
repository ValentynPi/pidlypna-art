import { photos } from './images';
import type { Workshop, WorkshopPhoto } from '../types';

export const workshops: Workshop[] = [
  {
    id: 'floral-oils',
    title: 'Floral Painting in Oils',
    date: 'April 12, 2026',
    location: 'Castellón Studio',
    level: 'All levels welcome',
    description:
      'Learn to capture the luminous quality of flowers in oil paint. We\'ll cover color mixing, brush techniques, and composition — with plenty of time to paint from fresh bouquets.',
  },
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
    image: photos.treeStudio,
    imageAlt: 'Artist studio with duality tree painting and natural light',
    caption: 'Studio session — exploring light and texture',
  },
  {
    id: 'ws-02',
    image: photos.floralHeadOutdoor,
    imageAlt: 'Painting displayed in outdoor studio setting',
    caption: 'Outdoor studio in Castellón',
  },
  {
    id: 'ws-03',
    image: photos.lilacs,
    imageAlt: 'Floral still life — white lilacs student work example',
    caption: 'Floral painting workshop result',
  },
  {
    id: 'ws-04',
    image: photos.sunsetAngle,
    imageAlt: 'Seascape painting — plein air coastal session',
    caption: 'Plein air session along the Costa Azahar',
  },
  {
    id: 'ws-05',
    image: photos.colorfulPortrait,
    imageAlt: 'Colorful expressive portrait — Petrykivka-inspired workshop',
    caption: 'Petrykivka workshop — bold color and expression',
  },
  {
    id: 'ws-06',
    image: photos.treeFramed,
    imageAlt: 'Framed artwork displayed in gallery setting',
    caption: 'Summer intensive — final day mini-exhibition',
  },
];
