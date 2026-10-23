import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  DEFAULT_OG_IMAGE_PATH,
  LOCALE_BY_LANGUAGE,
  SITE_NAME,
  SITE_URL,
} from '../../seo/config';
import { absoluteImageUrl, absoluteUrl, truncateMetaDescription } from '../../seo/urls';
import { social } from '../../data/social';

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  /** When true, `<title>` is used as-is (no site suffix). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  imageAlt?: string;
}

export function PageMeta({
  title,
  description,
  image,
  canonical,
  absoluteTitle = false,
  noindex = false,
  ogType = 'website',
  imageAlt,
}: PageMetaProps) {
  const { language } = useLanguage();
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
  const metaDescription = truncateMetaDescription(description);
  const canonicalUrl = canonical ? absoluteUrl(canonical) : undefined;
  const imageUrl = absoluteImageUrl(image ?? DEFAULT_OG_IMAGE_PATH);
  const locale = LOCALE_BY_LANGUAGE[language];
  const alt = imageAlt ?? fullTitle;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content="Viktoria Paladios" />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl ?? `${SITE_URL}/`} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl ?? `${SITE_URL}/`} />
      <link rel="alternate" hrefLang="uk" href={canonicalUrl ?? `${SITE_URL}/`} />
      <link rel="alternate" hrefLang="es" href={canonicalUrl ?? `${SITE_URL}/`} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <link rel="me" href={social.instagram.href} />
      <link rel="me" href={social.facebook.href} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={alt} />
    </Helmet>
  );
}
