import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { useLanguage } from '../i18n/LanguageContext';

export function CharityPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta title={t('charity.metaTitle')} description="" />
      <PageHeader label={t('charity.label')} title={t('charity.title')} />
    </>
  );
}
