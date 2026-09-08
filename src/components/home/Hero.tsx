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
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink lg:min-h-[100dvh]"
    >
      {/* One full-bleed painting plane — mobile and desktop */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <LazyImage
          src={photos.floralCrownClean}
          alt="Floral Crown painting by Viktoria Paladios"
          className="h-full w-full scale-105 object-cover object-[68%_center] lg:object-[60%_center]"
          wrapperClassName="h-full w-full"
        />
        <div className="grain-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/25 lg:bg-linear-to-r lg:from-ink lg:via-ink/55 lg:to-ink/10" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex min-h-[100svh] max-w-3xl flex-col justify-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 sm:px-8 sm:pb-12 md:px-12 lg:min-h-[100dvh] lg:px-16 lg:pb-16 xl:px-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-[18rem] text-[0.65rem] font-medium tracking-[0.28em] text-gold uppercase sm:max-w-none sm:tracking-[0.36em]"
        >
          {t('hero.tag')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-5 text-[clamp(3rem,11vw,6.5rem)] leading-[0.92] sm:mt-7"
        >
          <span className="name-viktoria block drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            Viktoria Paladios
          </span>
          <span className="name-art mt-2 block text-[0.88em]">Art</span>
        </motion.h1>

        <HandLine variant="swirl" className="mt-5 w-28 text-gold/75 sm:mt-7 sm:w-40" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-5 max-w-[22rem] text-base leading-relaxed text-cream/75 sm:mt-7 sm:max-w-md sm:text-lg"
        >
          {t('hero.intro')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row"
        >
          <Button to="/gallery" variant="gold" className="w-full sm:w-auto">
            {t('hero.viewArtwork')}
          </Button>
          <Button to="/contact" variant="secondary" className="w-full sm:w-auto">
            {t('nav.contact')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
