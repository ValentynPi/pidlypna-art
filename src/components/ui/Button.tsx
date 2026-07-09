import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-terracotta text-cream hover:bg-terracotta-light border border-terracotta',
  secondary:
    'bg-transparent text-cream border border-cream/60 hover:bg-cream/10 hover:border-cream',
  ghost:
    'bg-transparent text-ink border border-ink/20 hover:border-terracotta hover:text-terracotta',
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
    'inline-flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300';

  if ('to' in props && props.to) {
    const { to, ...linkProps } = props;
    return (
      <Link
        to={to}
        className={`${base} ${variantStyles[variant]} ${className}`}
        {...linkProps}
      >
        {children}
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
