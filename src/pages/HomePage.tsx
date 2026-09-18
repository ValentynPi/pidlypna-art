import { PageMeta } from '../components/ui/PageMeta';
import { Hero } from '../components/home/Hero';
import { CollectionsStrip } from '../components/home/CollectionsStrip';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { HandLine } from '../components/ui/HandLine';
import { LazyImage } from '../components/ui/LazyImage';
import { photos } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';


export function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta
        title={t('home.metaTitle')}
        description={t('home.metaDesc')}
      />
      <Hero />

      <section className="relative overflow-hidden bg-blush">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[600px]">
            <LazyImage
              src={photos.tigerBloom}
              alt="Tiger Bloom — surreal painting by Viktoria Paladios"
              className="object-cover"
              wrapperClassName="h-full w-full"
            />
            <div className="absolute inset-0 bg-teal-deep/20" />
          </div>
          <div className="flex flex-col justify-center section-padding">
            <ScrollReveal>
              <blockquote className="font-serif text-xl leading-snug text-ink sm:text-2xl md:text-3xl lg:text-4xl">
                <span className="text-gold">&ldquo;</span>
                {t('home.quote')}
                <span className="text-gold">&rdquo;</span>
              </blockquote>
              <HandLine variant="swirl" className="mt-8 w-32 text-terracotta" />
              <p className="mt-6 text-xl leading-[0.95] md:text-2xl">
                <span className="name-viktoria block !text-ink">Viktoria Paladios</span>
                <span className="name-art mt-1 block text-[0.92em]">Art</span>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CollectionsStrip />

      <section className="bg-teal-deep px-6 py-20 text-center md:px-10 lg:px-16">
        <ScrollReveal>
          <p className="text-[0.65rem] tracking-[0.35em] text-gold uppercase">
            {t('home.commissions')}
          </p>
          <h2 className="display-heading mt-6 text-3xl text-cream md:text-5xl">
            {t('home.together')}
          </h2>
          <Button to="/contact" variant="gold" className="mt-10">
            {t('home.getInTouch')}
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
