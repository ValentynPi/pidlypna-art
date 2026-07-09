import { motion } from 'framer-motion';
import { photos } from '../../data/images';
import { Button } from '../ui/Button';
import { LazyImage } from '../ui/LazyImage';

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[600px] items-end overflow-hidden">
      <div className="absolute inset-0">
        <LazyImage
          src={photos.treeStudio}
          alt="Viktoria Pidlypna's studio — duality tree painting in natural light"
          className="scale-105"
          wrapperClassName="h-full w-full"
        />
        <div className="grain-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="mb-4 text-sm tracking-[0.3em] text-cream/70 uppercase">
            Contemporary Ukrainian Artist
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight text-cream md:text-6xl lg:text-7xl">
            Viktoria Pidlypna
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/80 md:text-xl">
            Living and creating in Spain — where Ukrainian tradition meets
            Mediterranean light
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button to="/gallery" variant="primary">
            View Artwork
          </Button>
          <Button to="/workshops" variant="secondary">
            Workshops
          </Button>
          <Button to="/exhibitions" variant="secondary">
            Exhibitions
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-cream/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
