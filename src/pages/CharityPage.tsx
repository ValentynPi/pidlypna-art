import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { useLanguage } from '../i18n/LanguageContext';
import { getCharityEventsForPage } from '../data/pageContent';
export function CharityPage() {
  const { t, language } = useLanguage();
  const events = getCharityEventsForPage(language, t);

  return (
    <>
      <PageMeta
        title={t('charity.metaTitle')}
        description={t('charity.event1Title')}
        canonical="/charity"
      />
      <PageHeader label={t('charity.label')} title={t('charity.title')} />

      <section className="mx-auto max-w-[90rem] space-y-24 px-6 pb-24 md:px-10 lg:px-16">
        {events.map((event) => (
          <div key={event.id}>
            <ScrollReveal>
              {event.date ? (
                <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
                  {event.date}
                </p>
              ) : null}
              <h2
                className={`display-heading max-w-3xl text-3xl md:text-4xl ${
                  event.date ? 'mt-4' : ''
                }`}
              >
                {event.title}
              </h2>
              {event.instagramUrl ? (
                <a
                  href={event.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-ink-soft transition-colors hover:text-terracotta"
                >
                  {t('charity.watchOnInstagram')}
                </a>
              ) : null}
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {event.photos.map((photo, index) => (
                <ScrollReveal key={`${event.id}-${index}`} delay={index * 0.06}>
                  <LazyImage
                    src={photo.src}
                    alt={photo.alt}
                    wrapperClassName="w-full"
                    className="!h-auto !w-full !max-h-none"
                    objectFit="cover"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
