import Link from "next/link";
import type { ReactNode } from "react";
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-cyanx">{children}</span>;
}
export function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">{title}</h2>
      {desc && <p className="mt-3 text-muted leading-8">{desc}</p>}
    </div>
  );
}
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="مسار التنقل" className="text-xs text-muted flex flex-wrap items-center gap-1.5">
      <Link href="/" className="hover:text-white">الرئيسية</Link>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5"><span>/</span>{it.href ? <Link href={it.href} className="hover:text-white">{it.label}</Link> : <span className="text-paper">{it.label}</span>}</span>
      ))}
    </nav>
  );
}
export function ScoreBar({ label, value, hint }: { label: string; value: number; hint?: string }) {
  const color = value >= 70 ? "bg-cyanx" : value >= 40 ? "bg-primary" : "bg-amber-400";
  return (
    <div>
      <div className="flex justify-between text-sm font-semibold"><span>{label}</span><span>{value} / 100</span></div>
      <div className="mt-1.5 h-2.5 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
      {hint && <p className="mt-1 text-xs text-muted leading-6">{hint}</p>}
    </div>
  );
}
