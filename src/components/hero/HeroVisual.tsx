"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Heart, Play, Share2, Brain, Cpu, ShieldCheck, Bell } from "lucide-react";

const nodes = [
  { top: "12%", right: "8%", icon: Brain, label: "انتباهك" },
  { top: "38%", right: "68%", icon: Cpu, label: "الخوارزمية" },
  { top: "68%", right: "14%", icon: ShieldCheck, label: "خصوصيتك" },
  { top: "76%", right: "62%", icon: Eye, label: "ما تراه" },
];

const feedCards = [
  { icon: Play, title: "فيديو مقترح لك", meta: "شاهدته 3 مرات هذا الأسبوع", likes: "12 ألف" },
  { icon: Bell, title: "خبر عاجل؟ تحقق أولًا", meta: "مصدر واحد فقط حتى الآن", likes: "8 آلاف" },
  { icon: Heart, title: "منشور أثار تفاعلك", meta: "الغضب يوقف التمرير", likes: "21 ألف" },
];

const particles = [
  { top: "18%", right: "30%", delay: 0, dur: 6 },
  { top: "30%", right: "55%", delay: 1.2, dur: 7 },
  { top: "55%", right: "38%", delay: 0.6, dur: 5.5 },
  { top: "70%", right: "80%", delay: 2, dur: 6.5 },
  { top: "45%", right: "20%", delay: 1.6, dur: 7.5 },
  { top: "82%", right: "45%", delay: 0.4, dur: 6 },
];

export default function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line glass glow-blue min-h-[420px] sm:min-h-[460px]" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-70" />
      {/* connecting lines */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <line x1="20%" y1="18%" x2="72%" y2="45%" stroke="rgba(59,130,246,.35)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="72%" y1="45%" x2="28%" y2="74%" stroke="rgba(34,211,238,.35)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="20%" y1="18%" x2="28%" y2="74%" stroke="rgba(59,130,246,.25)" strokeWidth="1.5" strokeDasharray="6 6" />
        <line x1="72%" y1="45%" x2="86%" y2="76%" stroke="rgba(59,130,246,.3)" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>
      {/* moving particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-2 rounded-full bg-cyanx shadow-[0_0_14px_rgba(34,211,238,.9)]"
          style={{ top: p.top, right: p.right }}
          animate={reduce ? undefined : { y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          className="absolute flex flex-col items-center gap-1.5"
          style={{ top: n.top, right: n.right }}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        >
          <span className="grid size-12 place-items-center rounded-2xl border border-primary/50 bg-surface text-cyanx shadow-[0_0_24px_rgba(59,130,246,.35)]">
            <n.icon className="size-5" />
          </span>
          <span className="rounded-full bg-ink/80 border border-line px-2.5 py-0.5 text-[11px] font-semibold text-paper">{n.label}</span>
        </motion.div>
      ))}
      {/* floating feed cards */}
      <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-6 grid gap-2.5">
        {feedCards.map((c, i) => (
          <motion.div
            key={c.title}
            className="flex items-center gap-3 rounded-2xl border border-line bg-ink2/90 backdrop-blur px-3.5 py-3"
            animate={reduce ? undefined : { x: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 1.1 }}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-cyanx"><c.icon className="size-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{c.title}</span>
              <span className="block truncate text-xs text-muted">{c.meta}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs text-muted"><Heart className="size-3.5 text-rose-400" /> {c.likes}</span>
            <Share2 className="size-4 shrink-0 text-muted" />
          </motion.div>
        ))}
      </div>
      <p className="absolute top-4 start-4 rounded-full border border-line bg-ink/70 px-3 py-1 text-[11px] font-semibold text-muted">
        محاكاة تعليمية — ليست خوارزمية منصة حقيقية
      </p>
    </div>
  );
}
