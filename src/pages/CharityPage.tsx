import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { useLanguage } from '../i18n/LanguageContext';
import { photos } from '../data/images';

const CHILDHOOD_INSTAGRAM_URL = 'https://www.instagram.com/reel/DUQl9HyCO8i/';

type CharityPhoto = { src: string; alt: string };

type CharityEvent = {
  dateKey?: string;
  titleKey: string;
  photos: CharityPhoto[];
  instagramUrl?: string;
};

const events: CharityEvent[] = [
  {
    dateKey: 'charity.event1Date',
    titleKey: 'charity.event1Title',
    photos: [
      {
        src: photos.charityPysanka2025_1,
        alt: 'Pysankarstvo charity workshop with candles and eggs',
      },
      {
        src: photos.charityPysanka2025_2,
        alt: 'Instructor with participants at the pysanka master class',
      },
      {
        src: photos.charityPysanka2025_3,
        alt: 'Children decorating pysanky at long workshop tables',
      },
      {
        src: photos.charityPysanka2025_4,
        alt: 'Dyeing eggs during the charity pysankarstvo class',
      },
    ],
  },
  {
    titleKey: 'charity.event2Title',
    instagramUrl: CHILDHOOD_INSTAGRAM_URL,
    photos: [
      {
        src: photos.charityChildhoodWithoutWar_1,
        alt: 'Child painting a Ukrainian flag drawing at the workshop',
      },
      {
        src: photos.charityChildhoodWithoutWar_2,
        alt: 'Children drawing together at Childhood without war master class',
      },
      {
        src: photos.charityChildhoodWithoutWar_3,
        alt: 'Handprints on a blue-and-yellow Ukrainian flag painting',
      },
      {
        src: photos.charityChildhoodWithoutWar_4,
        alt: 'Boy painting a dove on the Ukrainian flag',
      },
      {
        src: photos.charityChildhoodWithoutWar_5,
        alt: 'Instructor guiding children with markers and paints',
      },
    ],
  },
  {
    titleKey: 'charity.event3Title',
    photos: [
      {
        src: photos.charityIndependenceOrnaments_1,
        alt: 'Children painting wooden ornaments under a park tent',
      },
      {
        src: photos.charityIndependenceOrnaments_2,
        alt: 'Artist at the Independence Day ornaments charity class',
      },
      {
        src: photos.charityIndependenceOrnaments_3,
        alt: 'Heart ornament painted in Ukrainian colors',
      },
      {
        src: photos.charityIndependenceOrnaments_4,
        alt: 'Painted wooden ornaments and art supplies on the table',
      },
      {
        src: photos.charityIndependenceOrnaments_5,
        alt: 'Blue and yellow bird ornament with ribbons',
      },
    ],
  },
  {
    dateKey: 'charity.event4Date',
    titleKey: 'charity.event4Title',
    photos: [
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
    ],
  },
];

export function CharityPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageMeta
        title={t('charity.metaTitle')}
        description={t('charity.event1Title')}
      />
      <PageHeader label={t('charity.label')} title={t('charity.title')} />

      <section className="mx-auto max-w-[90rem] space-y-24 px-6 pb-24 md:px-10 lg:px-16">
        {events.map((event) => (
          <div key={event.titleKey}>
            <ScrollReveal>
              {event.dateKey ? (
                <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
                  {t(event.dateKey)}
                </p>
              ) : null}
              <h2
                className={`display-heading max-w-3xl text-3xl md:text-4xl ${
                  event.dateKey ? 'mt-4' : ''
                }`}
              >
                {t(event.titleKey)}
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

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
              {event.photos.map((photo, index) => (
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
          </div>
        ))}
      </section>
    </>
  );
}
