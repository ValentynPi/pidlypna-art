import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl text-ink">Viktoria Pidlypna</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Contemporary Ukrainian artist living and creating in Castellón, Spain.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-widest text-terracotta uppercase">Explore</h4>
            <ul className="mt-4 space-y-2">
              {[
                { to: '/gallery', label: 'Gallery' },
                { to: '/workshops', label: 'Workshops' },
                { to: '/exhibitions', label: 'Exhibitions' },
                { to: '/journey', label: 'Creative Journey' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-soft transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest text-terracotta uppercase">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>Castellón, Spain</li>
              <li>
                <a
                  href="mailto:hello@viktoriapidlypna.com"
                  className="transition-colors hover:text-terracotta"
                >
                  hello@viktoriapidlypna.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-terracotta"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink-soft md:flex-row">
          <p>© {new Date().getFullYear()} Viktoria Pidlypna. All rights reserved.</p>
          <p className="italic">Art bridges what words cannot.</p>
        </div>
      </div>
    </footer>
  );
}
