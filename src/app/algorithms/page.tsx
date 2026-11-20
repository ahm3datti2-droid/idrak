import Link from "next/link";
import { ArrowLeft, Cpu, Clock, Heart, MousePointerClick, Search, Repeat, Users, AlertTriangle, FlaskConical } from "lucide-react";
import { Eyebrow, SectionHead, Breadcrumbs } from "@/components/ui/Shared";
import MiniFeed from "@/components/interactive/MiniFeed";

const factors = [
  { icon: Clock, title: "مدة المشاهدة", desc: "كم ثانية توقفت عند المنشور؟ مشاهدة فيديو كامل إشارة أقوى بكثير من تمريرة سريعة. الأنظمة تفترض أن ما أبقاك مهتمًا هو ما تريده أكثر." },
  { icon: Heart, title: "التفاعل", desc: "الإعجاب والتعليق والمشاركة والحفظ — كلها إشارات. حتى التعليق الغاضب يُحسب تفاعلًا، ولهذا ينتشر المحتوى المستفز أحيانًا." },
  { icon: MousePointerClick, title: "النقر والتخطي", desc: "نقرت على ماذا وتخطيت ماذا؟ التخطي السريع المتكرر لنوع معين يخفض ظهوره، والنقر المتكرر يرفعه." },
  { icon: Search, title: "البحث والمتابعة", desc: "ما بحثت عنه ومن تابعت: النظام يبني ملف اهتماماتك من هذه الاختيارات الصريحة، ويقترح ما يشبهها." },
  { icon: Users, title: "ما يفعله من يشبهونك", desc: "إذا تفاعل أشخاص يشبهونك في الاهتمامات مع محتوى ما، قد يُقترح عليك أيضًا — حتى لو لم تبحث عنه أبدًا." },
  { icon: Repeat, title: "حداثة المحتوى وانتشاره", desc: "المحتوى الجديد وسريع الانتشار يحصل على دفعة أولية ليُختبر مع جمهور أوسع، ثم يستمر إن حافظ على التفاعل." },
];

const steps = [
  { n: "1", title: "تجمع الإشارات", desc: "مشاهداتك ونقراتك وتفاعلاتك وعمليات بحثك." },
  { n: "2", title: "تبني ملف اهتمامات", desc: "مواضيع وأنواع محتوى يُتوقع أن تتفاعل معها." },
  { n: "3", title: "ترتّب ملايين المنشورات", desc: "لكل منشور نقاط متوقعة بناءً على ملفك." },
  { n: "4", title: "تعرض لك الأعلى نقاطًا", desc: "فيدك ليس «كل شيء» بل «ما يُتوقع أن يبقيك»." },
  { n: "5", title: "تتعلم من رد فعلك", desc: "تفاعلك الجديد يحدّث الملف، وتتكرر الدورة." },
];

export default function AlgorithmsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مركز الوعي", href: "/awareness" }, { label: "افهم الخوارزمية" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>الوحدة 01 — افهم الخوارزمية</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">لماذا ترى <span className="text-gradient">هذا المحتوى تحديدًا؟</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          حين تفتح أي منصة، لا ترى «كل» المحتوى المنشور، بل قائمة مختارة خصيصًا لك. نظام التوصية (Recommendation System) هو برنامج يرتّب ملايين المنشورات ويعرض لك ما يتوقع أن تتفاعل معه أكثر — لأن وقتك هو ما يُباع للمعلنين.
        </p>
      </div>

      <section className="mt-10">
        <MiniFeed />
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="كيف يرتّب النظام المحتوى؟" title="الدورة الكاملة في 5 خطوات" desc="هذه دورة تعليمية مبسطة توضح الفكرة العامة لأنظمة التوصية. المنصات الحقيقية أكثر تعقيدًا بكثير، وتفاصيلها الدقيقة غير معلنة." />
        <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s) => (
            <li key={s.n} className="glass rounded-3xl p-5">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-white font-extrabold">{s.n}</span>
              <h3 className="mt-3 font-extrabold leading-7">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted leading-7">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="عوامل الترتيب" title="ست إشارات يقرأها النظام منك كل يوم" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((f) => (
            <article key={f.title} className="glass card-hover rounded-3xl p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><f.icon className="size-6" /></span>
              <h3 className="mt-4 text-lg font-extrabold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted leading-7">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-2 gap-4">
        <article className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">فقاعة الترشيح (Filter Bubble)</h2>
          <p className="mt-3 text-muted leading-8">
            حين ترى دائمًا ما يشبه ما شاهدته، يضيق عالمك تدريجيًا. الفقاعة ليست مؤامرة؛ هي نتيجة طبيعية لنظام يحاول إرضاءك: يعرض لك المزيد مما أعجبك، فيحجب عنك — دون أن يقصد — محتوى مختلفًا قد يفيدك أو يصحح فهمك.
          </p>
          <p className="mt-3 text-muted leading-8">
            الخطر أن تظن أن رأيًا معينًا هو رأي «الجميع»، بينما هو رأي الدائرة التي رشّحتها لك الخوارزمية. العلاج: نوّع مصادرك بنفسك، وابحث عن الموضوع بدل الاعتماد على الاقتراحات فقط.
          </p>
        </article>
        <article className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">غرفة الصدى (Echo Chamber)</h2>
          <p className="mt-3 text-muted leading-8">
            الجانب البشري من الفقاعة: مجموعات وأصدقاء يرددون نفس الآراء، فيتضخم شعورك بأن فكرتك هي الفكر السائد، ويصبح أي اختلاف «مشبوهًا» لمجرد أنه جديد عليك.
          </p>
          <p className="mt-3 text-muted leading-8">
            الخروج لا يحتاج جدالًا مع أحد: اقرأ مصدرًا موثوقًا يختلف معك أحيانًا، واسأل «ما الدليل؟» قبل «من قال؟»، وتابع خبيرًا في المجال نفسه لا ناشطًا في الرأي فقط.
          </p>
        </article>
      </section>

      <div className="mt-10 rounded-3xl border border-amber-400/40 bg-amber-400/5 p-6 flex gap-4">
        <AlertTriangle className="size-6 shrink-0 text-amber-300" />
        <div>
          <h3 className="font-extrabold">تنبيه مهم</h3>
          <p className="mt-1 text-sm text-muted leading-7">كل المحاكاة والشرح هنا تعليمي ومبسط، ولا يمثل خوارزمية أي منصة حقيقية مثل فيسبوك أو تيك توك أو يوتيوب؛ تفاصيل تلك الأنظمة غير معلنة وتتغير باستمرار. الهدف أن تفهم المبدأ، لا أن تعرف أسرار منصة بعينها.</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/algorithm-lab" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition"><FlaskConical className="size-5" /> جرّب مختبر الخوارزمية الكامل</Link>
        <Link href="/influence" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 font-bold hover:border-primary/60 transition">الوحدة التالية: التأثير الرقمي <ArrowLeft className="size-4" /></Link>
      </div>

      <p className="mt-8 flex items-center gap-2 text-sm text-muted"><Cpu className="size-4 text-cyanx" /> اقرأ المزيد: <Link href="/library/how-recommendation-systems-work" className="font-bold text-cyanx hover:underline">كيف تعمل أنظمة التوصية؟</Link></p>
    </div>
  );
}
