import Link from "next/link";
import { ArrowLeft, Brain, Cpu, Eye, Flame, ShieldCheck, ScanFace, FlaskConical, Trophy, BookOpen, Share2 } from "lucide-react";
import { Eyebrow, SectionHead, Breadcrumbs } from "@/components/ui/Shared";

const modules = [
  { href: "/algorithms", icon: Cpu, num: "01", title: "افهم الخوارزمية", q: "لماذا ترى هذا المحتوى تحديدًا؟", desc: "أنظمة التوصية ترتّب ملايين المنشورات بناءً على إشاراتك: مدة المشاهدة، التوقف، الإعجاب، التخطي. في هذه الوحدة تجرّب محاكاة تفاعلية تغيّر فيها اهتماماتك وتشاهد الفيد الافتراضي يعيد ترتيب نفسه. المحاكاة تعليمية ولا تدّعي أنها خوارزمية فيسبوك أو تيك توك الحقيقية.", points: ["عوامل ترتيب المحتوى", "الإشارات التي يقرأها النظام", "التخصيص وفقاعة الترشيح"] },
  { href: "/influence", icon: Flame, num: "02", title: "التأثير الرقمي", q: "هل تختار المحتوى... أم المحتوى يختار كيف يؤثر عليك؟", desc: "المحتوى الذي يثير عاطفة قوية — غضبًا أو خوفًا أو فضولًا — ينتشر أسرع، ليس لأنه أدق، بل لأنه يوقف التمرير. سيناريوهات تفاعلية تكشف طُعم الغضب والخوف والفضول، وإثبات الاجتماعي والخوف من الفوات (FOMO).", points: ["التلاعب العاطفي وطُعم الغضب", "العناوين المضللة (Clickbait)", "اقتصاد الانتباه والإثبات الاجتماعي"] },
  { href: "/verify", icon: Eye, num: "03", title: "الحقيقة والتضليل", q: "قبل أن تصدق... تحقق.", desc: "الأخبار الكاذبة، التزييف العميق، الصور المولّدة بالذكاء الاصطناعي، والحسابات المزيفة، والمحتوى القديم الذي يُعاد نشره كأنه جديد. مركز تدريب عملي يعلمك فحص أي خبر في دقيقتين: المصدر، التاريخ، الصورة، والمصادر المستقلة.", points: ["التزييف العميق والصور المولّدة", "إعادة نشر محتوى قديم بادعاء جديد", "الفرق بين الادعاء والدليل"] },
  { href: "/privacy", icon: ShieldCheck, num: "04", title: "بياناتك الرقمية", q: "أنت تترك أثرًا أكبر مما تتخيل.", desc: "بصمتك الرقمية تشمل بحثك ونقراتك ومواقعك والأذونات التي تمنحها. مركز خصوصية تفاعلي بقائمة مراجعة من 10 نقاط يمنحك تقييمًا تعليميًا وخطوات عملية، دون أن يطلب منك أي كلمة مرور أو بيانات حساب حقيقية.", points: ["البصمة الرقمية والأذونات", "الكوكيز والتتبع", "كلمات المرور والمصادقة الثنائية"] },
  { href: "/awareness", icon: Brain, num: "05", title: "استعادة السيطرة", q: "التكنولوجيا أداة... وليست من يتحكم في يومك.", desc: "وقت الشاشة، الإشعارات، التشتت الرقمي، وعادات التصفح الواعي. تقييم عادات رقمية، تقرير وعي شخصي، وتحدٍّ أسبوعي بخطوات صغيرة قابلة للتطبيق — لأن تغيير البيئة أقوى من لوم النفس.", points: ["وعي وقت الشاشة", "حدود صحية للتصفح", "تحديات يومية وأسبوعية"] },
];

const concepts = [
  { title: "فقاعة الترشيح (Filter Bubble)", desc: "حين تعرض لك الخوارزمية ما يشبه اهتماماتك السابقة فقط، فيضيق ما تراه تدريجيًا دون أن تشعر، وقد تظن أن رأيًا معينًا هو رأي «الجميع»." },
  { title: "غرفة الصدى (Echo Chamber)", desc: "مجموعات وأصدقاء يرددون نفس الآراء، فيتضخم شعورك بأن فكرتك هي الفكر السائد، ويصبح أي اختلاف «مشبوهًا» لمجرد أنه جديد عليك." },
  { title: "اقتصاد الانتباه (Attention Economy)", desc: "انتباهك مورد محدود تتنافس عليه المنصات؛ التمرير اللانهائي والإشعارات والتشغيل التلقائي صُممت لتقليل لحظة التوقف والتفكير." },
  { title: "الإثبات الاجتماعي (Social Proof)", desc: "نميل لتصديق ما يشاركه أو يعجب به كثيرون. عدد الإعجابات والمشاركات ليس دليل صحة — قد يكون دليل انتشار فقط." },
  { title: "الخوف من الفوات (FOMO)", desc: "الشعور بأنك ستفوت شيئًا مهمًا إن لم تتابع الآن. إشعارات «فلان نشر الآن» و«الجميع يتحدث عن...» تستغل هذا الشعور لتعيدك للتطبيق." },
];

const tools = [
  { href: "/digital-mirror", icon: ScanFace, title: "مرآتك الرقمية", desc: "قيّم وعيك الرقمي في 12 سؤالًا واحصل على خطة 7 أيام." },
  { href: "/algorithm-lab", icon: FlaskConical, title: "مختبر الخوارزمية", desc: "تصفح منصة افتراضية وشاهد التوصيات تتغير مع تفاعلاتك." },
  { href: "/challenges", icon: Trophy, title: "التحديات اليومية", desc: "تحدٍّ جديد كل يوم بنقاط خبرة مرتبطة بتعلم فعلي." },
  { href: "/library", icon: BookOpen, title: "مكتبة المعرفة", desc: "مقالات مبسطة عن الوعي الرقمي والخوارزميات والخصوصية." },
  { href: "/verify", icon: Share2, title: "قبل ما تعمل Share", desc: "قائمة تحقق سريعة من 7 أسئلة قبل نشر أي خبر." },
];

export default function AwarenessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مركز الوعي" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>مركز الوعي الرقمي</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">افهم العالم الرقمي <span className="text-gradient">قبل أن يؤثر عليك</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          إدراك لا تتبنى نظرية مؤامرة، ولا تتهم المنصات بالتلاعب في كل شيء، ولا توجهك سياسيًا أو فكريًا.
          نحن نعلّمك كيف تعمل المنصات، وكيف تتشكل اهتماماتك، وكيف تحمي وعيك وبياناتك — بالمعلومات الموثقة والتفكير النقدي والتجارب التفاعلية.
        </p>
      </div>

      <section className="mt-14">
        <SectionHead eyebrow="الوحدات الخمس" title="خمس وحدات، رحلة واحدة" desc="ابدأ من أي وحدة، لكن الأفضل أن تسير بالترتيب: الفهم أولًا، ثم كشف التأثير، ثم التحقق، ثم حماية بياناتك، ثم استعادة السيطرة." />
        <div className="mt-8 grid gap-5">
          {modules.map((m) => (
            <article key={m.href} className="glass card-hover rounded-3xl p-6 sm:p-8 grid md:grid-cols-[auto_1fr_auto] gap-5 items-start">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-cyanx"><m.icon className="size-7" /></span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-cyanx">الوحدة {m.num}</span>
                  <h2 className="text-2xl font-extrabold">{m.title}</h2>
                </div>
                <p className="mt-1 font-bold text-paper/90">{m.q}</p>
                <p className="mt-2 text-muted leading-8">{m.desc}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {m.points.map((p) => (
                    <li key={p} className="rounded-full border border-line bg-ink2 px-3 py-1 text-xs font-semibold text-muted">{p}</li>
                  ))}
                </ul>
              </div>
              <Link href={m.href} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white hover:bg-blue-500 transition whitespace-nowrap">ابدأ الوحدة <ArrowLeft className="size-4" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="مفاهيم أساسية" title="خمسة مفاهيم تفسر معظم ما تراه" desc="احفظ هذه المفاهيم؛ ستقابلك في كل وحدة وفي كل مقال، وفي حياتك الرقمية كل يوم." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {concepts.map((c) => (
            <article key={c.title} className="glass card-hover rounded-3xl p-6">
              <h3 className="text-lg font-extrabold leading-8">{c.title}</h3>
              <p className="mt-2 text-sm text-muted leading-7">{c.desc}</p>
            </article>
          ))}
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 to-cyanx/10 p-6 flex flex-col justify-center">
            <h3 className="text-lg font-extrabold leading-8">القاعدة الذهبية</h3>
            <p className="mt-2 text-sm text-muted leading-7">إذا شعرت بعاطفة قوية — غضب أو خوف أو فضول شديد — قبل قراءة أي تفاصيل، توقف لحظة واسأل: ما المعلومة هنا؟ وما مصدرها؟</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="أدوات تفاعلية" title="لا تقرأ فقط — جرّب بنفسك" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="glass card-hover rounded-3xl p-6 flex flex-col gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><t.icon className="size-6" /></span>
              <h3 className="text-lg font-extrabold">{t.title}</h3>
              <p className="text-sm text-muted leading-7 flex-1">{t.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cyanx">افتح الأداة <ArrowLeft className="size-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
