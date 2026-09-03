import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { HandLine } from '../components/ui/HandLine';
import { photos } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta
        title={t('about.metaTitle')}
        description={t('about.metaDesc')}
      />

      <PageHeader
        label={t('about.label')}
        title={t('about.title')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-16 md:px-10 lg:px-16">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-5">
            <div className="image-frame">
              <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                <LazyImage
                  src={photos.floralCrownClean}
                  alt="Floral Crown — portrait painting by Viktoria Paladios"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-8 text-base leading-[1.8] text-ink-soft lg:col-span-7 md:text-lg">
            <ScrollReveal delay={0.1}>
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:text-gold first-letter:leading-none">
                {t('about.p1')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p>{t('about.p2')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <LazyImage
            src={photos.ukrainian_symbolism_heritage_1}
            alt=""
            wrapperClassName="h-full w-full"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <ScrollReveal>
            <HandLine variant="circle" className="mx-auto mb-8 h-16 w-16 text-gold" />
            <blockquote className="font-serif text-2xl leading-relaxed text-cream italic md:text-4xl md:leading-snug">
              &ldquo;{t('about.quote')}&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-8 text-base leading-[1.8] text-ink-soft md:text-lg">
          <ScrollReveal>
            <p>{t('about.p3')}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p>{t('about.p4')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream-dark">
        <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16">
          <ScrollReveal>
            <div className="grid gap-12 md:grid-cols-3">
              {[
                { label: t('about.based'), value: t('about.basedValue') },
                { label: t('about.mediums'), value: t('about.mediumsValue') },
                { label: t('about.focus'), value: t('about.focusValue') },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-gold pl-6">
                  <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
                    {item.label}
                  </p>
                  <p className="mt-3 font-serif text-xl text-ink md:text-2xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
