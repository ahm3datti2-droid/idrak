"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, CheckCircle2, ClipboardCheck, Eye, FileSearch, Info,
  Link2, MessageSquareWarning, Search, Share2, ShieldQuestion, XCircle,
} from "lucide-react";
import { Breadcrumbs, Eyebrow } from "@/components/ui/Shared";

type Verdict = "يحتاج تحقق" | "علامات تضليل محتملة" | "معلومات ناقصة";

type Case = {
  id: string; title: string; claim: string; source: string; dateHint: string; imageHint: string;
  flags: string[]; verdict: Verdict; why: string; evidence: string[]; howToCheck: string;
};

const CASES: Case[] = [
  {
    id: "case1", title: "صورة قديمة تُنشر كأنها من اليوم",
    claim: "«عاجل: فيضانات ضخمة تضرب المدينة الآن — شاهد الصور!»",
    source: "حساب مجهول أُنشئ قبل أسبوع، بلا اسم حقيقي ولا سجل منشورات.",
    dateHint: "المنشور بلا تاريخ واضح، والصورة تظهر ملابس شتوية رغم أننا في الصيف.",
    imageHint: "الصورة حقيقية لكنها تبدو من حدث قديم: لافتة محل مغلق منذ سنوات تظهر في الخلفية.",
    flags: ["مصدر مجهول حديث الإنشاء", "تفاصيل الصورة لا تناسب الموسم المعلن", "كلمة «عاجل» بلا أي مصدر رسمي"],
    verdict: "علامات تضليل محتملة",
    why: "الصورة قد تكون حقيقية، لكن إعادة نشرها بادعاء جديد يجعل الخبر مضللًا. الصورة الحقيقية لا تثبت الادعاء الجديد.",
    evidence: ["تاريخ أول ظهور للصورة (ابحث بها عكسيًا)", "تغطية رسمية أو إخبارية موثوقة للحدث نفسه", "تفاصيل الصورة: اللافتات، الطقس، الملابس"],
    howToCheck: "ابحث بالصورة عكسيًا، وابحث عن كلمات مميزة من الادعاء مع إضافة كلمة «قديم»، وقارن بتغطية مصادر موثوقة.",
  },
  {
    id: "case2", title: "عنوان يختلف عن متن الخبر",
    claim: "عنوان: «الحكومة تلغي الدعم نهائيًا!» — ومتن الخبر يتحدث عن دراسة مقترح لتعديل جزئي في بند واحد.",
    source: "موقع إخباري صغير يعتمد على العناوين المثيرة، بلا رابط للتقرير الأصلي.",
    dateHint: "الخبر منشور اليوم، لكنه يستند إلى تصريح قديم من العام الماضي.",
    imageHint: "صورة أرشيفية عامة لا علاقة لها بالخبر.",
    flags: ["العنوان أقوى بكثير من متن الخبر", "لا يوجد رابط للمصدر الأصلي", "التصريح المستند إليه قديم"],
    verdict: "علامات تضليل محتملة",
    why: "العنوان يعد بإلغاء كامل بينما المتن يتحدث عن دراسة تعديل جزئي — هذا تضليل بالعنوان حتى لو كان المتن نفسه غير مختلق.",
    evidence: ["المتن الكامل للخبر لا العنوان فقط", "التصريح أو القرار الأصلي من مصدره الرسمي", "تغطية مصادر أخرى لنفس الموضوع"],
    howToCheck: "اقرأ الخبر كاملًا قبل الحكم، وابحث عن القرار أو التصريح الأصلي في المصدر الرسمي.",
  },
  {
    id: "case3", title: "فيديو لشخصية عامة تقول شيئًا غير معتاد",
    claim: "فيديو متداول لشخصية عامة تعلن قرارًا مفاجئًا لم يعلنه أي مصدر رسمي.",
    source: "حساب جديد ينشر «تسريبًا حصريًا»، والفيديو غير موجود في أي قناة رسمية للشخصية.",
    dateHint: "الفيديو بلا تاريخ، وتداوله بدأ فجأة من حسابات مجهولة فقط.",
    imageHint: "حركة الشفاه لا تطابق الصوت تمامًا، وحواف الوجه غير ثابتة في بعض اللقطات.",
    flags: ["لا يوجد مصدر رسمي أو تغطية موثوقة", "حركة شفاه لا تطابق الصوت", "الناشر حساب جديد يدّعي الحصرية"],
    verdict: "يحتاج تحقق",
    why: "الفيديو يحمل علامات شك تقنية (مزامنة الشفاه وحواف الوجه)، لكن العلامات وحدها لا تثبت التزييف — يحتاج فحصًا من مصدر التحقق ومراجعة المصادر الرسمية قبل أي حكم.",
    evidence: ["بيان رسمي من الشخصية أو جهتها", "نشر الفيديو في وسائل موثوقة مستقلة", "فحص تقني للفيديو من جهة تحقق متخصصة"],
    howToCheck: "ابحث عن الفيديو الأصلي في القنوات الرسمية، وانتظر بيانًا رسميًا، ولا تعيد نشره حتى للتحذير دون توضيح أنه غير موثق.",
  },
  {
    id: "case4", title: "ادعاء بصيغة «مصادر مطلعة» بلا تفاصيل",
    claim: "«مصادر مطلعة تؤكد: قرار كبير سيُعلن خلال ساعات!» — بلا اسم مصدر ولا وثيقة ولا تفاصيل.",
    source: "صفحة تنشر ادعاءات مشابهة كل يوم، ولا يتحقق أي منها لاحقًا.",
    dateHint: "المنشور حديث، لكن الادعاء نفسه يتكرر بنفس الصيغة منذ أشهر.",
    imageHint: "لا توجد صورة أو وثيقة، فقط نص قصير بخط عريض وعلامات تعجب.",
    flags: ["«مصادر مطلعة» دون أي تفاصيل قابلة للتحقق", "سجل الناشر مليء بادعاءات لم تتحقق", "أسلوب إثارة: تعجب وعجلة بلا معلومة"],
    verdict: "معلومات ناقصة",
    why: "الادعاء بلا دليل قابل للتحقق: لا مصدر مسمى ولا وثيقة ولا تفاصيل. هذا ليس خبرًا بل ادعاءً — يظل «غير مثبت» حتى يظهر دليل واحد على الأقل.",
    evidence: ["اسم مصدر أو وثيقة أو تصريح مسجل", "تأكيد من مصدر مستقل موثوق", "سجل الناشر في الادعاءات السابقة"],
    howToCheck: "اسأل: ما الدليل؟ من المصدر؟ وما الذي يمكن التحقق منه هنا؟ إذا لم تجد إجابة، فالخبر غير مثبت — لا تشاركه.",
  },
  {
    id: "case5", title: "خبر صحيح من مصدر موثوق لكن بصورة خاطئة",
    claim: "خبر حقيقي من وكالة أنباء معروفة عن حادث مروري، مرفق بصورة لحادث مختلف تمامًا من مدينة أخرى.",
    source: "وكالة أنباء معروفة لها تاريخ تحريري، والخبر منشور على موقعها الرسمي.",
    dateHint: "تاريخ الخبر حديث ويطابق تاريخ الحادث المعلن.",
    imageHint: "الصورة من حادث آخر: لوحات السيارات واللافتات لا تناسب المدينة المعلنة.",
    flags: ["الصورة لا تناسب المكان المعلن رغم صحة الخبر", "الخبر نفسه موثق من مصدر رسمي"],
    verdict: "معلومات ناقصة",
    why: "الخبر نفسه موثق، لكن الصورة المرفقة مضللة بالسياق — قد تجعل القارئ يظن أن الصورة من الحادث نفسه. الحل ليس تكذيب الخبر، بل تصحيح الصورة والانتباه للسياق.",
    evidence: ["الخبر الأصلي من الوكالة نفسها", "تاريخ الصورة ومصدرها الحقيقي", "بيانات رسمية عن الحادث"],
    howToCheck: "افصل بين الخبر والصورة: تحقق من كل منهما وحده. ابحث بالصورة عكسيًا لتعرف مصدرها الحقيقي.",
  },
  {
    id: "case6", title: "منشور غاضب يدّعي فضيحة بلا دليل",
    claim: "«فضيحة كبرى! الجميع يخفي عنك الحقيقة — شارك قبل الحذف!»",
    source: "حساب يبيع منتجات، ويستخدم المنشورات الغاضبة لجذب المتابعين.",
    dateHint: "المنشور بلا تاريخ ولا مرجع زمني، ويُعاد نشره كل فترة بنفس الصيغة.",
    imageHint: "صورة مولّدة أو معدّلة: نصوص داخلها غير مقروءة، وإضاءة غير متسقة.",
    flags: ["أسلوب تخويف واستعجال: «قبل الحذف»", "الناشر يستفيد تجاريًا من الانتشار", "لا يوجد أي دليل أو مصدر", "تفاصيل الصورة مشوهة"],
    verdict: "علامات تضليل محتملة",
    why: "المنشور يجمع عدة علامات: إثارة الخوف والغضب، استعجال المشاركة، غياب الدليل، وصورة مشكوك فيها. كل علامة وحدها تستدعي التوقف — ومجتمعة تجعل إعادة النشر خطرًا.",
    evidence: ["مصدر مستقل موثوق ينقل نفس المعلومة", "وثيقة أو تصريح قابل للتحقق", "مصدر الصورة وتاريخها الحقيقي"],
    howToCheck: "توقف عند أي منشور يطلب منك المشاركة «قبل الحذف» — هذا أسلوب ضغط لا أسلوب إخبار. ابحث عن المعلومة في مصدر مستقل قبل أي تفاعل.",
  },
];

const CHECKS = [
  { id: "read", label: "قرأت المحتوى كاملًا؟", hint: "العنوان وحده لا يكفي — اقرأ المتن كاملًا قبل أي حكم." },
  { id: "source", label: "المصدر موثوق؟", hint: "مؤسسة معروفة لها تاريخ تحريري، وليس حسابًا مجهولًا أو حديثًا." },
  { id: "date", label: "التاريخ حديث ومناسب؟", hint: "محتوى قديم يُعاد نشره كأنه جديد من أشهر حيل التضليل." },
  { id: "image", label: "الصورة مرتبطة بالخبر فعلًا؟", hint: "الصورة قد تكون حقيقية لكن من حدث أو مكان آخر." },
  { id: "other", label: "توجد مصادر أخرى مستقلة؟", hint: "مصدر واحد مجهول لا يكفي — ابحث عن تأكيد مستقل." },
  { id: "title", label: "العنوان غير مضلل؟", hint: "إذا كان العنوان أقوى من المتن، فهذه علامة شك." },
  { id: "emotion", label: "الخبر لا يحاول إثارة غضبك أو خوفك؟", hint: "الغضب والخوف يوقفان التفكير — توقف لحظة واسأل عن الدليل." },
];

const TRIGGER_WORDS = ["عاجل", "صادم", "فضيحة", "لن تصدق", "قبل الحذف", "الجميع", "كارثة", "مؤكد", "حصري", "خطير"];

const STEPS = [
  { icon: Search, title: "1. المصدر", text: "هل الخبر من مؤسسة إخبارية معروفة لها تاريخ تحريري، أم من حساب مجهول أو صفحة حديثة؟ ابحث عن اسم الناشر خارج المنصة نفسها." },
  { icon: FileSearch, title: "2. التاريخ", text: "ابحث عن تاريخ النشر الأصلي وقارنه بتاريخ الحدث المزعوم. محتوى قديم يُعاد نشره كأنه جديد هو أكثر أساليب التضليل شيوعًا." },
  { icon: Eye, title: "3. الصورة والفيديو", text: "ابحث بالصورة عكسيًا، ولاحظ التفاصيل: اللافتات، الطقس، الملابس، وحركة الشفاه في الفيديو." },
  { icon: Link2, title: "4. مصادر مستقلة", text: "هل نقل الخبر مصدر موثوق آخر مستقل؟ إذا كان المصدر الوحيد هو الحساب نفسه، فالخبر ادعاء وليس حقيقة حتى يثبت العكس." },
  { icon: MessageSquareWarning, title: "5. الادعاء مقابل الدليل", text: "«يقولون إن…» ليست دليلًا. الدليل وثيقة أو تصريح مسجل أو بيانات يمكن التحقق منها. لا تشارك قبل أن تجد دليلًا واحدًا على الأقل." },
];

function analyzeText(text: string) {
  const reasons: string[] = [];
  let score = 0;
  const exclamations = (text.match(/!/g) ?? []).length + (text.match(/؟/g) ?? []).length;
  if (exclamations >= 2) { score += 2; reasons.push(`علامات تعجب واستفهام كثيرة (${exclamations}) — أسلوب إثارة شائع في العناوين المضللة.`); }
  const found = TRIGGER_WORDS.filter((w) => text.includes(w));
  if (found.length > 0) { score += found.length * 2; reasons.push(`كلمات إثارة لغوية: «${found.join("، ")}» — كلمات مصممة لجذب الانتباه قبل تقديم المعلومة.`); }
  const words = text.split(/\s+/).filter(Boolean);
  const caps = words.filter((w) => /^[A-Zأ-ي]{3,}$/.test(w.replace(/[^A-Za-zأ-ي]/g, "")) && /[A-Z]/.test(w)).length;
  if (caps > 0) { score += 1; reasons.push("كلمات بأحرف كبيرة (CAPS) — أسلوب صراخ لغوي يستخدم لجذب الانتباه."); }
  if (words.length > 0 && words.length < 6) { score += 1; reasons.push("النص قصير جدًا بلا تفاصيل — الادعاء بلا سياق يصعب التحقق منه."); }
  if (!/[.!؟]$/.test(text.trim()) && text.trim().length > 0) { score += 0; }
  if (reasons.length === 0) reasons.push("لم تظهر علامات لغوية مثيرة في النص — لكن هذا لا يعني أن المحتوى صحيح؛ تحقق من المصدر والتاريخ ومصادر مستقلة.");
  const verdict: Verdict = score >= 4 ? "علامات تضليل محتملة" : score >= 2 ? "يحتاج تحقق" : "معلومات ناقصة";
  return { score, reasons, verdict };
}

export default function VerifyPage() {
  const [answers, setAnswers] = useState<Record<string, Verdict>>({});
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [claimText, setClaimText] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeText> | null>(null);

  const correctCount = useMemo(
    () => CASES.filter((c) => answers[c.id] === c.verdict).length,
    [answers]
  );
  const answeredCount = Object.keys(answers).length;
  const checksYes = CHECKS.filter((c) => checks[c.id]).length;

  const shareAdvice = useMemo(() => {
    if (checksYes === CHECKS.length) return { label: "جاهز للمشاركة بحذر", tone: "text-cyanx", text: "كل الفحوصات إيجابية — مع ذلك، تأكد أنك قرأت المحتوى كاملًا وفهمت سياقه قبل المشاركة." };
    if (checksYes >= 5) return { label: "يحتاج تحقق إضافي", tone: "text-amber-400", text: "بقيت فحوصات سلبية — راجعها قبل المشاركة، فأي فحص سلبي قد يعني أن المحتوى مضلل أو ناقص." };
    return { label: "لا تشارك بعد", tone: "text-red-400", text: "فحوصات كثيرة سلبية — توقف عن المشاركة الآن، وابحث عن مصدر موثوق ومستقل أولًا." };
  }, [checksYes]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مركز التحقق" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>تدريب عملي — لا أحكام قاطعة بلا دليل</Eyebrow>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">قبل أن تصدّق… تحقّق</h1>
        <p className="mt-3 text-muted leading-8">
          مركز تدريب على كشف التضليل: ست حالات تدريبية مبنية على أساليب تضليل حقيقية ومنتشرة
          (محتوى قديم بادعاء جديد، عنوان مضلل، فيديو مشكوك فيه…). اختر الحكم الذي تراه مناسبًا لكل حالة،
          وستحصل فورًا على الشرح والأدلة التي يجب البحث عنها. لا نعرض أي ادعاء غير موثق على أنه حقيقة.
        </p>
        {answeredCount > 0 && (
          <p className="mt-3 text-sm font-bold">نتيجتك حتى الآن: {correctCount} من {answeredCount} إجابة صحيحة</p>
        )}
      </div>

      {/* Training cases */}
      <section className="mt-8 space-y-4">
        {CASES.map((c, idx) => {
          const chosen = answers[c.id];
          const isCorrect = chosen === c.verdict;
          return (
            <motion.article key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl glass p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/15 text-cyanx px-2.5 py-1 font-bold">حالة تدريبية {idx + 1} من {CASES.length}</span>
              </div>
              <h2 className="mt-3 text-lg sm:text-xl font-bold">{c.title}</h2>
              <p className="mt-2 rounded-xl bg-white/5 border border-line p-4 text-sm leading-8">«{c.claim}»</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3 text-xs text-muted leading-6">
                <p><span className="font-bold text-paper">المصدر: </span>{c.source}</p>
                <p><span className="font-bold text-paper">التاريخ: </span>{c.dateHint}</p>
                <p><span className="font-bold text-paper">الصورة: </span>{c.imageHint}</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-bold text-muted mb-2">علامات الشك الظاهرة:</p>
                <ul className="flex flex-wrap gap-2">
                  {c.flags.map((f) => (
                    <li key={f} className="text-xs rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 px-3 py-1.5">{f}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm font-bold">ما حكمك على هذه الحالة؟</p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`الحكم على ${c.title}`}>
                {(["يحتاج تحقق", "علامات تضليل محتملة", "معلومات ناقصة"] as Verdict[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setAnswers((p) => ({ ...p, [c.id]: v }))}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition border ${
                      chosen === v ? "bg-primary border-primary text-white" : "border-line bg-white/5 text-muted hover:border-primary hover:text-paper"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {chosen && (
                <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? "bg-cyanx/10 border-cyanx/40" : "bg-amber-400/10 border-amber-400/40"}`}>
                  <p className="font-bold flex items-center gap-2 text-sm">
                    {isCorrect ? <CheckCircle2 className="h-5 w-5 text-cyanx" /> : <XCircle className="h-5 w-5 text-amber-400" />}
                    {isCorrect ? "إجابة صحيحة — أحسنت!" : `الحكم الأدق هو: ${c.verdict}`}
                  </p>
                  <p className="mt-2 text-sm leading-8"><span className="font-bold">لماذا؟ </span>{c.why}</p>
                  <p className="mt-2 text-sm leading-8"><span className="font-bold">ما الأدلة التي يجب البحث عنها؟ </span></p>
                  <ul className="text-sm text-muted leading-7 list-disc list-inside">
                    {c.evidence.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                  <p className="mt-2 text-sm leading-8"><span className="font-bold">كيف تتحقق عمليًا؟ </span>{c.howToCheck}</p>
                </div>
              )}
            </motion.article>
          );
        })}
      </section>

      {/* Before You Share */}
      <section className="mt-12 rounded-2xl glass p-5 sm:p-7">
        <h2 className="text-2xl font-extrabold flex items-center gap-2"><Share2 className="h-6 w-6 text-cyanx" /> قبل ما تعمل Share</h2>
        <p className="mt-2 text-muted leading-8 text-sm">
          أداة تدريب سريعة قبل نشر أي محتوى. أجب عن الفحوصات السبعة، والصق نص الخبر أو الادعاء
          لتحليل لغوي توعوي محلي — النتيجة استشارية فقط (يحتاج للتحقق / علامات تضليل محتملة / معلومات ناقصة)،
          وليست حكمًا قاطعًا بأن الخبر حقيقي أو كاذب، ولا نخترع مصادر.
        </p>

        <div className="mt-6 space-y-3">
          {CHECKS.map((c) => (
            <div key={c.id} className="flex items-start gap-3 rounded-xl bg-white/5 border border-line p-4">
              <button
                onClick={() => setChecks((p) => ({ ...p, [c.id]: !p[c.id] }))}
                aria-pressed={!!checks[c.id]}
                className={`shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border transition ${checks[c.id] ? "bg-cyanx border-cyanx text-ink" : "border-line text-transparent"}`}
                aria-label={c.label}
              >
                <CheckCircle2 className="h-5 w-5" />
              </button>
              <div>
                <p className="font-bold text-sm">{c.label}</p>
                <p className="text-xs text-muted leading-6 mt-0.5">{c.hint}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-line bg-white/5 p-4">
          <p className="text-sm font-bold">نتيجة الفحص: <span className={shareAdvice.tone}>{shareAdvice.label}</span> ({checksYes} من {CHECKS.length} إيجابية)</p>
          <p className="text-sm text-muted leading-7 mt-1">{shareAdvice.text}</p>
        </div>

        <div className="mt-6">
          <label htmlFor="claim-input" className="text-sm font-bold flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-cyanx" /> الصق نص خبر أو ادعاء لتحليل لغوي توعوي
          </label>
          <textarea
            id="claim-input"
            value={claimText}
            onChange={(e) => { setClaimText(e.target.value); setAnalysis(null); }}
            rows={3}
            placeholder="مثال: عاجل! فضيحة كبرى لن تصدق ما حدث…"
            className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm leading-7 placeholder:text-muted/60 focus:border-primary focus:outline-none"
          />
          <button
            onClick={() => claimText.trim() && setAnalysis(analyzeText(claimText))}
            disabled={!claimText.trim()}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold disabled:opacity-40 hover:bg-primary/80 transition"
          >
            <ShieldQuestion className="h-4 w-4" /> حلّل النص توعويًا
          </button>
          {analysis && (
            <div className="mt-4 rounded-xl border border-line bg-white/5 p-4">
              <p className="font-bold text-sm flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                النتيجة الاستشارية: {analysis.verdict}
              </p>
              <p className="text-xs text-muted mt-1 leading-6">
                هذا تحليل لغوي محلي فقط — يعدّ علامات الإثارة في النص، ولا يحكم على صحة الخبر،
                ولا يبحث في مصادر خارجية، ولا يخترع أي مصدر. للتحقق الحقيقي راجع المصدر والتاريخ ومصادر مستقلة.
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
                {analysis.reasons.map((r) => <li key={r}>• {r}</li>)}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 5-step guide */}
      <section className="mt-12">
        <h2 className="text-2xl font-extrabold flex items-center gap-2"><Info className="h-6 w-6 text-cyanx" /> دليل التحقق في 5 خطوات</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-2xl glass p-5 card-hover">
              <s.icon className="h-6 w-6 text-cyanx" />
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-7">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted leading-7 rounded-2xl border border-line bg-surface/60 p-4">
          القاعدة الذهبية: الفرق بين الادعاء والدليل — الادعاء كلام يحتاج إثباتًا، والدليل وثيقة أو تصريح مسجل
          أو بيانات يمكن التحقق منها. لا تشارك ادعاءً قبل أن تجد دليلًا واحدًا على الأقل.
        </p>
      </section>
    </main>
  );
}
