import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { Timeline } from '../components/exhibitions/Timeline';
import { exhibitions } from '../data/exhibitions';
import { useLanguage } from '../i18n/LanguageContext';

export function ExhibitionsPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta
        title={t('exhibitions.metaTitle')}
        description={t('exhibitions.metaDesc')}
      />

      <PageHeader
        label={t('exhibitions.label')}
        title={t('exhibitions.title')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <Timeline exhibitions={exhibitions} />
      </section>
    </>
  );
}
