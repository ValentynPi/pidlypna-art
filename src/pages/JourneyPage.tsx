import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { JourneyEntry } from '../components/journey/JourneyEntry';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { HandLine } from '../components/ui/HandLine';
import { journeyEntries } from '../data/journey';
import { useLanguage } from '../i18n/LanguageContext';

export function JourneyPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta
        title={t('journey.metaTitle')}
        description={t('journey.metaDesc')}
      />

      <PageHeader
        label={t('journey.label')}
        title={t('journey.title')}
        description={t('journey.description')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-16 md:px-10 lg:px-16">
        {journeyEntries.map((entry, index) => (
          <JourneyEntry key={entry.id} entry={entry} index={index} />
        ))}
      </section>

      <section className="bg-blush">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10 md:py-28">
          <ScrollReveal>
            <HandLine variant="circle" className="mx-auto mb-8 h-12 w-12 text-gold" />
            <p className="font-serif text-2xl leading-relaxed text-ink italic md:text-3xl">
              &ldquo;{t('journey.quote')}&rdquo;
            </p>
            <p className="mt-6 text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
              Viktoria Paladios
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
