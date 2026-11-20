"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Brain, CalendarCheck, Eye, Flame, Info,
  RotateCcw, ShieldCheck, ShieldAlert, Sparkles, Target, TrendingUp,
} from "lucide-react";
import { Breadcrumbs, Eyebrow, ScoreBar } from "@/components/ui/Shared";
import { mirrorQuestions } from "@/lib/data";

type Axis = "algorithm" | "privacy" | "verify" | "attention" | "habits";

const AXES: { key: Axis; label: string; desc: string }[] = [
  { key: "algorithm", label: "وعي الخوارزميات", desc: "فهمك لكيفية ترشيح المحتوى لك وتأثير التوصيات على ما تراه." },
  { key: "privacy", label: "وعي الخصوصية", desc: "حماية بياناتك وحساباتك ومراجعة إعدادات الخصوصية والأذونات." },
  { key: "verify", label: "التحقق من المحتوى", desc: "تنويع المصادر والتحقق قبل التصديق أو المشاركة." },
  { key: "attention", label: "وعي الانتباه", desc: "قدرتك على ملاحظة التلاعب العاطفي والتوقف حين تريد." },
  { key: "habits", label: "العادات الرقمية", desc: "إدارة وقت الشاشة والتصفح الواعي بدل التمرير التلقائي." },
];

const PLAN: { day: number; title: string; action: string }[] = [
  { day: 1, title: "راجع اهتماماتك", action: "افتح إعدادات أحد التطبيقات وشاهد المواضيع التي رشحتها لك الخوارزمية، واحذف ما لا يعبّر عنك." },
  { day: 2, title: "نوّع مصادرك", action: "اقرأ خبرًا واحدًا اليوم من مصدر موثوق مختلف عن مصدرك المعتاد، وقارن العنوان بالمتن." },
  { day: 3, title: "نظّف الأذونات", action: "راجع أذونات الموقع والكاميرا والميكروفون في تطبيقاتك، وأوقف ما لا يحتاجه التطبيق فعلًا." },
  { day: 4, title: "يوم بلا مشاركة متسرعة", action: "لا تشارك أي خبر قبل قراءته كاملًا والتحقق من مصدره وتاريخه — حتى لو بدا مهمًا." },
  { day: 5, title: "ساعة بلا شاشات", action: "حدد ساعة كاملة بلا هاتف اليوم (يفضل أول ساعة بعد الاستيقاظ أو قبل النوم)، ولاحظ شعورك." },
  { day: 6, title: "فعّل الحماية", action: "فعّل المصادقة الثنائية في بريدك وحسابك الأهم، وتأكد أن كلمة مرورك مختلفة عن باقي الحسابات." },
  { day: 7, title: "قيّم أسبوعك", action: "راجع تقرير وقت الشاشة الأسبوعي، واكتب لنفسك قاعدة واحدة ستلتزم بها الأسبوع المقبل." },
];

function levelFor(avg: number) {
  if (avg >= 80) return { label: "ممتاز", desc: "وعيك الرقمي قوي — حافظ عليه وشارك ما تعلمته مع من حولك." };
  if (avg >= 60) return { label: "جيد", desc: "أساسك جيد، وبخطوات بسيطة تصل إلى مستوى ممتاز." };
  if (avg >= 40) return { label: "متوسط", desc: "لديك وعي لا بأس به، لكن بعض العادات تحتاج انتباهًا عمليًا." };
  return { label: "ضعيف", desc: "بداية جيدة أنك هنا — الخطة أدناه سترفع وعيك خطوة بخطوة." };
}

export default function DigitalMirrorPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const q = mirrorQuestions[step];
  const progress = Math.round((Object.keys(answers).length / mirrorQuestions.length) * 100);

  const results = useMemo(() => {
    if (!done) return null;
    const axisScores: Record<Axis, number> = { algorithm: 0, privacy: 0, verify: 0, attention: 0, habits: 0 };
    const counts: Record<Axis, number> = { algorithm: 0, privacy: 0, verify: 0, attention: 0, habits: 0 };
    for (const item of mirrorQuestions) {
      const ax = item.axis as Axis;
      const score = item.scores[answers[item.id] ?? 0] ?? 1;
      axisScores[ax] += score;
      counts[ax] += 1;
    }
    const pct: Record<Axis, number> = {} as Record<Axis, number>;
    for (const ax of Object.keys(axisScores) as Axis[]) {
      pct[ax] = Math.round((axisScores[ax] / (counts[ax] * 4)) * 100);
    }
    const avg = Math.round((Object.values(pct) as number[]).reduce((a, b) => a + b, 0) / 5);
    return { pct, avg };
  }, [done, answers]);

  function choose(optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [q.id]: optionIdx }));
  }
  function next() {
    if (answers[q.id] === undefined) return;
    if (step === mirrorQuestions.length - 1) setDone(true);
    else setStep((s) => s + 1);
  }
  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done && results) {
    const level = levelFor(results.avg);
    const strengths = AXES.filter((a) => results.pct[a.key] >= 70);
    const attention = AXES.filter((a) => results.pct[a.key] < 50);
    const weakest = [...AXES].sort((a, b) => results.pct[a.key] - results.pct[b.key])[0];
    const steps: string[] = [
      `ابدأ من أضعف محور عندك: ${weakest.label} (${results.pct[weakest.key]} من 100) — خصص له 10 دقائق يوميًا هذا الأسبوع.`,
      "فعّل المصادقة الثنائية في حساباتك المهمة إذا لم تكن مفعّلة بعد.",
      "قبل مشاركة أي خبر، طبّق قاعدة الدقيقتين: المصدر، التاريخ، ومصدر مستقل آخر.",
      "جرّب مختبر الخوارزمية لترى بنفسك كيف تغيّر تفاعلاتك ما يظهر لك.",
    ];
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <Breadcrumbs items={[{ label: "مرآتك الرقمية" }]} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mt-6 text-center">
            <Eyebrow>ملف الوعي الرقمي الخاص بك</Eyebrow>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">مرآتك الرقمية</h1>
            <p className="mt-3 text-muted leading-8 max-w-2xl mx-auto">
              هذا تقييم تعليمي وليس تشخيصًا نفسيًا. النتائج حُسبت محليًا من إجاباتك فقط، بقاعدة واضحة:
              كل إجابة تعطي من 1 إلى 4 نقاط، ودرجة كل محور = متوسط إجاباته ÷ 4 × 100.
              لا تُحفظ إجاباتك في أي مكان.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl glass px-6 py-4">
              <span className="text-4xl font-extrabold text-gradient">{results.avg}</span>
              <span className="text-right">
                <span className="block font-bold">مستواك العام: {level.label}</span>
                <span className="block text-xs text-muted">من 100 — متوسط المحاور الخمسة</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{level.desc}</p>
          </div>

          <div className="mt-10 rounded-2xl glass p-5 sm:p-7 space-y-5">
            {AXES.map((a) => (
              <ScoreBar key={a.key} label={a.label} value={results.pct[a.key]} hint={a.desc} />
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl glass p-5">
              <h2 className="font-bold flex items-center gap-2"><Sparkles className="h-5 w-5 text-cyanx" /> نقاط القوة</h2>
              {strengths.length ? (
                <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
                  {strengths.map((a) => (
                    <li key={a.key}>• <span className="text-paper font-semibold">{a.label}</span> — {results.pct[a.key]} من 100، واصل على نفس المستوى.</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted leading-7">لا يوجد محور فوق 70 بعد — وهذا طبيعي، الخطة أدناه مصممة لترفع كل المحاور معًا.</p>
              )}
            </div>
            <div className="rounded-2xl glass p-5">
              <h2 className="font-bold flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-amber-400" /> جوانب تحتاج انتباهًا</h2>
              {attention.length ? (
                <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
                  {attention.map((a) => (
                    <li key={a.key}>• <span className="text-paper font-semibold">{a.label}</span> — {results.pct[a.key]} من 100، ابدأ به أولًا.</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted leading-7">لا يوجد محور تحت 50 — كل محاورك في منطقة آمنة نسبيًا، ركّز على التثبيت والاستمرار.</p>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl glass p-5 sm:p-7">
            <h2 className="font-bold flex items-center gap-2"><Target className="h-5 w-5 text-cyanx" /> خطوات عملية تبدأ بها اليوم</h2>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-muted list-decimal list-inside">
              {steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>

          <div className="mt-6 rounded-2xl glass p-5 sm:p-7">
            <h2 className="font-bold flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-cyanx" /> خطة تطوير لمدة 7 أيام</h2>
            <div className="mt-4 space-y-3">
              {PLAN.map((p) => (
                <div key={p.day} className="flex gap-3 rounded-xl bg-white/5 border border-line p-4">
                  <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-cyanx font-bold text-sm">يوم {p.day}</span>
                  <div>
                    <p className="font-semibold text-sm">{p.title}</p>
                    <p className="text-sm text-muted leading-7 mt-1">{p.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button onClick={restart} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold hover:bg-primary/80 transition">
              <RotateCcw className="h-4 w-4" /> أعد التقييم
            </button>
            <a href="/algorithm-lab" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-bold hover:border-primary transition">
              <Brain className="h-4 w-4 text-cyanx" /> جرّب مختبر الخوارزمية
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مرآتك الرقمية" }]} />
      <div className="mt-6">
        <Eyebrow>تقييم تفاعلي — يعمل محليًا</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">مرآتك الرقمية</h1>
        <p className="mt-3 text-muted leading-8">
          12 سؤالًا اختياريًا عن عاداتك الرقمية، تساعدك تفهم علاقتك بالخوارزميات والخصوصية والتحقق والانتباه.
          النتيجة تقييم تعليمي وليست تشخيصًا، ولا تُحفظ إجاباتك إلا إذا قررت أنت ذلك — الأصل أنها تبقى على جهازك فقط.
        </p>
      </div>

      <div className="mt-8 rounded-2xl glass p-5 sm:p-8">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>السؤال {step + 1} من {mirrorQuestions.length}</span>
          <span>{progress}% مكتمل</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-l from-primary to-cyanx transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <h2 className="mt-6 text-xl sm:text-2xl font-bold leading-relaxed">{q.text}</h2>
          <div className="mt-5 space-y-3" role="radiogroup" aria-label={q.text}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(i)}
                role="radio"
                aria-checked={answers[q.id] === i}
                className={`w-full text-right rounded-xl border px-4 py-3.5 text-sm sm:text-base font-medium transition ${
                  answers[q.id] === i
                    ? "border-primary bg-primary/15 text-paper"
                    : "border-line bg-white/5 text-muted hover:border-primary/60 hover:text-paper"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-7 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-bold disabled:opacity-40 hover:border-primary transition"
          >
            <ArrowRight className="h-4 w-4" /> السابق
          </button>
          <button
            onClick={next}
            disabled={answers[q.id] === undefined}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold disabled:opacity-40 hover:bg-primary/80 transition"
          >
            {step === mirrorQuestions.length - 1 ? "اعرض نتيجتي" : "التالي"}
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-line bg-surface/60 p-4 text-sm text-muted leading-7">
        <Info className="h-5 w-5 shrink-0 text-cyanx" />
        <p>
          كيف تُحسب النتيجة؟ كل إجابة تأخذ من 1 إلى 4 نقاط حسب وعيها، ودرجة كل محور = متوسط إجابات المحور ÷ 4 × 100.
          المستوى العام = متوسط المحاور الخمسة: 80+ ممتاز، 60+ جيد، 40+ متوسط، أقل من 40 ضعيف.
          <span className="inline-flex items-center gap-1 text-paper"><Flame className="h-4 w-4 text-cyanx" /> تلميح:</span> جاوب بصراحة، فالنتيجة لك وحدك.
        </p>
      </div>
      <p className="mt-4 text-xs text-muted flex items-center gap-1.5"><TrendingUp className="h-4 w-4" /> بعد النتيجة ستجد خطة 7 أيام عملية — يوم بيوم.</p>
    </main>
  );
}
