"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award, CheckCircle2, Flame, Lightbulb, Lock, Star, Target, Trophy, Zap,
} from "lucide-react";
import { Breadcrumbs, Eyebrow } from "@/components/ui/Shared";
import { challenges } from "@/lib/data";

const XP_KEY = "idrak_xp";
const DONE_KEY = "idrak_challenges_done";
const DAYS_KEY = "idrak_challenge_days";

function levelFor(xp: number) {
  if (xp >= 100) return { label: "خبير", desc: "وصلت لمستوى الخبير — واصل التعلم وشارك ما تعرفه." };
  if (xp >= 50) return { label: "واعٍ", desc: "مستوى واعٍ — أنت في منتصف الطريق نحو الخبير." };
  return { label: "مستكشف", desc: "بداية الرحلة — كل تحدٍّ تكمله يقرّبك من مستوى «واعٍ»." };
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function ChallengesPage() {
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [todayIdx, setTodayIdx] = useState(0);

  useEffect(() => {
    try {
      setXp(Number(localStorage.getItem(XP_KEY) ?? 0) || 0);
      setDone(JSON.parse(localStorage.getItem(DONE_KEY) ?? "[]") as string[]);
      setDays(JSON.parse(localStorage.getItem(DAYS_KEY) ?? "[]") as string[]);
    } catch {
      // localStorage غير متاح — نكمل بدون حفظ
    }
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    setTodayIdx(dayOfYear % challenges.length);
    setLoaded(true);
  }, []);

  const today = challenges[todayIdx];

  const level = levelFor(xp);
  const nextLevelAt = xp >= 100 ? null : xp >= 50 ? 100 : 50;
  const progressToNext = nextLevelAt ? Math.min(100, Math.round((xp / nextLevelAt) * 100)) : 100;

  const complete = (id: string, xpValue: number) => {
    if (done.includes(id)) return;
    const newDone = [...done, id];
    const newXp = xp + xpValue;
    const todayStr = todayKey();
    const newDays = days.includes(todayStr) ? days : [...days, todayStr];
    setDone(newDone);
    setXp(newXp);
    setDays(newDays);
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify(newDone));
      localStorage.setItem(XP_KEY, String(newXp));
      localStorage.setItem(DAYS_KEY, JSON.stringify(newDays));
    } catch {
      // تجاهل فشل الحفظ
    }
  };

  const [streak, setStreak] = useState(0);
  useEffect(() => {
    if (!loaded) return;
    let count = 0;
    const d = new Date();
    const set = new Set(days);
    while (set.has(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)) {
      count += 1;
      d.setDate(d.getDate() - 1);
    }
    setStreak(count);
  }, [days, loaded]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "تحديات الوعي" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>تعلّم بالتجربة — كل نقطة مرتبطة بدرس</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">تحديات الوعي اليومية</h1>
        <p className="mt-3 text-muted leading-8">
          كل يوم تحدٍّ جديد يدرّبك على مهارة رقمية حقيقية: كشف عنوان مضلل، تمييز صورة مولّدة،
          مراجعة خصوصيتك، أو ملاحظة كيف تتغير توصياتك. أكمل التحدي واقرأ الدرس،
          وستُحفظ نقاطك وسلسلة أيامك على جهازك فقط.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl glass p-4 text-center">
          <Zap className="h-5 w-5 mx-auto text-cyanx" />
          <p className="mt-2 text-2xl font-extrabold">{loaded ? xp : "—"}</p>
          <p className="text-xs text-muted">نقطة XP</p>
        </div>
        <div className="rounded-2xl glass p-4 text-center">
          <Trophy className="h-5 w-5 mx-auto text-cyanx" />
          <p className="mt-2 text-2xl font-extrabold">{level.label}</p>
          <p className="text-xs text-muted">مستواك الحالي</p>
        </div>
        <div className="rounded-2xl glass p-4 text-center">
          <Flame className="h-5 w-5 mx-auto text-amber-400" />
          <p className="mt-2 text-2xl font-extrabold">{loaded ? streak : "—"}</p>
          <p className="text-xs text-muted">يوم متتالي</p>
        </div>
        <div className="rounded-2xl glass p-4 text-center">
          <Target className="h-5 w-5 mx-auto text-cyanx" />
          <p className="mt-2 text-2xl font-extrabold">{done.length} / {challenges.length}</p>
          <p className="text-xs text-muted">تحدٍّ مكتمل</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl glass p-4">
        <div className="flex justify-between text-sm font-semibold">
          <span>التقدم نحو {nextLevelAt ? `مستوى ${nextLevelAt === 50 ? "واعٍ" : "خبير"} (${nextLevelAt} نقطة)` : "أعلى مستوى — خبير"}</span>
          <span>{progressToNext}%</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-l from-primary to-cyanx transition-all duration-500" style={{ width: `${progressToNext}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted leading-6">
          المستويات: مستكشف (0–49 نقطة)، واعٍ (50–99)، خبير (100+). كل تحدٍّ يعطي نقاطًا حسب صعوبته، والنقاط تُحفظ على جهازك فقط.
        </p>
      </div>

      {/* Today's challenge */}
      <section className="mt-8 rounded-2xl border border-primary/40 bg-primary/10 p-5 sm:p-7">
        <div className="flex items-center gap-2 text-cyanx font-bold text-sm">
          <Star className="h-5 w-5" /> تحدي اليوم
        </div>
        <h2 className="mt-3 text-2xl font-extrabold">{today.title}</h2>
        <p className="mt-2 text-muted leading-8">{today.desc}</p>
        <p className="mt-3 text-sm leading-8"><span className="font-bold text-paper">المهمة: </span>{today.task}</p>
        {done.includes(today.id) ? (
          <div className="mt-4 rounded-xl bg-cyanx/10 border border-cyanx/40 p-4">
            <p className="font-bold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-cyanx" /> أكملت تحدي اليوم — أحسنت!</p>
            <p className="mt-2 text-sm text-muted leading-7"><span className="font-bold text-paper">الدرس: </span>{today.answer}</p>
          </div>
        ) : (
          <button
            onClick={() => setOpenId(today.id)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold hover:bg-primary/80 transition"
          >
            <Lightbulb className="h-4 w-4" /> اعرض المهمة وابدأ
          </button>
        )}
      </section>

      {/* All challenges */}
      <h2 className="mt-10 font-bold text-xl flex items-center gap-2"><Award className="h-5 w-5 text-cyanx" /> كل التحديات</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {challenges.map((c) => {
          const isDone = done.includes(c.id);
          const isOpen = openId === c.id;
          return (
            <motion.article key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl glass p-5 card-hover">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs rounded-full bg-primary/15 text-cyanx px-2.5 py-1 font-bold">{c.category}</span>
                  <h3 className="mt-3 font-bold leading-relaxed">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-7">{c.desc}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white/5 border border-line px-2.5 py-1 text-xs font-bold text-cyanx">
                  <Zap className="h-3.5 w-3.5" /> {c.xp} XP
                </span>
              </div>

              {isDone ? (
                <div className="mt-4 rounded-xl bg-cyanx/10 border border-cyanx/40 p-4">
                  <p className="font-bold text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyanx" /> مكتمل — كسبت {c.xp} نقطة</p>
                  <p className="mt-2 text-sm text-muted leading-7"><span className="font-bold text-paper">الدرس: </span>{c.answer}</p>
                </div>
              ) : isOpen ? (
                <div className="mt-4 rounded-xl bg-white/5 border border-line p-4">
                  <p className="text-sm leading-8"><span className="font-bold text-paper">المهمة: </span>{c.task}</p>
                  <p className="mt-3 text-sm leading-8"><span className="font-bold text-paper">الإجابة والدرس: </span>{c.answer}</p>
                  <button onClick={() => complete(c.id, c.xp)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold hover:bg-primary/80 transition">
                    <CheckCircle2 className="h-4 w-4" /> فهمت الدرس — أكمل التحدي (+{c.xp} XP)
                  </button>
                </div>
              ) : (
                <button onClick={() => setOpenId(c.id)} className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-bold hover:border-primary transition">
                  <Lock className="h-4 w-4" /> اعرض المهمة
                </button>
              )}
            </motion.article>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted leading-7 rounded-2xl border border-line bg-surface/60 p-4">
        ملاحظة: التحديات تدور يوميًا — تحدي اليوم يُختار حسب رقم اليوم في السنة، فيتغير كل يوم.
        سلسلة الأيام تُحسب من الأيام المتتالية التي أكملت فيها تحديًا، وتُحفظ كل البيانات على جهازك فقط.
      </p>
    </main>
  );
}
