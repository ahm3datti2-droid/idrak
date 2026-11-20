"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Eye, FlaskConical, Heart, Info, Play, RefreshCw,
  Repeat, SkipForward, ThumbsUp, TrendingUp, Zap,
} from "lucide-react";
import { Breadcrumbs, Eyebrow } from "@/components/ui/Shared";

type Topic = "رياضة" | "سياسة" | "تكنولوجيا" | "طبخ" | "موسيقى" | "علوم";
type Video = { id: string; title: string; topic: Topic; duration: string; desc: string };

const TOPICS: Topic[] = ["رياضة", "سياسة", "تكنولوجيا", "طبخ", "موسيقى", "علوم"];

const POOL: Video[] = [
  { id: "v1", title: "ملخص مباراة القمة وأجمل 5 أهداف", topic: "رياضة", duration: "8:24", desc: "أبرز لقطات المباراة وتحليل سريع للأداء." },
  { id: "v2", title: "كيف يتعلم الذكاء الاصطناعي من بياناتك؟", topic: "تكنولوجيا", duration: "11:02", desc: "شرح مبسط لتدريب النماذج وحدودها." },
  { id: "v3", title: "وصفة كشري على أصوله في 20 دقيقة", topic: "طبخ", duration: "6:41", desc: "خطوات سهلة ونتيجة مضمونة من أول مرة." },
  { id: "v4", title: "لماذا تشتعل النقاشات السياسية على الإنترنت؟", topic: "سياسة", duration: "9:17", desc: "دور الخوارزميات في تضخيم الخلاف." },
  { id: "v5", title: "أغنية هادئة للتركيز أثناء العمل", topic: "موسيقى", duration: "4:05", desc: "موسيقى بدون كلمات تساعد على التركيز." },
  { id: "v6", title: "تجربة علمية: لماذا ننسى بسرعة؟", topic: "علوم", duration: "7:33", desc: "كيف يعمل الذاكرة ولماذا يتلاشى الانتباه." },
  { id: "v7", title: "تدريب منزلي في 10 دقائق بدون معدات", topic: "رياضة", duration: "10:12", desc: "روتين بسيط للمبتدئين كل يوم." },
  { id: "v8", title: "أخطر 3 أخطاء في إعدادات الخصوصية", topic: "تكنولوجيا", duration: "5:48", desc: "أذونات تمنحها دون أن تنتبه — وكيف توقفها." },
  { id: "v9", title: "أكلة سريعة بثلاثة مكونات فقط", topic: "طبخ", duration: "3:59", desc: "فكرة عشاء سريع بعد يوم طويل." },
  { id: "v10", title: "هل الإعلانات تعرف ما تفكر فيه؟", topic: "علوم", duration: "8:02", desc: "الفرق بين التتبع الفعلي والإحساس بالمراقبة." },
  { id: "v11", title: "عزف حي: أشهر الألحان على البيانو", topic: "موسيقى", duration: "6:27", desc: "أداء حي بجودة عالية." },
  { id: "v12", title: "كيف تُصنع الأخبار المضللة؟", topic: "سياسة", duration: "12:40", desc: "خطوات صناعة الادعاء المضلل وكيف تكشفه." },
];

const LOOP = [
  { icon: Play, label: "تفاعلك", desc: "مشاهدة، إعجاب، توقف، تخطٍّ" },
  { icon: Zap, label: "إشارات", desc: "كل تفاعل يرفع وزن موضوع ما" },
  { icon: TrendingUp, label: "توصية", desc: "النظام يرتّب المحتوى حسب الإشارات" },
  { icon: Eye, label: "محتوى جديد", desc: "ترى أكثر مما يشبه ما أعجبك" },
  { icon: Repeat, label: "تفاعل أكثر", desc: "الدائرة تتكرر وتضيق اختياراتك" },
];

export default function AlgorithmLabPage() {
  const [signals, setSignals] = useState<Record<Topic, number>>({
    رياضة: 1, سياسة: 1, تكنولوجيا: 1, طبخ: 1, موسيقى: 1, علوم: 1,
  });
  const [log, setLog] = useState<string[]>([]);
  const [actions, setActions] = useState(0);

  function act(video: Video, kind: "watch" | "like" | "skip") {
    const delta = kind === "like" ? 3 : kind === "watch" ? 2 : -1;
    setSignals((prev) => ({
      ...prev,
      [video.topic]: Math.max(0, prev[video.topic] + delta),
    }));
    const verb = kind === "like" ? "أعجبت بـ" : kind === "watch" ? "شاهدت" : "تخطيت";
    setLog((prev) => [`${verb} «${video.title}» — إشارة ${video.topic} ${delta > 0 ? "+" : ""}${delta}`, ...prev].slice(0, 6));
    setActions((a) => a + 1);
  }

  const ranked = useMemo(() => {
    return [...POOL].sort((a, b) => {
      const sa = signals[a.topic] + (a.id.charCodeAt(1) % 3) * 0.1;
      const sb = signals[b.topic] + (b.id.charCodeAt(1) % 3) * 0.1;
      return sb - sa;
    });
  }, [signals]);

  const maxSignal = Math.max(...Object.values(signals), 1);
  const topTopic = [...TOPICS].sort((a, b) => signals[b] - signals[a])[0];

  function reset() {
    setSignals({ رياضة: 1, سياسة: 1, تكنولوجيا: 1, طبخ: 1, موسيقى: 1, علوم: 1 });
    setLog([]);
    setActions(0);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مختبر الخوارزمية" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>محاكاة تعليمية — ليست خوارزمية حقيقية</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">مختبر الخوارزمية</h1>
        <p className="mt-3 text-muted leading-8">
          أنت تتصفح منصة افتراضية. شاهد فيديو أو أعجب به أو تخطَّه، ولاحظ كيف يعيد النظام ترتيب
          التوصيات بعد كل تفاعل. هذه محاكاة تعليمية مبسطة بقواعد واضحة ومعلنة،
          ولا تمثل خوارزمية فيسبوك أو تيك توك أو أي منصة حقيقية — فخوارزمياتها الحقيقية
          أعقد بكثير وتستخدم آلاف الإشارات.
        </p>
      </div>

      {/* Feedback loop visualization */}
      <section aria-label="حلقة التغذية الراجعة" className="mt-8 rounded-2xl glass p-5 sm:p-7">
        <h2 className="font-bold flex items-center gap-2"><FlaskConical className="h-5 w-5 text-cyanx" /> حلقة التغذية الراجعة</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {LOOP.map((step, i) => (
            <div key={step.label} className="relative rounded-xl bg-white/5 border border-line p-4 text-center">
              <step.icon className="h-6 w-6 mx-auto text-cyanx" />
              <p className="mt-2 font-bold text-sm">{i + 1}. {step.label}</p>
              <p className="mt-1 text-xs text-muted leading-6">{step.desc}</p>
              {i < LOOP.length - 1 && (
                <ArrowLeft className="hidden sm:block absolute top-1/2 -left-3 h-4 w-4 text-primary -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted leading-7">
          المشاهدة الكاملة إشارة قوية (+2)، والإعجاب أقوى (+3)، والتخطي إشارة سلبية (−1).
          مع تكرار التفاعل مع موضوع واحد، يزداد ظهوره ويقل ظهور غيره — هكذا تتكون فقاعة الترشيح تدريجيًا.
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Feed */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">فيدك الافتراضي — مرتّب حسب إشاراتك</h2>
            <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-bold hover:border-primary transition">
              <RefreshCw className="h-3.5 w-3.5" /> إعادة ضبط
            </button>
          </div>
          <p className="text-xs text-muted mt-1">عدد تفاعلاتك حتى الآن: {actions} — جرّب التفاعل مع موضوع واحد عدة مرات ولاحظ النتيجة.</p>
          <div className="mt-4 space-y-3">
            {ranked.map((v, idx) => (
              <motion.article
                key={v.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl glass p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-primary/15 text-cyanx px-2.5 py-1 font-bold">#{idx + 1} في التوصيات</span>
                      <span className="rounded-full bg-white/5 border border-line px-2.5 py-1 text-muted">{v.topic}</span>
                      <span className="text-muted">{v.duration}</span>
                    </div>
                    <h3 className="mt-2 font-bold leading-relaxed">{v.title}</h3>
                    <p className="text-sm text-muted leading-7 mt-1">{v.desc}</p>
                    <p className="text-xs text-muted mt-1">قوة إشارة «{v.topic}» الآن: {signals[v.topic]}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => act(v, "watch")} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold hover:bg-primary/80 transition">
                    <Play className="h-3.5 w-3.5" /> شاهد (+2)
                  </button>
                  <button onClick={() => act(v, "like")} className="inline-flex items-center gap-1.5 rounded-full border border-cyanx/50 bg-cyanx/10 px-4 py-2 text-xs font-bold hover:bg-cyanx/20 transition">
                    <ThumbsUp className="h-3.5 w-3.5" /> أعجبني (+3)
                  </button>
                  <button onClick={() => act(v, "skip")} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-bold text-muted hover:text-paper hover:border-primary transition">
                    <SkipForward className="h-3.5 w-3.5" /> تخطَّ (−1)
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Signals sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl glass p-5">
            <h2 className="font-bold flex items-center gap-2"><Heart className="h-5 w-5 text-cyanx" /> إشارات اهتمامك</h2>
            <p className="text-xs text-muted mt-1 leading-6">كل موضوع له وزن يرتفع وينخفض حسب تفاعلاتك. في البداية كل المواضيع متساوية (1).</p>
            <div className="mt-4 space-y-4">
              {TOPICS.map((t) => (
                <div key={t}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{t}</span><span>{signals[t]}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${t === topTopic && actions > 0 ? "bg-cyanx" : "bg-primary"}`}
                      style={{ width: `${Math.min(100, (signals[t] / maxSignal) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {actions > 0 && (
              <p className="mt-4 text-sm leading-7 rounded-xl bg-primary/10 border border-primary/30 p-3">
                أقوى موضوع لديك الآن: <strong>{topTopic}</strong> — لهذا يتصدر فيدك. جرّب التفاعل مع موضوع مختلف لترى الترتيب يتغير.
              </p>
            )}
          </div>

          <div className="rounded-2xl glass p-5">
            <h2 className="font-bold flex items-center gap-2"><Eye className="h-5 w-5 text-cyanx" /> سجل تفاعلاتك</h2>
            {log.length === 0 ? (
              <p className="mt-3 text-sm text-muted leading-7">لم تتفاعل بعد. اختر فيديو من الفيد واضغط «شاهد» أو «أعجبني» أو «تخطَّ» لتبدأ المحاكاة.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm text-muted leading-7">
                {log.map((l, i) => <li key={i} className="border-b border-line/60 pb-2 last:border-0">• {l}</li>)}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-surface/60 p-5 text-sm text-muted leading-7">
            <p className="font-bold text-paper flex items-center gap-2"><Info className="h-4 w-4 text-cyanx" /> ماذا تعلمت؟</p>
            <p className="mt-2">
              التوصيات لا تعكس «ما تحبه» فقط، بل ما تتفاعل معه — حتى التفاعل الغاضب أو الفضولي إشارة.
              التخطي المتعمد هو أقوى أداة لديك لإعادة تدريب فيدك، وتنويع تفاعلاتك يوسّع ما تراه.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
