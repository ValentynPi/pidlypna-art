import type { NotableEncounter } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { OrientedPhoto } from '../ui/OrientedPhoto';
import { PhotoGalleryCell } from '../ui/PhotoGalleryCell';
import { useLanguage } from '../../i18n/LanguageContext';

interface EncounterListProps {
  encounters: NotableEncounter[];
}

function encounterImages(item: NotableEncounter): { src: string; alt: string }[] {
  if (item.photos?.length) return item.photos;
  if (item.image) {
    return [{ src: item.image, alt: item.imageAlt ?? item.title }];
  }
  return [];
}

export function EncounterList({ encounters }: EncounterListProps) {
  const { t } = useLanguage();

  if (encounters.length === 0) {
    return (
      <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-ink-soft">
        {t('encounters.empty')}
      </p>
    );
  }

  return (
    <div className="space-y-px bg-ink/10">
      {encounters.map((item, index) => {
        const images = encounterImages(item);
        const multiPhoto = images.length > 1;

        return (
          <ScrollReveal key={item.id} delay={index * 0.06}>
            <article className="grid gap-8 bg-cream p-8 md:grid-cols-12 md:gap-10 md:p-10">
              {images.length > 0 ? (
                multiPhoto ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-5">
                    {images.map((photo, photoIndex) => (
                      <PhotoGalleryCell
                        key={`${item.id}-${photoIndex}`}
                        src={photo.src}
                        alt={photo.alt}
                        delay={0}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="md:col-span-4">
                    <OrientedPhoto src={images[0]!.src} alt={images[0]!.alt} />
                  </div>
                )
              ) : null}
              <div
                className={
                  images.length > 0
                    ? `flex flex-col justify-center ${multiPhoto ? 'md:col-span-7' : 'md:col-span-8'}`
                    : 'md:col-span-12'
                }
              >
                <p className="text-[0.65rem] tracking-[0.2em] text-terracotta uppercase">
                  {item.date}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{item.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{item.withWhom}</p>
                {item.description ? (
                  <p className="mt-4 text-sm leading-relaxed text-ink md:text-base">
                    {item.description}
                  </p>
                ) : null}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs tracking-[0.2em] text-terracotta uppercase transition-colors hover:text-gold"
                  >
                    {t('encounters.readMore')}
                  </a>
                ) : null}
              </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
