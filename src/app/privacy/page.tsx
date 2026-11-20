"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, KeyRound, MapPin, Cookie, Eye, RefreshCw, Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Eyebrow, SectionHead, Breadcrumbs, ScoreBar } from "@/components/ui/Shared";

const items = [
  { id: "2fa", label: "فعّلت المصادقة الثنائية في حساباتك المهمة (البريد، البنك، التواصل)؟", tip: "المصادقة الثنائية تعني أن الدخول يحتاج كلمة المرور + شيء تملكه (هاتفك أو تطبيق مصادقة)، فتبقى محميًا حتى لو سُرقت كلمتك." },
  { id: "unique", label: "تستخدم كلمة مرور مختلفة لكل حساب مهم؟", tip: "كلمة مرور واحدة لكل الحسابات تعني أن تسريبًا واحدًا يفتح كل أبوابك. استخدم مدير كلمات مرور موثوقًا." },
  { id: "perms", label: "راجعت أذونات التطبيقات في آخر شهر (كاميرا، ميكروفون، موقع، جهات اتصال)؟", tip: "احذف الأذونات غير الضرورية، وامنح الموقع «أثناء الاستخدام فقط» للتطبيقات التي تحتاجه فعلًا." },
  { id: "location", label: "أوقفت تتبع الموقع للتطبيقات التي لا تحتاجه؟", tip: "كثير من التطبيقات تطلب موقعك دون حاجة وظيفية. راجع إعدادات الموقع لكل تطبيق على حدة." },
  { id: "cookies", label: "تختار «ضروري فقط» بدل «أوافق على الكل» في نوافذ الكوكيز؟", tip: "«أوافق على الكل» غالبًا يشمل التتبع الإعلاني عبر مواقع مختلفة. اختر الضروري فقط حين يكون متاحًا." },
  { id: "public", label: "راجعت ما هو معلن في حساباتك (رقم هاتفك، بريدك، موقعك)؟", tip: "معلومات تبدو صغيرة — رقم هاتف في منشور قديم — قد تُستخدم في انتحال شخصيتك أو استهدافك." },
  { id: "old", label: "حذفت الحسابات القديمة التي لم تعد تستخدمها؟", tip: "كل حساب قديم منسي يحمل بياناتك وقد يُخترق دون أن تنتبه. احذف ما لا تستخدمه." },
  { id: "updates", label: "تحدّث نظام هاتفك وتطبيقاتك بانتظام؟", tip: "التحديثات تسد ثغرات أمنية معروفة. فعّل التحديث التلقائي حين يكون متاحًا." },
  { id: "backup", label: "احتفظت برموز استرداد المصادقة الثنائية في مكان آمن بعيدًا عن هاتفك؟", tip: "إن فقدت هاتفك دون رموز الاسترداد، قد تفقد الوصول لحساباتك. احفظها في مكان آمن — لا في صور هاتفك." },
  { id: "ads", label: "راجعت إعدادات الإعلانات المخصصة في حساباتك؟", tip: "في إعدادات حساباتك يمكنك إيقاف الإعلانات المخصصة أو مراجعة المواضيع التي تُبنى عليها — راجعها كل فترة." },
];

const verdict = (score: number) => {
  if (score >= 80) return { title: "وعي خصوصية قوي", desc: "عاداتك جيدة. حافظ عليها، وراجع القائمة كل شهر، وعلّم من حولك الخطوة التي تنقصهم." };
  if (score >= 50) return { title: "وعي خصوصية متوسط", desc: "لديك أساس جيد ونقاط تحتاج انتباهًا. ابدأ بالعناصر غير المفعّلة الأعلى أثرًا: المصادقة الثنائية وكلمات المرور المختلفة." };
  return { title: "خصوصيتك تحتاج انتباهًا", desc: "لا تقلق — كل نقطة هنا قابلة للإصلاح في دقائق. ابدأ اليوم بخطوتين فقط: فعّل المصادقة الثنائية في بريدك، وراجع أذونات التطبيقات." };
};

const sections = [
  { icon: Eye, title: "بصمتك الرقمية", desc: "كل بحث ونقرة وموقع تتركه يرسم صورة عنك: منشوراتك وتعليقاتك، عمليات بحثك، مواقعك، التطبيقات التي تثبّتها، والأذونات التي تمنحها. التقليص لا يعني الاختفاء، بل يعني الاختيار: راجع الأذونات، أوقف تتبع الموقع غير الضروري، وامسح سجل النشاط دوريًا." },
  { icon: Cookie, title: "الكوكيز والتتبع", desc: "الكوكيز ملفات صغيرة يحفظها موقع في متصفحك ليتذكرك — بعضها ضروري (تسجيل دخولك ولغتك)، وبعضها تتبعي من أطراف ثالثة يلاحقك عبر مواقع مختلفة لبناء ملف عن اهتماماتك. اختر «ضروري فقط» حين يكون متاحًا، وامسح الكوكيز وبيانات المواقع دوريًا، وفعّل منع التتبع في متصفحك." },
  { icon: MapPin, title: "تتبع الموقع", desc: "بيانات موقعك تكشف بيتك وعملك وروتينك اليومي. اسأل كل تطبيق: هل يحتاج موقعي فعلًا؟ امنح الموقع «أثناء الاستخدام فقط» أو «لا أبدًا» حين لا حاجة، وأوقف سجل المواقع في حساباتك إن لم تستخدمه." },
  { icon: KeyRound, title: "كلمات المرور", desc: "كلمة المرور القوية طويلة وفريدة: جملة من كلمات غير مترابطة أسهل في التذكر وأصعب في الكسر من كلمة قصيرة معقدة. لا تكررها بين الحسابات، ولا تدخلها من رابط وصلك في رسالة، ولا تشارك رمز التحقق مع أي شخص — الدعم الفني الحقيقي لا يطلبه أبدًا." },
];

export default function PrivacyPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const answered = Object.values(answers).filter((v) => v !== null && v !== undefined).length;
  const yes = Object.values(answers).filter((v) => v === true).length;
  const score = useMemo(() => Math.round((yes / items.length) * 100), [yes]);
  const v = verdict(score);
  const missing = items.filter((it) => answers[it.id] === false);

  const set = (id: string, val: boolean) => setAnswers((p) => ({ ...p, [id]: val }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مركز الوعي", href: "/awareness" }, { label: "بياناتك الرقمية" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>الوحدة 04 — بياناتك الرقمية</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">أنت تترك أثرًا <span className="text-gradient">أكبر مما تتخيل</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          بصمتك الرقمية ليست ما تنشره فقط، بل ما تجمعه عنك التطبيقات والمواقع دون أن تنتبه. هذه الصفحة تساعدك على مراجعة خصوصيتك بنفسك — دون أن نطلب منك أي كلمة مرور أو بيانات حساب حقيقية.
        </p>
      </div>

      <section className="mt-12 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-7 text-cyanx" />
            <h2 className="text-2xl font-extrabold">قائمة مراجعة الخصوصية</h2>
          </div>
          <p className="mt-2 text-sm text-muted leading-7">أجب بـ«نعم» أو «لا» بصدق. إجاباتك تبقى على جهازك فقط ولا تُرسل لأي مكان.</p>
          <ul className="mt-6 grid gap-3">
            {items.map((it, i) => (
              <li key={it.id} className="rounded-2xl border border-line bg-ink2 p-4">
                <p className="font-bold leading-8">{i + 1}. {it.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => set(it.id, true)} aria-pressed={answers[it.id] === true}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${answers[it.id] === true ? "bg-cyanx text-ink" : "border border-line bg-ink text-muted hover:text-white"}`}>
                    <CheckCircle2 className="size-4" /> نعم
                  </button>
                  <button onClick={() => set(it.id, false)} aria-pressed={answers[it.id] === false}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${answers[it.id] === false ? "bg-amber-400 text-ink" : "border border-line bg-ink text-muted hover:text-white"}`}>
                    <AlertTriangle className="size-4" /> لا / لست متأكدًا
                  </button>
                </div>
                {answers[it.id] === false && <p className="mt-3 flex gap-2 text-sm text-muted leading-7"><Info className="size-4 shrink-0 mt-1 text-cyanx" />{it.tip}</p>}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-24 rounded-3xl border border-line bg-surface p-6">
          <h3 className="text-lg font-extrabold flex items-center gap-2"><Lock className="size-5 text-cyanx" /> نتيجتك التعليمية</h3>
          <p className="mt-1 text-xs text-muted">أجبت عن {answered} من {items.length} — أكمل القائمة لنتيجة أدق.</p>
          <div className="mt-5"><ScoreBar label="نقاط الخصوصية" value={score} hint="تقييم تعليمي بناءً على إجاباتك فقط، وليس فحصًا تقنيًا لحساباتك ولا تشخيصًا لأمانك." /></div>
          <div className="mt-5 rounded-2xl bg-ink2 border border-line p-4">
            <p className="font-extrabold">{v.title}</p>
            <p className="mt-1.5 text-sm text-muted leading-7">{v.desc}</p>
          </div>
          {missing.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-bold">ابدأ بهذه الخطوات:</p>
              <ul className="mt-2 grid gap-2">
                {missing.slice(0, 3).map((m) => (
                  <li key={m.id} className="flex gap-2 text-sm text-muted leading-7"><RefreshCw className="size-4 shrink-0 mt-1 text-cyanx" />{m.tip}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => setAnswers({})} className="mt-5 w-full rounded-full border border-line bg-ink2 py-2.5 text-sm font-bold hover:border-primary/60 transition">إعادة القائمة من جديد</button>
        </aside>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="اعرف أكثر" title="أربعة مواضيع تحمي بياناتك" />
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {sections.map((s) => (
            <article key={s.title} className="glass card-hover rounded-3xl p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><s.icon className="size-6" /></span>
              <h3 className="mt-4 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-8">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold flex items-center gap-2"><Bell className="size-6 text-cyanx" /> عادة شهرية واحدة</h2>
        <p className="mt-3 text-muted leading-8">
          ضع تذكيرًا شهريًا: راجع أذونات التطبيقات، وامسح الكوكيز وسجل النشاط، وتحقق من جلسات الدخول النشطة في حساباتك المهمة، واحذف حسابًا قديمًا واحدًا. عشر دقائق في الشهر تغنيك عن ساعات من إصلاح الضرر لاحقًا.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/library/digital-footprint-privacy" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white hover:bg-blue-500 transition">اقرأ: بصمتك الرقمية</Link>
          <Link href="/library/passwords-2fa-basics" className="inline-flex items-center gap-2 rounded-full border border-line bg-ink2 px-5 py-3 font-bold hover:border-primary/60 transition">اقرأ: كلمات المرور والمصادقة الثنائية</Link>
          <Link href="/awareness" className="inline-flex items-center gap-2 rounded-full border border-line bg-ink2 px-5 py-3 font-bold hover:border-primary/60 transition">الوحدة التالية: استعادة السيطرة <ArrowLeft className="size-4" /></Link>
        </div>
      </section>
    </div>
  );
}
