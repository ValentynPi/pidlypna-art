interface SectionLabelProps {
  children: string;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className = '', light = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`editorial-line ${light ? 'bg-gold/60' : ''}`} />
      <p
        className={`text-[0.65rem] font-medium tracking-[0.35em] uppercase ${
          light ? 'text-cream/60' : 'text-terracotta'
        }`}
      >
        {children}
      </p>
    </div>
  );
}
