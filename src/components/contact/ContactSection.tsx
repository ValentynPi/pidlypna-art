import { useState, type FormEvent } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { SectionLabel } from '../ui/SectionLabel';

const CONTACT_EMAIL = 'hello@viktoria-p.art';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export function ContactSection() {
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
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { label: 'Location', value: 'Castellón, Spain' },
    {
      label: 'Email',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      label: 'Instagram',
      value: '@viktoria.paladios.art',
      href: 'https://instagram.com/viktoria.paladios.art',
      external: true,
    },
    {
      label: 'WhatsApp',
      value: 'Send a message',
      href: 'https://wa.me/34000000000',
      external: true,
    },
  ];

  return (
    <section className="mx-auto max-w-[90rem] section-padding">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <ScrollReveal>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="display-heading mt-6 text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s connect
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            For commissions, workshop bookings, exhibition inquiries, or simply
            to say hello — I&apos;d love to hear from you.
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
                <p className="display-heading text-3xl">Thank you</p>
                <p className="mt-4 text-ink-soft">
                  Your message has been received. I&apos;ll be in touch soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Name', type: 'text' },
                { id: 'email', label: 'Email', type: 'email' },
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
                  Message
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
                {loading ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
