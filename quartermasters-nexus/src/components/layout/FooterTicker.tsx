'use client';

const hashtags = [
  '#FinancialAdvisory',
  '#HumanCapital',
  '#ManagementConsulting',
  '#TechInnovation',
  '#EventLogistics',
  '#ITServices',
  '#Strategy',
  '#Innovation',
  '#GlobalReach',
];

export function FooterTicker() {
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex gap-12 py-1">
        {[...hashtags, ...hashtags].map((tag, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--color-gold)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {tag}
          </div>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 flex gap-12 py-1">
        {[...hashtags, ...hashtags].map((tag, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--color-gold)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
