import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { EncounterList } from '../components/encounters/EncounterList';
import { notableEncounters } from '../data/encounters';
import { useLanguage } from '../i18n/LanguageContext';

export function EncountersPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta
        title={t('encounters.metaTitle')}
        description={t('encounters.metaDesc')}
        canonical="/encounters"
      />

      <PageHeader
        label={t('encounters.label')}
        title={t('encounters.title')}
        description={t('encounters.description')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <EncounterList encounters={notableEncounters} />
      </section>
    </>
  );
}
