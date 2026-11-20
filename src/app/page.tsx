import Link from "next/link";
import { ArrowLeft, Brain, Cpu, ShieldCheck, Eye, Flame, BookOpen, Trophy, ScanFace, Share2, FlaskConical, CheckCircle2, Sparkles } from "lucide-react";
import { Eyebrow, SectionHead } from "@/components/ui/Shared";
import HeroVisual from "@/components/hero/HeroVisual";
import { articles, challenges } from "@/lib/data";

const modules = [
  { href: "/algorithms", icon: Cpu, title: "افهم الخوارزمية", desc: "لماذا ترى هذا المحتوى تحديدًا؟ جرّب محاكاة تفاعلية تشرح كيف ترتّب المنصات فيدك.", tag: "الوحدة 01" },
  { href: "/influence", icon: Flame, title: "التأثير الرقمي", desc: "هل تختار المحتوى... أم المحتوى يختار كيف يؤثر عليك؟ سيناريوهات تفاعلية تكشف أساليب جذب الانتباه.", tag: "الوحدة 02" },
  { href: "/verify", icon: Eye, title: "الحقيقة والتضليل", desc: "قبل أن تصدق... تحقق. مركز تدريب عملي على كشف الأخبار المضللة والصور المولّدة.", tag: "الوحدة 03" },
  { href: "/privacy", icon: ShieldCheck, title: "بياناتك الرقمية", desc: "أنت تترك أثرًا أكبر مما تتخيل. راجع خصوصيتك واحصل على تقييم تعليمي وخطوات عملية.", tag: "الوحدة 04" },
  { href: "/awareness", icon: Brain, title: "استعادة السيطرة", desc: "التكنولوجيا أداة... وليست من يتحكم في يومك. عادات رقمية واعية وتحديات يومية.", tag: "الوحدة 05" },
];

const stats = [
  { value: "5", label: "وحدات وعي تفاعلية" },
  { value: "12", label: "مقالًا في المكتبة" },
  { value: "6", label: "تحديات يومية" },
  { value: "10", label: "تصنيفات معرفية" },
];

export default function Home() {
  const latest = articles.slice(0, 3);
  const today = challenges[0];
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden noise">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <Eyebrow>وعي. فهم. تحكم.</Eyebrow>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.25]">
                أنت ترى الإنترنت...
                <span className="block text-gradient">لكن هل تفهم كيف يراك؟</span>
              </h1>
              <p className="mt-5 text-lg text-muted leading-9">
                كل فيديو تشاهده، كل خبر تقرأه، وكل محتوى تتفاعل معه، يساهم في تشكيل تجربتك الرقمية.
                إدراك يساعدك على فهم الخوارزميات، اكتشاف التضليل، حماية خصوصيتك، واستعادة السيطرة على تجربتك الرقمية.
              </p>
              <p className="mt-3 text-sm text-muted leading-7">افهم العالم الرقمي قبل أن يؤثر عليك.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/awareness" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition">
                  ابدأ رحلة الوعي <ArrowLeft className="size-4" />
                </Link>
                <Link href="/digital-mirror" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 font-bold hover:border-primary/60 transition">
                  <ScanFace className="size-4 text-cyanx" /> اختبر وعيك الرقمي
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-surface/70 px-3 py-3 text-center">
                    <div className="text-2xl font-extrabold text-cyanx">{s.value}</div>
                    <div className="mt-0.5 text-xs text-muted leading-5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHead eyebrow="وحدات الوعي الخمس" title="رحلتك تبدأ من الفهم" desc="خمس وحدات مترابطة: كل واحدة تجربة تفاعلية قصيرة، وليست مقالًا طويلًا تقرأه وتنساه." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <Link key={m.href} href={m.href} className="glass card-hover rounded-3xl p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><m.icon className="size-6" /></span>
                <span className="text-xs font-bold text-muted">{m.tag}</span>
              </div>
              <h3 className="text-xl font-extrabold">{m.title}</h3>
              <p className="text-sm text-muted leading-7 flex-1">{m.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cyanx">ابدأ الوحدة <ArrowLeft className="size-4" /></span>
            </Link>
          ))}
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 to-cyanx/10 p-6 flex flex-col justify-between gap-4">
            <Sparkles className="size-7 text-cyanx" />
            <h3 className="text-xl font-extrabold leading-8">كل وحدة تنتهي بخطوة عملية واحدة يمكنك تطبيقها اليوم.</h3>
            <p className="text-sm text-muted leading-7">لا نعدك بتغيير حياتك في يوم، بل بفهم أوضح يتراكم مع كل تجربة.</p>
          </div>
        </div>
      </section>

      {/* ALGORITHM TEASER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <Eyebrow>مختبر الخوارزمية</Eyebrow>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">كيف تراك الخوارزمية؟</h2>
              <p className="mt-3 text-muted leading-8 max-w-2xl">
                كل تفاعل إشارة: مشاهدة كاملة، توقف قصير، إعجاب، تخطٍّ. في المختبر تدخل منصة افتراضية، تتفاعل مع محتوى، وتشاهد التوصيات تتغير أمامك خطوة بخطوة — تفاعل ← إشارات ← توصيات ← محتوى جديد ← تفاعل أكثر.
              </p>
            </div>
            <Link href="/algorithm-lab" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition whitespace-nowrap">
              <FlaskConical className="size-5" /> جرّب المختبر
            </Link>
          </div>
        </div>
      </section>

      {/* MIRROR + SHARE teasers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass card-hover rounded-3xl p-6 sm:p-8">
            <ScanFace className="size-8 text-cyanx" />
            <h3 className="mt-4 text-2xl font-extrabold">مرآتك الرقمية</h3>
            <p className="mt-2 text-muted leading-8">12 سؤالًا اختياريًا عن عاداتك الرقمية، يرسم لك ملف وعي تعليميًا: وعي بالخوارزمية، بالخصوصية، بالتحقق، بالانتباه، وبالعادات — مع خطة تطوير 7 أيام. التقييم يعمل محليًا على جهازك ولا يُحفظ إلا بموافقتك، وهو تعليمي وليس تشخيصًا نفسيًا.</p>
            <Link href="/digital-mirror" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white hover:bg-blue-500 transition">ابدأ التقييم <ArrowLeft className="size-4" /></Link>
          </div>
          <div className="glass card-hover rounded-3xl p-6 sm:p-8">
            <Share2 className="size-8 text-cyanx" />
            <h3 className="mt-4 text-2xl font-extrabold">قبل ما تعمل Share</h3>
            <p className="mt-2 text-muted leading-8">سبعة أسئلة سريعة قبل نشر أي خبر: هل قرأته كاملًا؟ هل المصدر موثوق؟ هل التاريخ حديث؟ هل الصورة مرتبطة بالخبر؟ دقيقة واحدة تفصل بين مشاركة واعية ومشاركة تضليل لا تقصده.</p>
            <Link href="/verify" className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-bold hover:border-primary/60 transition">افتح قائمة التحقق <ArrowLeft className="size-4" /></Link>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <SectionHead eyebrow="من المكتبة" title="أحدث المقالات" desc="شرح بسيط بلغة مصرية واضحة، مع أمثلة واقعية وخطوات حماية عملية." />
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {latest.map((a) => (
            <Link key={a.slug} href={`/library/${a.slug}`} className="glass card-hover rounded-3xl p-6 flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold text-cyanx"><BookOpen className="size-3.5" /> {a.category}</span>
              <h3 className="text-lg font-extrabold leading-8">{a.title}</h3>
              <p className="text-sm text-muted leading-7 flex-1">{a.summary}</p>
              <span className="text-xs text-muted">قراءة {a.minutes} دقائق</span>
            </Link>
          ))}
        </div>
        <Link href="/library" className="mt-6 inline-flex items-center gap-2 font-bold text-cyanx hover:underline">تصفح كل المقالات <ArrowLeft className="size-4" /></Link>
      </section>

      {/* DAILY CHALLENGE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="rounded-3xl border border-line bg-gradient-to-l from-primary/20 via-surface to-surface p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/20 text-cyanx"><Trophy className="size-7" /></span>
          <div className="flex-1">
            <Eyebrow>تحدي اليوم</Eyebrow>
            <h3 className="mt-3 text-2xl font-extrabold">{today.title}</h3>
            <p className="mt-1.5 text-muted leading-8">{today.desc} — أكمل التحدي واحصل على {today.xp} نقطة خبرة (XP) مرتبطة بتعلم فعلي.</p>
          </div>
          <Link href="/challenges" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition whitespace-nowrap">ابدأ التحدي <ArrowLeft className="size-4" /></Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-ink2 p-8 sm:p-12 text-center noise">
          <CheckCircle2 className="mx-auto size-10 text-cyanx" />
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">مش كل اللي بتشوفه حقيقة،<br />ومش كل اللي بتفكر فيه نابع منك وحدك.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted leading-8">ابدأ بخطوة واحدة اليوم: جرّب المرآة الرقمية، أو ادخل مختبر الخوارزمية، أو راجع خصوصيتك في دقيقتين.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/digital-mirror" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition">اختبر وعيك الرقمي <ArrowLeft className="size-4" /></Link>
            <Link href="/awareness" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 font-bold hover:border-primary/60 transition">ابدأ رحلة الوعي</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
