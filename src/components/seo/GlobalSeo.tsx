import { useLocation } from 'react-router-dom';
import { JsonLd } from './JsonLd';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '../../seo/config';
import { absoluteUrl } from '../../seo/urls';
import { CONTACT_EMAIL, social } from '../../data/social';

const sameAs = [
  social.instagram.href,
  social.facebook.href,
  social.youtube.href,
  social.tiktok.href,
];

export function GlobalSeo() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_TAGLINE,
      inLanguage: ['en', 'uk', 'es'],
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Viktoria Paladios',
      url: absoluteUrl('/about'),
      jobTitle: 'Visual artist',
      email: CONTACT_EMAIL,
      homeLocation: {
        '@type': 'Place',
        name: 'Castellón de la Plana, Spain',
      },
      nationality: {
        '@type': 'Country',
        name: 'Ukraine',
      },
      sameAs,
      knowsAbout: [
        'Contemporary painting',
        'Petrykivka decorative painting',
        'Ukrainian symbolism',
        'Acrylic painting',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/about#profile`,
      url: absoluteUrl('/about'),
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
  ];

  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />;
}
