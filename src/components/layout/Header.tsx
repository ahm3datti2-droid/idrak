"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brain, Menu, X, ScanFace, FlaskConical } from "lucide-react";

const links = [
  { href: "/awareness", label: "الوعي الرقمي" },
  { href: "/algorithms", label: "الخوارزميات" },
  { href: "/influence", label: "التأثير الرقمي" },
  { href: "/verify", label: "تحقّق قبل ما تصدّق" },
  { href: "/privacy", label: "خصوصيتك" },
  { href: "/library", label: "المكتبة" },
  { href: "/challenges", label: "التحديات" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="إدراك — الرئيسية">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyanx text-white glow-blue"><Brain className="size-5" /></span>
            <span className="leading-none">
              <span className="block text-xl font-extrabold tracking-tight">إدراك</span>
              <span className="block text-[10px] font-semibold tracking-[0.3em] text-cyanx">IDRAK</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`rounded-full px-3 py-2 text-sm font-medium transition ${pathname===l.href ? "bg-primary/15 text-white" : "text-muted hover:text-white hover:bg-white/5"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/digital-mirror" className="flex items-center gap-1.5 rounded-full bg-white/5 border border-line px-3.5 py-2 text-sm font-semibold hover:border-primary/60"><ScanFace className="size-4 text-cyanx" /> مرآتك الرقمية</Link>
            <Link href="/algorithm-lab" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"><FlaskConical className="size-4" /> مختبر الخوارزمية</Link>
          </div>
          <button className="lg:hidden rounded-lg border border-line p-2" onClick={()=>setOpen(!open)} aria-label={open?"أغلق القائمة":"افتح القائمة"} aria-expanded={open}>{open?<X className="size-5"/>:<Menu className="size-5"/>}</button>
        </div>
        {open && (
          <nav className="lg:hidden pb-4 grid gap-1" aria-label="قائمة الجوال">
            {[...links, {href:"/digital-mirror",label:"مرآتك الرقمية"},{href:"/algorithm-lab",label:"مختبر الخوارزمية"},{href:"/about",label:"عن إدراك"},{href:"/contact",label:"تواصل معنا"}].map(l=>(
              <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-white/5">{l.label}</Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
