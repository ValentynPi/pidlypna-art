import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-cream hover:bg-ink/90 border border-ink',
  secondary:
    'bg-transparent text-cream border border-cream/40 hover:bg-cream/10 hover:border-cream/70',
  ghost:
    'bg-transparent text-ink border border-ink/15 hover:border-terracotta hover:text-terracotta',
  gold:
    'bg-gold text-ink hover:bg-gold/90 border border-gold',
};

interface BaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type ButtonAsLink = BaseProps & LinkProps & { to: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300';

  const content = (
    <>
      {children}
      {'to' in props && props.to && (
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if ('to' in props && props.to) {
    const { to, ...linkProps } = props;
    return (
      <Link
        to={to}
        className={`${base} ${variantStyles[variant]} ${className}`}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${base} ${variantStyles[variant]} ${className}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
