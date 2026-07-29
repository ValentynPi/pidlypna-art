import { PageMeta } from '../components/ui/PageMeta';
import { Hero } from '../components/home/Hero';
import { FeaturedGrid } from '../components/home/FeaturedGrid';
import { CollectionsStrip } from '../components/home/CollectionsStrip';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { HandLine } from '../components/ui/HandLine';
import { LazyImage } from '../components/ui/LazyImage';
import { featuredArtworks } from '../data/artworks';
import { photos } from '../data/images';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Home"
        description="Pidlypna Art — Contemporary Ukrainian art living and creating in Spain. Explore paintings, workshops, and exhibitions."
      />
      <Hero />
      <FeaturedGrid artworks={featuredArtworks} />

      <section className="relative overflow-hidden bg-blush">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-[600px]">
            <LazyImage
              src={photos.tigerBloom}
              alt="Tiger Bloom — surreal painting by Pidlypna Art"
              wrapperClassName="h-full w-full"
            />
            <div className="absolute inset-0 bg-teal-deep/20" />
          </div>
          <div className="flex flex-col justify-center section-padding">
            <ScrollReveal>
              <blockquote className="font-serif text-2xl leading-snug text-ink md:text-3xl lg:text-4xl">
                <span className="text-gold">&ldquo;</span>
                I paint the distance between where I come from and where I
                stand now — every canvas a bridge, every color a word in a
                language I am still learning to speak.
                <span className="text-gold">&rdquo;</span>
              </blockquote>
              <HandLine variant="swirl" className="mt-8 w-32 text-terracotta" />
              <p className="mt-6 font-serif text-sm leading-snug tracking-[0.15em] text-terracotta uppercase md:text-base">
                Viktoria
                <br />
                <span className="italic text-gold">Pidlypna</span>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CollectionsStrip />

      <section className="section-padding mx-auto max-w-[90rem]">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Workshops',
              desc: 'Intimate painting sessions in Castellón — all levels welcome.',
              to: '/workshops',
              num: '01',
            },
            {
              title: 'Exhibitions',
              desc: 'From Castellón to Madrid, Provence to Barcelona.',
              to: '/exhibitions',
              num: '02',
            },
            {
              title: 'Creative Journey',
              desc: 'A visual diary of places that shape her art.',
              to: '/journey',
              num: '03',
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
                <Button to={item.to} variant="ghost" className="mt-8 border-0 px-0">
                  Discover
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-teal-deep px-6 py-20 text-center md:px-10 lg:px-16">
        <ScrollReveal>
          <p className="text-[0.65rem] tracking-[0.35em] text-gold uppercase">
            Commissions & Inquiries
          </p>
          <h2 className="display-heading mt-6 text-3xl text-cream md:text-5xl">
            Let&apos;s create something together
          </h2>
          <Button to="/contact" variant="gold" className="mt-10">
            Get in Touch
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
