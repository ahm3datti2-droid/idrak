"use client";
import { useMemo, useState } from "react";
import { Play, Eye, Heart, Clock, Dumbbell, Cpu, ChefHat, Landmark, TrendingUp } from "lucide-react";

type Interest = "رياضة" | "تكنولوجيا" | "طبخ" | "سياسة";
const interestIcons = { "رياضة": Dumbbell, "تكنولوجيا": Cpu, "طبخ": ChefHat, "سياسة": Landmark } as const;

type Item = { id: string; title: string; topic: Interest; base: number; desc: string };

const items: Item[] = [
  { id: "s1", title: "ملخص مباراة الأمس وأجمل الأهداف", topic: "رياضة", base: 50, desc: "فيديو رياضي قصير" },
  { id: "s2", title: "أفضل 5 تطبيقات ذكاء اصطناعي هذا الشهر", topic: "تكنولوجيا", base: 52, desc: "فيديو تقني" },
  { id: "s3", title: "وصفة سريعة بعشر دقائق فقط", topic: "طبخ", base: 48, desc: "فيديو طبخ" },
  { id: "s4", title: "تحليل هادئ لأهم أخبار الأسبوع", topic: "سياسة", base: 46, desc: "فيديو إخباري" },
  { id: "s5", title: "تمارين منزلية بدون معدات", topic: "رياضة", base: 44, desc: "فيديو رياضي" },
  { id: "s6", title: "كيف يعمل هاتفك من الداخل؟", topic: "تكنولوجيا", base: 45, desc: "فيديو تقني" },
  { id: "s7", title: "أخطاء شائعة في المطبخ", topic: "طبخ", base: 42, desc: "فيديو طبخ" },
  { id: "s8", title: "نقاش حول قرار اقتصادي جديد", topic: "سياسة", base: 40, desc: "فيديو إخباري" },
];

export default function MiniFeed() {
  const [selected, setSelected] = useState<Interest[]>(["تكنولوجيا"]);
  const [watch, setWatch] = useState(70); // نسبة المشاهدة الكاملة

  const ranked = useMemo(() => {
    return [...items]
      .map((it) => {
        let score = it.base;
        if (selected.includes(it.topic)) score += 40;
        if (selected.length === 1 && selected[0] === it.topic) score += 10;
        // مدة المشاهدة تقوّي إشارة المواضيع المختارة
        if (selected.includes(it.topic)) score += Math.round((watch / 100) * 20);
        return { ...it, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [selected, watch]);

  const toggle = (t: Interest) => {
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <h3 className="text-xl font-extrabold">جرّب بنفسك: غيّر اهتماماتك وشاهد الفيد يعيد ترتيب نفسه</h3>
      <p className="mt-2 text-sm text-muted leading-7">
        هذه محاكاة تعليمية مبسطة جدًا، وليست خوارزمية منصة حقيقية. الفكرة فقط: كل تفاعل إشارة، والإشارات القوية ترفع احتمالية ظهور محتوى مشابه.
      </p>

      <div className="mt-5">
        <p className="text-sm font-bold">1 — اختر المواضيع التي تتفاعل معها:</p>
        <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="اختيار الاهتمامات">
          {(Object.keys(interestIcons) as Interest[]).map((t) => {
            const Icon = interestIcons[t];
            const active = selected.includes(t);
            return (
              <button key={t} onClick={() => toggle(t)} aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${active ? "bg-primary text-white border-primary" : "border-line bg-ink2 text-muted hover:text-white hover:border-primary/50"}`}>
                <Icon className="size-4" /> {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="watch-slider" className="text-sm font-bold flex items-center gap-2">
          <Clock className="size-4 text-cyanx" /> 2 — نسبة مشاهدتك الكاملة للفيديوهات: <span className="text-cyanx">{watch}%</span>
        </label>
        <input id="watch-slider" type="range" min={0} max={100} step={5} value={watch} onChange={(e) => setWatch(Number(e.target.value))}
          className="mt-2 w-full accent-[#3b82f6]" />
        <p className="text-xs text-muted leading-6">مدة المشاهدة من أقوى الإشارات: مشاهدة كاملة تعني «أعجبني» أقوى من إعجاب سريع.</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold flex items-center gap-2"><TrendingUp className="size-4 text-cyanx" /> فيدك الافتراضي الآن — مرتّب حسب نقاط التوصية:</p>
        <ol className="mt-3 grid gap-2.5">
          {ranked.map((it, i) => {
            const Icon = interestIcons[it.topic];
            return (
              <li key={it.id} className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 ${i === 0 ? "border-primary/60 bg-primary/10" : "border-line bg-ink2"}`}>
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-cyanx"><Icon className="size-4.5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{i + 1}. {it.title}</span>
                  <span className="block text-xs text-muted">{it.desc} • {it.topic}</span>
                </span>
                <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-cyanx">{it.score} نقطة</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 flex items-start gap-2 text-xs text-muted leading-6">
          <Eye className="size-4 shrink-0 mt-0.5 text-cyanx" />
          لاحظ: كلما ركّزت على موضوع واحد، اختفى التنوع من أعلى القائمة — هذه بذرة فقاعة الترشيح. جرّب اختيار 3 مواضيع معًا وقارن النتيجة.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 rounded-2xl bg-ink2 border border-line p-4 text-xs text-muted leading-6">
        <span className="flex items-center gap-1.5"><Heart className="size-4 text-rose-400" /> الإعجاب = إشارة قوية</span>
        <span className="flex items-center gap-1.5"><Play className="size-4 text-cyanx" /> المشاهدة الكاملة = إشارة أقوى</span>
        <span className="flex items-center gap-1.5"><Eye className="size-4 text-amber-300" /> التخطي السريع = إشارة سلبية</span>
      </div>
    </div>
  );
}
