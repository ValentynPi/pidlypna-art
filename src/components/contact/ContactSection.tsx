import { useState, type FormEvent } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { SectionLabel } from '../ui/SectionLabel';
import { CONTACT_EMAIL, social } from '../../data/social';
import { useLanguage } from '../../i18n/LanguageContext';

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: 'New contact form message — viktoria-p.art',
          _template: 'table',
        }),
      });

      const data = (await response.json()) as { success?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.message || t('contact.error'));
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('contact.error'),
      );
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { label: t('contact.location'), value: t('contact.locationValue') },
    {
      label: t('contact.email'),
      value: CONTACT_EMAIL,
      href: social.email.href,
    },
    {
      label: t('contact.instagram'),
      value: social.instagram.handle,
      href: social.instagram.href,
      external: true,
    },
    {
      label: t('contact.youtube'),
      value: t('contact.youtubeValue'),
      href: social.youtube.href,
      external: true,
    },
    {
      label: t('contact.tiktok'),
      value: t('contact.tiktokValue'),
      href: social.tiktok.href,
      external: true,
    },
    {
      label: t('contact.facebook'),
      value: t('contact.facebookValue'),
      href: social.facebook.href,
      external: true,
    },
    {
      label: t('contact.whatsapp'),
      value: t('contact.whatsappValue'),
      href: 'https://wa.me/34000000000',
      external: true,
    },
  ];

  return (
    <section className="mx-auto max-w-[90rem] section-padding">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <ScrollReveal>
          <SectionLabel>{t('contact.label')}</SectionLabel>
          <h2 className="display-heading mt-6 text-4xl md:text-5xl lg:text-6xl">
            {t('contact.title')}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            {t('contact.intro')}
          </p>

          <dl className="mt-12 space-y-6">
            {links.map((link) => (
              <div key={link.label} className="border-l-2 border-gold pl-5">
                <dt className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
                  {link.label}
                </dt>
                <dd className="mt-1">
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-ink-soft transition-colors hover:text-terracotta"
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="text-ink-soft">{link.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {submitted ? (
            <div className="flex h-full min-h-[400px] items-center justify-center border border-sage/20 bg-sage/5 p-12 text-center">
              <div>
                <p className="display-heading text-3xl">{t('contact.thanks')}</p>
                <p className="mt-4 text-ink-soft">
                  {t('contact.thanksBody')}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: t('contact.name'), type: 'text' },
                { id: 'email', label: t('contact.email'), type: 'email' },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [field.id]: e.target.value }))
                    }
                    disabled={loading}
                    className="w-full border-b border-ink/15 bg-transparent py-3 text-ink transition-colors focus:border-gold focus:outline-none disabled:opacity-50"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase"
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  disabled={loading}
                  className="w-full resize-none border-b border-ink/15 bg-transparent py-3 text-ink transition-colors focus:border-gold focus:outline-none disabled:opacity-50"
                />
              </div>

              {error && (
                <p className="text-sm text-terracotta" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
