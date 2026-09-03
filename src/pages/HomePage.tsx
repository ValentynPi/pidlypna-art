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

      <section className="section-padding mx-auto max-w-[90rem]">
        <div className="mx-auto grid max-w-xl gap-6">
          {[
            {
              title: t('home.workshopsTitle'),
              desc: t('home.workshopsDesc'),
              to: '/workshops',
              num: '01',
              clickable: true,
            },
          ].map((item, i) => (
            <ScrollReveal key={item.to} delay={i * 0.1}>
              <div className="group relative border border-ink/10 bg-warm p-8 transition-all duration-500 hover:border-gold/40 hover:bg-cream">
                <span className="font-serif text-4xl text-ink/10 transition-colors group-hover:text-gold/30">
                  {item.num}
                </span>
                <h3 className="display-heading mt-4 text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {item.desc}
                </p>
                {item.clickable ? (
                  <Button to={item.to} variant="ghost" className="mt-8 border-0 px-0">
                    {t('home.discover')}
                  </Button>
                ) : (
                  <span
                    className="mt-8 inline-flex cursor-default items-center gap-2 px-0 py-3.5 text-xs font-medium tracking-[0.2em] text-ink uppercase"
                    aria-hidden
                  >
                    {t('home.discover')}
                    <span aria-hidden>→</span>
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

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
