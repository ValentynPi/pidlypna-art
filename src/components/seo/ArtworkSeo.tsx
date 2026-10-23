import type { Artwork } from '../../types';
import { JsonLd } from './JsonLd';
import { SITE_URL } from '../../seo/config';
import { absoluteImageUrl, absoluteUrl } from '../../seo/urls';
import { getArtworkPath } from '../../data/artworkPaths';
import { listingSizeCm } from '../../data/artworks';

type ArtworkSeoProps = {
  artwork: Artwork;
  title: string;
  description: string;
};

export function ArtworkSeo({ artwork, title, description }: ArtworkSeoProps) {
  const url = absoluteUrl(getArtworkPath(artwork));
  const image = absoluteImageUrl(artwork.image);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${url}#artwork`,
    name: title,
    description,
    url,
    image,
    artMedium: artwork.materials,
    creator: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Viktoria Paladios',
    },
    ...(artwork.year ? { dateCreated: String(artwork.year) } : {}),
    size: listingSizeCm(artwork),
    artform: 'Painting',
    inLanguage: ['en', 'uk', 'es'],
  };

  return <JsonLd data={data} />;
}
