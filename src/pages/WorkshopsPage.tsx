import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { Button } from '../components/ui/Button';
import { workshops, workshopPhotos } from '../data/workshops';

export function WorkshopsPage() {
  return (
    <>
      <PageMeta
        title="Workshops"
        description="Join Viktoria Pidlypna for painting workshops in Castellón, Spain — floral oils, Petrykivka, plein air, and more."
      />

      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              Workshops
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">
              Paint together
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Intimate, hands-on painting sessions in Castellón and along the
              coast. Whether you&apos;re picking up a brush for the first time or
              deepening your practice, there&apos;s a place for you at the easel.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <ScrollReveal>
          <h2 className="mb-8 font-serif text-2xl text-ink md:text-3xl">
            The studio experience
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {workshopPhotos.map((photo, index) => (
            <ScrollReveal key={photo.id} delay={index * 0.08}>
              <div className="group relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <LazyImage
                  src={photo.image}
                  alt={photo.imageAlt}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-ink/60 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-xs text-cream">{photo.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <ScrollReveal>
            <h2 className="mb-4 font-serif text-2xl text-ink md:text-3xl">
              Upcoming dates
            </h2>
            <p className="mb-10 max-w-xl text-ink-soft">
              All materials are provided unless noted. Group sizes are kept small
              for personal attention. To book or inquire, use the contact form or
              reach out via WhatsApp.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {workshops.map((workshop, index) => (
              <ScrollReveal key={workshop.id} delay={index * 0.08}>
                <div className="grid gap-6 border border-ink/10 bg-cream p-6 md:grid-cols-4 md:gap-8 md:p-8">
                  <div className="md:col-span-1">
                    <p className="text-xs tracking-widest text-terracotta uppercase">
                      {workshop.date}
                    </p>
                    <p className="mt-1 text-sm text-sage">{workshop.location}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-serif text-xl text-ink md:text-2xl">
                      {workshop.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {workshop.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between md:col-span-1 md:items-end">
                    <span className="text-xs tracking-wide text-ink-soft uppercase">
                      {workshop.level}
                    </span>
                    <Button to="/contact" variant="ghost" className="mt-4 md:mt-0">
                      Book / Inquire
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl text-ink md:text-3xl">
              What to expect
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Each workshop begins with a brief demonstration, followed by guided
              painting time with individual feedback. You&apos;ll leave with a
              finished piece and techniques you can continue exploring at home.
              Comfortable clothes recommended — painting is a joyful mess.
            </p>
            <Button to="/contact" variant="primary" className="mt-8">
              Get in Touch
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
