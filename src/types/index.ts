export interface ArtworkImage {
  src: string;
  alt: string;
}

export type ArtworkAvailability = 'Available' | 'Sold';
export type ArtworkFraming = 'Framed' | 'Unframed';

export interface Artwork {
  id: string;
  title: string;
  year: number;
  dimensions: string;
  materials: string;
  technique: string;
  surface: string;
  framing: ArtworkFraming;
  signed: boolean;
  certificateOfAuthenticity: boolean;
  availability: ArtworkAvailability;
  description: string;
  /** Primary / cover image shown in the grid */
  image: string;
  imageAlt: string;
  /** Extra angles or detail shots of the same painting */
  images?: ArtworkImage[];
  collectionId: string;
  featured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  coverAlt: string;
  intro: string;
}

export interface Exhibition {
  id: string;
  title: string;
  location: string;
  dates: string;
  description: string;
  image: string;
  imageAlt: string;
  status: 'upcoming' | 'past';
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  location: string;
  level: string;
  description: string;
}

export interface WorkshopPhoto {
  id: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export interface PressItem {
  id: string;
  publication: string;
  date: string;
  quote: string;
  link?: string;
  logoAlt: string;
}

export interface JourneyEntry {
  id: string;
  title: string;
  location: string;
  date: string;
  narrative: string;
  images: { src: string; alt: string }[];
}
