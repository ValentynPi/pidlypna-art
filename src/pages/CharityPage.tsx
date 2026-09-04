import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { useLanguage } from '../i18n/LanguageContext';
import { photos } from '../data/images';

const eventPhotos = [
  {
    src: photos.charityPetrykivka2024_1,
    alt: 'Petrykivka paintings from the charity master class',
  },
  {
    src: photos.charityPetrykivka2024_2,
    alt: 'Participants painting Petrykivka outdoors',
  },
  {
    src: photos.charityPetrykivka2024_3,
    alt: 'Charity Petrykivka workshop at long tables in the park',
  },
  {
    src: photos.charityPetrykivka2024_4,
    alt: 'Group painting session under the trees',
  },
];

export function CharityPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta
        title={t('charity.metaTitle')}
        description={t('charity.eventTitle')}
      />
      <PageHeader label={t('charity.label')} title={t('charity.title')} />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <ScrollReveal>
          <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
            {t('charity.eventDate')}
          </p>
          <h2 className="display-heading mt-4 max-w-3xl text-3xl md:text-4xl">
            {t('charity.eventTitle')}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {eventPhotos.map((photo, index) => (
            <ScrollReveal key={photo.src} delay={index * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden bg-ink sm:aspect-[3/4]">
                <LazyImage
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
