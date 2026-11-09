import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { HandLine } from '../components/ui/HandLine';
import { photos } from '../data/images';
import { social } from '../data/social';
import { useLanguage } from '../i18n/LanguageContext';
export function AboutPage() {
  const { t } = useLanguage();

  const p1 = t('about.p1');
  const p2 = t('about.p2');
  const pTechnique = t('about.pTechnique');
  const quote = t('about.quote');
  const p3 = t('about.p3');
  const p4 = t('about.p4');
  const socialCta = t('about.socialCta');

  const socialLinks = [
    { href: social.instagram.href, label: t('contact.instagram') },
    { href: social.facebook.href, label: t('contact.facebook') },
    { href: social.youtube.href, label: t('contact.youtube') },
    { href: social.tiktok.href, label: t('contact.tiktok') },
  ];

  return (
    <>
      <PageMeta
        title={t('about.metaTitle')}
        description={t('about.metaDesc')}
        canonical="/about"
      />

      <PageHeader
        label={t('about.label')}
        title={t('about.title')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-16 md:px-10 lg:px-16">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-5">
            <div className="image-frame">
              <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                <LazyImage
                  src={photos.floralCrownClean}
                  alt="Floral Crown — portrait painting by Viktoria Paladios"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-8 text-base leading-[1.8] text-ink-soft lg:col-span-7 md:text-lg">
            {p1 ? (
              <ScrollReveal delay={0.1}>
                <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:text-gold first-letter:leading-none">
                  {p1}
                </p>
              </ScrollReveal>
            ) : null}

            {p2 ? (
              <ScrollReveal delay={0.15}>
                <p>{p2}</p>
              </ScrollReveal>
            ) : null}

            {pTechnique ? (
              <ScrollReveal delay={0.2}>
                <p>{pTechnique}</p>
              </ScrollReveal>
            ) : null}
          </div>
        </div>
      </section>

      {quote ? (
        <section className="relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="absolute inset-0 opacity-20">
            <LazyImage
              src={photos.ukrainian_symbolism_heritage_1}
              alt=""
              wrapperClassName="h-full w-full"
            />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
            <ScrollReveal>
              <HandLine variant="circle" className="mx-auto mb-8 h-16 w-16 text-gold" />
              <blockquote className="font-serif text-2xl leading-relaxed text-cream italic md:text-4xl md:leading-snug">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-8 text-base leading-[1.8] text-ink-soft md:text-lg">
          {p3 ? (
            <ScrollReveal>
              <p>{p3}</p>
            </ScrollReveal>
          ) : null}
          {p4 ? (
            <ScrollReveal delay={0.1}>
              <p>{p4}</p>
            </ScrollReveal>
          ) : null}
          {socialCta ? (
            <ScrollReveal delay={0.15}>
              <p className="text-base leading-relaxed text-ink-soft/80 md:text-lg">
                {socialCta}{' '}
                {socialLinks.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 && ' · '}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terracotta underline-offset-4 transition-colors hover:text-gold hover:underline"
                    >
                      {link.label}
                    </a>
                  </span>
                ))}
              </p>
            </ScrollReveal>
          ) : null}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream-dark">
        <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16">
          <ScrollReveal>
            <div className="grid gap-12 md:grid-cols-3">
              {[
                { label: t('about.based'), value: t('about.basedValue') },
                { label: t('about.mediums'), value: t('about.mediumsValue') },
                { label: t('about.focus'), value: t('about.focusValue') },
              ]
                .filter((item) => item.label.trim() || item.value.trim())
                .map((item) => (
                  <div key={item.label || item.value} className="border-l-2 border-gold pl-6">
                    {item.label ? (
                      <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
                        {item.label}
                      </p>
                    ) : null}
                    {item.value ? (
                      <p className="mt-3 font-serif text-xl text-ink md:text-2xl">{item.value}</p>
                    ) : null}
                  </div>
                ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
