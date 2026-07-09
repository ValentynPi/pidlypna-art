import { useState, type FormEvent } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-16 lg:grid-cols-2">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
            Get in Touch
          </p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
            Let&apos;s connect
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            For commissions, workshop bookings, exhibition inquiries, or simply
            to say hello — I&apos;d love to hear from you.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-sm font-medium text-ink">Location</p>
                <p className="text-ink-soft">Castellón, Spain</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-xl">✉️</span>
              <div>
                <p className="text-sm font-medium text-ink">Email</p>
                <a
                  href="mailto:hello@viktoriapidlypna.com"
                  className="text-ink-soft transition-colors hover:text-terracotta"
                >
                  hello@viktoriapidlypna.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-xl">📷</span>
              <div>
                <p className="text-sm font-medium text-ink">Instagram</p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft transition-colors hover:text-terracotta"
                >
                  @viktoriapidlypna
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-xl">💬</span>
              <div>
                <p className="text-sm font-medium text-ink">WhatsApp</p>
                <a
                  href="https://wa.me/34000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft transition-colors hover:text-terracotta"
                >
                  Send a message
                </a>
              </div>
            </li>
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {submitted ? (
            <div className="flex h-full items-center justify-center border border-sage/30 bg-sage/5 p-12 text-center">
              <div>
                <p className="font-serif text-2xl text-ink">Thank you!</p>
                <p className="mt-3 text-ink-soft">
                  Your message has been received. I&apos;ll be in touch soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-ink-soft">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full border border-ink/15 bg-transparent px-4 py-3 text-ink transition-colors focus:border-terracotta focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-ink-soft">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full border border-ink/15 bg-transparent px-4 py-3 text-ink transition-colors focus:border-terracotta focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-ink-soft">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full resize-none border border-ink/15 bg-transparent px-4 py-3 text-ink transition-colors focus:border-terracotta focus:outline-none"
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
