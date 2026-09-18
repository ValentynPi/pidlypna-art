import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { photos } from '../../data/images';
import { Button } from '../ui/Button';
import { LazyImage } from '../ui/LazyImage';
import { HandLine } from '../ui/HandLine';
import { useLanguage } from '../../i18n/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative bg-ink lg:min-h-screen lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <LazyImage
          src={photos.floralCrownClean}
          alt="Floral Crown painting by Viktoria Paladios"
          className="h-full w-full object-cover object-center"
          wrapperClassName="h-full w-full"
        />
        <div className="grain-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/80 to-ink/45" />
      </div>

      <div className="relative grid lg:min-h-screen lg:grid-cols-[42%_58%]">
        <div className="relative z-10 flex flex-col justify-end px-5 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-32 sm:pb-10 md:px-12 md:pb-12 lg:min-h-screen lg:justify-end lg:px-16 lg:pt-0 lg:pb-14">
          <p className="max-w-[18rem] text-[0.6rem] font-medium tracking-[0.22em] text-gold uppercase sm:max-w-none sm:text-[0.65rem] sm:tracking-[0.35em] lg:mt-auto lg:pt-[18vh] lg:tracking-[0.4em]">
            {t('hero.tag')}
          </p>

          <h1 className="mt-5 text-[clamp(2.4rem,11vw,3.75rem)] leading-[0.95] sm:mt-10 sm:text-5xl md:mt-14 md:text-6xl lg:mt-16 lg:text-7xl xl:text-8xl">
            <span className="name-viktoria block">Viktoria Paladios</span>
            <span className="name-art mt-1 block text-[0.92em]">Art</span>
          </h1>

          <HandLine variant="swirl" className="mt-5 w-28 text-gold/70 sm:mt-8 sm:w-40" />

          <p className="mt-5 max-w-[20rem] text-[0.95rem] leading-relaxed text-cream/70 sm:mt-8 sm:max-w-sm sm:text-base md:text-lg">
            {t('hero.intro')}
          </p>

          <div className="relative z-20 mt-7 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button to="/gallery" variant="gold" className="w-full sm:w-auto">
              {t('hero.viewArtwork')}
            </Button>
            <Button to="/contact" variant="secondary" className="w-full sm:w-auto">
              {t('nav.contact')}
            </Button>
          </div>

          <p className="mt-16 hidden text-xs tracking-[0.3em] text-cream/30 uppercase lg:block">
            {t('hero.place')}
          </p>
        </div>

        <div className="relative hidden min-h-screen lg:block">
          <motion.div style={{ y: imageY }} className="pointer-events-none absolute inset-0">
            <LazyImage
              src={photos.floralCrownClean}
              alt="Floral Crown painting by Viktoria Paladios"
              className="object-cover"
              wrapperClassName="h-full w-full"
            />
            <div className="grain-overlay pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink via-ink/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
