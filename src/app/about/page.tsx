import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Brain, BookOpenCheck, Scale, GraduationCap, School, Users, Megaphone, Building2, ScanFace, FlaskConical, Trophy, BookOpen, ShieldCheck, Eye } from "lucide-react";
import { Eyebrow, SectionHead, Breadcrumbs } from "@/components/ui/Shared";

export const metadata: Metadata = {
  title: "عن إدراك",
  description: "إدراك منصة توعية رقمية تساعدك تفهم الخوارزميات والتضليل والخصوصية — بمعلومات موثقة وتفكير نقدي وتجارب تفاعلية، دون نظريات مؤامرة أو توجيه سياسي.",
};

const principles = [
  { icon: BookOpenCheck, title: "معلومات موثقة", desc: "نعتمد على شرح آليات موثقة ومعروفة — كيف تعمل أنظمة التوصية، وما أساليب التضليل الشائعة — ولا ننسب أي ادعاء لمصدر لم يتحقق منه." },
  { icon: Brain, title: "تفكير نقدي لا تخويف", desc: "هدفنا أن تفكر بنفسك، لا أن تخاف. لا نستخدم التخويف ولا المبالغة، ولا نصنع نتائج تقييم وهمية أو تشخيصات نفسية." },
  { icon: Scale, title: "لا نظريات مؤامرة", desc: "لا نتبنى نظرية المؤامرة، ولا نتهم المنصات بالتلاعب في كل شيء. كثير مما يحدث نتيجة تصميم تجاري يهدف لإبقائك أطول — وفهمه يكفي للتعامل معه." },
  { icon: Users, title: "لا توجيه سياسي أو فكري", desc: "لا نوجه المستخدم سياسيًا أو فكريًا. نعلّمك كيف تتحقق بنفسك من أي خبر أو ادعاء، ثم تختار موقفك بحرية." },
];

const audiences = [
  { icon: GraduationCap, title: "الجامعات", desc: "محتوى وتجارب تفاعلية تصلح لمحاضرات وورش الوعي الرقمي والثقافة الإعلامية." },
  { icon: School, title: "المدارس", desc: "شرح مبسط بلغة واضحة يناسب الطلاب، مع تحديات يومية قصيرة تعلّم بالتجربة." },
  { icon: Users, title: "منظمات الشباب", desc: "أنشطة جماعية وتحديات يمكن استخدامها في برامج الشباب والمخيمات الصيفية." },
  { icon: Megaphone, title: "المؤسسات الإعلامية", desc: "مرجع عملي لصحفيين وصنّاع محتوى حول التحقق من الأخبار وكشف التضليل." },
  { icon: Building2, title: "مبادرات المسؤولية المجتمعية", desc: "برنامج توعية رقمية جاهز للشركات التي تريد دعم مجتمعها بمهارة حياتية حقيقية." },
  { icon: ShieldCheck, title: "منظمات السلامة الرقمية", desc: "أدوات تحقق وخصوصية وعادات رقمية يمكن دمجها في حملات التوعية العامة." },
];

const how = [
  { icon: ScanFace, title: "1 — قيّم نفسك", desc: "مرآتك الرقمية: 12 سؤالًا اختياريًا يرسم ملف وعي تعليميًا وخطة 7 أيام، يعمل محليًا على جهازك." },
  { icon: FlaskConical, title: "2 — جرّب بنفسك", desc: "مختبر الخوارزمية ومحاكاة الفيد: غيّر تفاعلاتك وشاهد التوصيات تتغير أمامك." },
  { icon: Trophy, title: "3 — تحدَّ نفسك يوميًا", desc: "تحدٍّ جديد كل يوم بنقاط خبرة مرتبطة بتعلم فعلي — اكتشاف عنوان مضلل، تمييز صورة مولّدة، مراجعة خصوصية." },
  { icon: BookOpen, title: "4 — اقرأ بعمق", desc: "مكتبة مقالات مبسطة: كل مقال فكرة واحدة واضحة، مع «انتبه لـ» و«كيف تحمي نفسك» ومصادر." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "عن إدراك" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>عن إدراك | IDRAK</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">وعي. فهم. <span className="text-gradient">تحكم.</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          مش كل اللي بتشوفه على الإنترنت حقيقة، ومش كل اللي بتفكر فيه نابع منك وحدك. إدراك يساعدك تفهم كيف تعمل المنصات الرقمية، وكيف تتشكل اهتماماتك، وكيف تحمي وعيك وبياناتك وتتخذ قراراتك بنفسك.
        </p>
      </div>

      <section className="mt-14">
        <SectionHead eyebrow="رسالتنا" title="لماذا وُجدت إدراك؟" desc="العالم الرقمي يؤثر فيك كل يوم — في ما تراه، وما تصدقه، وما تشتريه، وكيف تقضي وقتك. معظم هذا التأثير يحدث دون أن تلاحظه. مهمتنا أن نجعل الآليات الخفية مرئية، حتى تستعيد قرارك." />
        <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-lg leading-9 text-paper/90">
            إدراك منصة توعية رقمية عربية: تشرح الخوارزميات بلغة بسيطة، وتدربك على كشف التضليل، وتساعدك على حماية خصوصيتك، وتنظيم علاقتك مع الشاشات — من خلال تجارب تفاعلية قصيرة، لا من خلال محاضرات طويلة.
          </p>
          <p className="mt-4 text-lg leading-9 text-paper/90">
            نؤمن أن الحل ليس حذف التطبيقات ولا الخوف من التكنولوجيا، بل الفهم: حين تعرف كيف يعمل النظام، تستطيع استخدامه لصالحك بدل أن يستخدم انتباهك.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="مبادئنا" title="أربعة مبادئ لا نحيد عنها" />
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {principles.map((p) => (
            <article key={p.title} className="glass card-hover rounded-3xl p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><p.icon className="size-6" /></span>
              <h3 className="mt-4 text-xl font-extrabold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted leading-8">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="كيف تعمل المنصة؟" title="أربع خطوات، كلها تفاعلية" desc="لا نريدك أن تقرأ فقط. كل قسم في إدراك يحتوي على تجربة أو أداة أو معلومة حقيقية يمكنك تطبيقها فورًا." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {how.map((h) => (
            <article key={h.title} className="glass card-hover rounded-3xl p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><h.icon className="size-6" /></span>
              <h3 className="mt-4 font-extrabold leading-8">{h.title}</h3>
              <p className="mt-2 text-sm text-muted leading-7">{h.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="لمن صُممت إدراك؟" title="مبادرة تصلح لقاعة محاضرات كما تصلح لهاتفك" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((a) => (
            <article key={a.title} className="glass card-hover rounded-3xl p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><a.icon className="size-6" /></span>
              <h3 className="mt-4 text-lg font-extrabold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted leading-7">{a.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-primary/40 bg-gradient-to-l from-primary/20 via-surface to-surface p-8 sm:p-10 text-center">
        <Eye className="mx-auto size-9 text-cyanx" />
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">افهم العالم الرقمي قبل أن يؤثر عليك.</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted leading-8">ابدأ اليوم من أي مكان: المرآة الرقمية، مختبر الخوارزمية، أو تحدي اليوم.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/digital-mirror" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition">اختبر وعيك الرقمي <ArrowLeft className="size-4" /></Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 font-bold hover:border-primary/60 transition">تواصل معنا</Link>
        </div>
      </section>
    </div>
  );
}
