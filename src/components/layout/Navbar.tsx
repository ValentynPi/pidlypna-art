import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/exhibitions', label: 'Exhibitions' },
  { to: '/journey', label: 'Journey' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path));

  const onDarkHero = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink/5 bg-cream/30 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))] transition-all duration-500 sm:px-6 sm:py-6 md:px-10 lg:px-16 ${
          scrolled ? 'py-3 sm:py-4' : ''
        }`}
      >
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center border font-serif text-sm transition-colors ${
              onDarkHero && !scrolled
                ? 'border-cream/30 text-cream group-hover:border-gold group-hover:text-gold'
                : 'border-ink/20 text-ink group-hover:border-terracotta group-hover:text-terracotta'
            }`}
          >
            VP
          </span>
          <span
            className={`truncate font-serif text-base tracking-wide transition-colors sm:text-lg ${
              onDarkHero && !scrolled ? 'text-white' : 'text-ink'
            }`}
          >
            Viktoria Paladios Art
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                  isActive(link.to)
                    ? onDarkHero && !scrolled
                      ? 'text-gold'
                      : 'text-terracotta'
                    : onDarkHero && !scrolled
                      ? 'text-cream/70 hover:text-cream'
                      : 'text-ink-soft hover:text-ink'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-4 right-4 h-px ${
                      onDarkHero && !scrolled ? 'bg-gold' : 'bg-terracotta'
                    }`}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/gallery"
          className={`hidden border px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors lg:block ${
            onDarkHero && !scrolled
              ? 'border-cream/30 bg-white/10 text-cream backdrop-blur-sm hover:bg-white/20'
              : 'border-black/10 bg-white/80 text-black backdrop-blur-sm hover:bg-white/90'
          }`}
        >
          View Art
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-50 flex h-11 w-11 shrink-0 touch-manipulation flex-col items-center justify-center gap-1.5 lg:hidden ${
            isOpen ? 'text-ink' : onDarkHero && !scrolled ? 'text-cream' : 'text-ink'
          }`}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-current"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block h-px w-6 bg-current"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-current"
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-cream pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center overflow-y-auto px-6 sm:px-10">
              <ul className="space-y-1">
                {[{ to: '/', label: 'Home' }, ...navLinks].map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.to}
                      className={`block py-2.5 font-serif text-3xl transition-colors touch-manipulation sm:text-4xl ${
                        isActive(link.to) ? 'text-terracotta' : 'text-ink hover:text-terracotta'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/gallery"
                className="mt-8 inline-flex w-full items-center justify-center border border-black/10 bg-white px-5 py-3.5 text-xs font-semibold tracking-[0.15em] text-black uppercase touch-manipulation sm:w-auto"
              >
                View Art
              </Link>
            </div>
            <div className="border-t border-ink/10 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-8">
              <p className="text-xs tracking-widest text-ink-soft uppercase">
                Castellón, Spain
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
