import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../i18n/LanguageContext';

interface PageMetaProps {
  title: string;
  description: string;
}

export function PageMeta({ title, description }: PageMetaProps) {
  const { language } = useLanguage();
  const fullTitle = `${title} — Viktoria Paladios Art`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
