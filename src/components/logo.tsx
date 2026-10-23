export function Logo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" className="fill-foreground" />
      <path d="M6.5 12.5 10 16l7.5-8" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="stroke-background" />
    </svg>
  );
}
