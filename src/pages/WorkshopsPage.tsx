import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { workshops } from '../data/workshops';
import { useLanguage } from '../i18n/LanguageContext';

export function WorkshopsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta
        title={t('workshops.metaTitle')}
        description={t('workshops.metaDesc')}
      />

      <PageHeader
        label={t('workshops.label')}
        title={t('workshops.title')}
        description={t('workshops.description')}
      />

      <section className="bg-ink">
        <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16 md:py-28">
          <ScrollReveal>
            <SectionLabel light>{t('workshops.dates')}</SectionLabel>
            <p className="mt-6 max-w-xl text-cream/50">
              {t('workshops.datesIntro')}
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-px bg-cream/10">
            {workshops.map((workshop, index) => (
              <ScrollReveal key={workshop.id} delay={index * 0.08}>
                <div className="grid gap-6 bg-ink p-6 md:grid-cols-12 md:gap-8 md:p-8">
                  <div className="md:col-span-3">
                    <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                      {t(`workshops.items.${workshop.id}.date`)}
                    </p>
                    <p className="mt-2 text-sm text-cream/40">
                      {t(`workshops.items.${workshop.id}.location`)}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-serif text-xl text-cream md:text-2xl">
                      {t(`workshops.items.${workshop.id}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/50">
                      {t(`workshops.items.${workshop.id}.description`)}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between md:col-span-3 md:items-end">
                    <span className="text-[0.65rem] tracking-[0.2em] text-cream/30 uppercase">
                      {t(`workshops.items.${workshop.id}.level`)}
                    </span>
                    <Button to="/contact" variant="gold" className="mt-4 md:mt-0">
                      {t('workshops.book')}
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="display-heading text-3xl">{t('workshops.expect')}</h2>
          <p className="mt-6 leading-relaxed text-ink-soft">
            {t('workshops.expectBody')}
          </p>
          <Button to="/contact" variant="ghost" className="mt-10">
            {t('workshops.getInTouch')}
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
