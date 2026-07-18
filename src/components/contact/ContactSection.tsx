import { useState, type FormEvent } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { SectionLabel } from '../ui/SectionLabel';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const links = [
    { label: 'Location', value: 'Castellón, Spain' },
    {
      label: 'Email',
      value: 'hello@pidlypna.art',
      href: 'mailto:hello@pidlypna.art',
    },
    {
      label: 'Instagram',
      value: '@pidlypna.art',
      href: 'https://instagram.com',
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
                  <label htmlFor={field.id} className="mb-2 block text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    className="w-full border-b border-ink/15 bg-transparent py-3 text-ink transition-colors focus:border-gold focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mb-2 block text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full resize-none border-b border-ink/15 bg-transparent py-3 text-ink transition-colors focus:border-gold focus:outline-none"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
