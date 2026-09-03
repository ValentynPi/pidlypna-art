import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { photos } from '../../data/images';
import { Button } from '../ui/Button';
import { LazyImage } from '../ui/LazyImage';
import { HandLine } from '../ui/HandLine';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink lg:min-h-screen"
    >
      {/* Mobile: full-bleed painting behind text */}
      <div className="absolute inset-0 lg:hidden">
        <LazyImage
          src={photos.floralCrownClean}
          alt="Floral Crown painting by Viktoria Paladios"
          className="h-full w-full scale-105 object-cover object-[70%_center]"
          wrapperClassName="h-full w-full"
        />
        <div className="grain-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/35" />
      </div>

      <div className="relative grid min-h-[100svh] lg:min-h-screen lg:grid-cols-[42%_58%]">
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-8 sm:pb-10 md:px-12 md:pb-12 lg:min-h-screen lg:justify-end lg:px-16 lg:pb-14 lg:pt-0"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[18rem] text-[0.6rem] font-medium tracking-[0.22em] text-gold uppercase sm:max-w-none sm:text-[0.65rem] sm:tracking-[0.35em] lg:mt-auto lg:pt-[18vh] lg:tracking-[0.4em]"
          >
            Contemporary Ukrainian Artist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 text-[clamp(2.75rem,12vw,3.75rem)] leading-[0.95] sm:mt-10 sm:text-5xl md:mt-14 md:text-6xl lg:mt-16 lg:text-7xl xl:text-8xl"
          >
            <span className="name-viktoria block">Viktoria Paladios</span>
            <span className="name-art mt-1 block text-[0.92em]">Art</span>
          </motion.h1>

          <HandLine variant="swirl" className="mt-5 w-28 text-gold/70 sm:mt-8 sm:w-40" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 max-w-[20rem] text-[0.95rem] leading-relaxed text-cream/70 sm:mt-8 sm:max-w-sm sm:text-base md:text-lg"
          >
            Living and creating in Spain — where Ukrainian tradition meets
            Mediterranean light
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap"
          >
            <Button to="/gallery" variant="gold" className="w-full sm:w-auto">
              View Artwork
            </Button>
            <Button to="/workshops" variant="secondary" className="w-full sm:w-auto">
              Workshops
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 hidden text-xs tracking-[0.3em] text-cream/30 uppercase lg:block"
          >
            Castellón de la Plana · Spain
          </motion.p>
        </motion.div>

        {/* Desktop painting panel */}
        <div className="relative hidden min-h-screen lg:block">
          <motion.div style={{ y: imageY }} className="absolute inset-0">
            <LazyImage
              src={photos.floralCrownClean}
              alt="Floral Crown painting by Viktoria Paladios"
              className="scale-105 object-cover"
              wrapperClassName="h-full w-full"
            />
            <div className="grain-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/40 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
