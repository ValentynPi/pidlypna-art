import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
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
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-ink">
      <div className="grid min-h-screen lg:grid-cols-[42%_58%]">
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 flex min-h-[45vh] flex-col justify-end px-8 pb-8 pt-16 md:min-h-[50vh] md:px-12 md:pb-10 md:pt-20 lg:min-h-screen lg:px-16 lg:pb-14 lg:pt-0"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[0.65rem] font-medium tracking-[0.4em] text-gold uppercase lg:mt-auto lg:pt-[18vh]"
          >
            Contemporary Ukrainian Artist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="display-heading mt-12 text-5xl leading-[0.95] md:mt-14 lg:mt-16 md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="italic text-gold">Viktoria</span>
            <br />
            <span className="text-white">Pidlypna</span>
          </motion.h1>

          <HandLine variant="swirl" className="mt-8 w-40 text-gold/70" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-sm text-base leading-relaxed text-cream/60 md:text-lg"
          >
            Living and creating in Spain — where Ukrainian tradition meets
            Mediterranean light
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button to="/gallery" variant="gold">
              View Artwork
            </Button>
            <Button to="/workshops" variant="secondary">
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

        <div className="relative min-h-[50vh] lg:min-h-screen">
          <motion.div style={{ y: imageY }} className="absolute inset-0">
            <LazyImage
              src={photos.floralCrownClean}
              alt="Floral Crown painting by Pidlypna_Art"
              className="scale-105 object-cover"
              wrapperClassName="h-full w-full"
            />
            <div className="grain-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-ink/20 lg:bg-transparent lg:bg-linear-to-r lg:from-ink lg:via-ink/40 lg:to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-8 hidden md:block lg:bottom-16 lg:left-auto lg:right-8"
          >
            <LinkCard to="/exhibitions" label="Upcoming" title="Roots & Horizons" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LinkCard({
  to,
  label,
  title,
}: {
  to: string;
  label: string;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="group block border border-cream/20 bg-ink/60 px-6 py-4 backdrop-blur-sm transition-colors hover:border-gold/40"
    >
      <p className="text-[0.6rem] tracking-[0.3em] text-gold uppercase">{label}</p>
      <p className="mt-1 font-serif text-lg text-cream group-hover:text-gold">{title}</p>
    </Link>
  );
}
