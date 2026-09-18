import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../i18n/LanguageContext';

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

export function PageMeta({ title, description, image, canonical }: PageMetaProps) {
  const { language } = useLanguage();
  const fullTitle = `${title} — Viktoria Paladios Art`;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://viktoria-p.art';
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${origin}${canonical}`
    : undefined;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${origin}${image}`
    : undefined;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:card" content="summary_large_image" />}
    </Helmet>
  );
}
