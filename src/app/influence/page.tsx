"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flame, AlertTriangle, Eye, Megaphone, Users, Timer, RotateCcw, CheckCircle2, Lightbulb } from "lucide-react";
import { Eyebrow, SectionHead, Breadcrumbs } from "@/components/ui/Shared";

type PostKey = "fear" | "anger" | "curiosity";
const posts: { key: PostKey; icon: typeof Flame; tag: string; title: string; body: string; meta: string }[] = [
  { key: "fear", icon: AlertTriangle, tag: "يعتمد على الخوف", title: "تحذير عاجل: شيء خطير يحدث الآن ولا أحد يخبرك به!", body: "أغلقوا الأبواب... اقرأ قبل فوات الأوان. التفاصيل الكاملة في الداخل.", meta: "مشاركات: 48 ألف • تعليقات: 9 آلاف" },
  { key: "anger", icon: Flame, tag: "يعتمد على الغضب", title: "الجميع غاضب من هذا القرار... وأنت أيضًا يجب أن تغضب!", body: "شاهد ما فعلوه هذه المرة. لن تصدق الوقاحة. شارك رأيك الغاضب في التعليقات.", meta: "مشاركات: 61 ألف • تعليقات: 22 ألف" },
  { key: "curiosity", icon: Eye, tag: "يعتمد على الفضول", title: "لن تصدق ما فعله هذا الشخص... النتيجة في النهاية ستصدمك!", body: "بدأ الأمر عاديًا جدًا، ثم حدث شيء لم يتوقعه أحد. شاهد حتى النهاية.", meta: "مشاركات: 35 ألف • تعليقات: 6 آلاف" },
];

const explanations: Record<PostKey, { title: string; points: string[] }> = {
  fear: {
    title: "أسلوب الخوف",
    points: [
      "الخوف يدفع للتصرف السريع دون تفكير: كلمات مثل «عاجل» و«خطير» و«قبل فوات الأوان» ترفع إحساسك بالإلحاح.",
      "المنشور لا يقدم أي معلومة قابلة للتحقق، فقط وعدًا بالتفاصيل «في الداخل» — فيجبرك على النقر أو المشاركة.",
      "قاعدة عملية: خبر مخيف بلا مصدر واضح يُعامل كادعاء غير مثبت، لا كحقيقة. ابحث عن مصدر مستقل قبل أي مشاركة.",
    ],
  },
  anger: {
    title: "أسلوب الغضب — طُعم الغضب (Rage Bait)",
    points: [
      "الغضب يوقف التمرير ويدفعك للتعليق، والتعليق — حتى لو كان اعتراضًا — يرفع وصول المنشور لدى الخوارزمية.",
      "«الجميع غاضب» إثبات اجتماعي مزيف: يجعلك تشعر أن الغضب هو رد الفعل الطبيعي الوحيد.",
      "التخطي دون تفاعل هو أيضًا موقف: التخطي يعلّم الخوارزمية أن هذا الأسلوب لا يعمل معك.",
    ],
  },
  curiosity: {
    title: "أسلوب الفضول — الطُعم بالنقر (Clickbait)",
    points: [
      "العنوان يخفي المعلومة الأساسية عمدًا: «لن تصدق...» و«النتيجة ستصدمك» وعود بلا محتوى.",
      "فضولك يجعلك تنقر، والنقر نفسه إشارة للخوارزمية بأن العنوان «ناجح»، فينتشر أكثر حتى لو كان المحتوى ضعيفًا.",
      "اسأل قبل النقر: ما المعلومة هنا؟ وهل العنوان يصف المحتوى فعلًا؟ إذا لم يكن هناك جواب، فالعنوان هو المحتوى.",
    ],
  },
};

const techniques = [
  { icon: Flame, title: "التلاعب العاطفي", desc: "المحتوى الذي يثير عاطفة قوية — غضبًا أو خوفًا أو فضولًا — ينتشر أسرع، ليس لأنه أدق، بل لأنه يوقف التمرير ويدفع للتفاعل." },
  { icon: Megaphone, title: "طُعم الغضب (Rage Bait)", desc: "منشور مصمم ليثير غضبك فيدفعك للتعليق. كل تعليق غاضب يرفع وصول المنشور، حتى لو كان الهدف من التعليق الاعتراض عليه." },
  { icon: AlertTriangle, title: "المحتوى القائم على الخوف", desc: "تحذيرات عاجلة بلا مصدر، و«معلومات خطيرة» بلا دليل. الخوف يعطّل التفكير النقدي ويجعل المشاركة تبدو واجبًا." },
  { icon: Eye, title: "العناوين المضللة (Clickbait)", desc: "عنوان يعدك بصدمة دون أي تفاصيل، ليجبرك على النقر. المحتوى غالبًا أضعف بكثير من الوعد." },
  { icon: Users, title: "الإثبات الاجتماعي", desc: "«ملايين شاهدوا...» و«الجميع يتحدث عن...» — أرقام الانتشار ليست دليل صحة، فقد يكون الانتشار نفسه نتيجة الأسلوب الاستفزازي." },
  { icon: Timer, title: "الخوف من الفوات (FOMO)", desc: "«الآن فقط»، «قبل الحذف»، «الجميع يشاهد الآن» — إلحاح مصطنع يجعلك تشعر أن التوقف عن المتابعة يعني أن تفوتك الحقيقة." },
];

export default function InfluencePage() {
  const [picked, setPicked] = useState<PostKey | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "مركز الوعي", href: "/awareness" }, { label: "التأثير الرقمي" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>الوحدة 02 — التأثير الرقمي</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">هل تختار المحتوى... <span className="text-gradient">أم المحتوى يختار كيف يؤثر عليك؟</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          في اقتصاد الانتباه، انتباهك هو المنتج. المنصات وصنّاع المحتوى يتنافسون على ثوانٍ من تركيزك، والمحتوى العاطفي القوي هو أسرع طريق إليه. فهم الأساليب لا يعني أن كل محتوى عاطفي كاذب — بل أن تعرف متى تُستثار عاطفتك عمدًا قبل أن تقرر.
        </p>
      </div>

      <section className="mt-12">
        <SectionHead eyebrow="سيناريو تفاعلي" title="أي منشور ستتفاعل معه أكثر؟" desc="ثلاثة منشورات افتراضية، كل واحد يستخدم أسلوبًا مختلفًا لجذب انتباهك. اختر بصدق المنشور الذي تتوقع أن يوقف تمريرك — ثم اقرأ كيف يعمل كل أسلوب." />
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {posts.map((p) => {
            const selected = picked === p.key;
            return (
              <button key={p.key} onClick={() => setPicked(p.key)} aria-pressed={selected}
                className={`text-start rounded-3xl border p-6 transition card-hover ${selected ? "border-primary bg-primary/10 shadow-[0_0_40px_rgba(59,130,246,.25)]" : "glass"}`}>
                <span className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-cyanx"><p.icon className="size-5" /></span>
                  <span className="rounded-full bg-ink2 border border-line px-3 py-1 text-[11px] font-bold text-muted">{p.tag}</span>
                </span>
                <span className="mt-4 block text-lg font-extrabold leading-8">{p.title}</span>
                <span className="mt-2 block text-sm text-muted leading-7">{p.body}</span>
                <span className="mt-3 block text-xs text-muted">{p.meta}</span>
                <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${selected ? "text-cyanx" : "text-muted"}`}>
                  {selected ? <><CheckCircle2 className="size-4" /> اخترت هذا المنشور</> : "اضغط لاختيار هذا المنشور"}
                </span>
              </button>
            );
          })}
        </div>

        {picked ? (
          <div className="mt-6 rounded-3xl border border-primary/50 bg-surface p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="size-6 shrink-0 text-cyanx" />
              <div>
                <h3 className="text-xl font-extrabold">اخترت: {explanations[picked].title}</h3>
                <ul className="mt-3 grid gap-2.5">
                  {explanations[picked].points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-muted leading-8"><CheckCircle2 className="size-5 shrink-0 mt-1 text-cyanx" /> <span>{pt}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <h4 className="font-extrabold">وماذا عن الأسلوبين الآخرين؟</h4>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                {(Object.keys(explanations) as PostKey[]).filter((k) => k !== picked).map((k) => (
                  <div key={k} className="rounded-2xl bg-ink2 border border-line p-4">
                    <p className="font-bold">{explanations[k].title}</p>
                    <p className="mt-1.5 text-sm text-muted leading-7">{explanations[k].points[0]}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm text-muted leading-7 rounded-2xl bg-ink2 border border-line p-4">
              ملاحظة مهمة: اختيارك هنا لا يصنّفك نفسيًا ولا يكشف شخصيتك. هذه تجربة تعليمية عن أساليب المحتوى، وليست اختبارًا نفسيًا؛ أي شخص قد يتوقف عند أي منشور حسب مزاجه ولحظته، وهذا طبيعي تمامًا.
            </p>
            <button onClick={() => setPicked(null)} className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-ink2 px-5 py-2.5 text-sm font-bold hover:border-primary/60 transition">
              <RotateCcw className="size-4" /> جرّب اختيارًا آخر
            </button>
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted leading-7">اختر منشورًا واحدًا لترى شرح الأساليب الثلاثة. لا توجد إجابة «صحيحة» أو «خاطئة» — الهدف أن تلاحظ الأسلوب، لا أن تُقيَّم.</p>
        )}
      </section>

      <section className="mt-16">
        <SectionHead eyebrow="الأساليب الستة" title="كيف يجذب المحتوى انتباهك؟" desc="كل أسلوب يعمل على زرّ مختلف في انتباهك. معرفتها لا تجعلك محصّنًا تمامًا، لكنها تمنحك لحظة توقف قبل التفاعل." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techniques.map((t) => (
            <article key={t.title} className="glass card-hover rounded-3xl p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-cyanx"><t.icon className="size-6" /></span>
              <h3 className="mt-4 text-lg font-extrabold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted leading-7">{t.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold">اقتصاد الانتباه باختصار</h2>
        <p className="mt-3 text-muted leading-8">
          في المنصات المجانية، وقتك وانتباهك هما ما يُباع للمعلنين. لذلك صُممت الواجهات لتجذبك: التمرير اللانهائي، الإشعارات الحمراء، التشغيل التلقائي، و«اسحب للتحديث» — كلها آليات تقلل لحظة التوقف والتفكير. السيطرة تبدأ صغيرة: أوقف الإشعارات غير الضرورية، ألغِ التشغيل التلقائي، وحدد وقتًا محددًا للتصفح بدل فتح التطبيق كلما شعرت بالملل.
        </p>
        <p className="mt-3 text-muted leading-8">
          قاعدة عملية: إذا شعرت بغضب أو خوف أو فضول شديد قبل قراءة أي تفاصيل، توقف لحظة. اسأل: ما المعلومة هنا؟ وما مصدرها؟ وهل العنوان يصف المحتوى فعلًا؟ ثم قرر: تنقر، أم تتخطى، أم تبحث بنفسك.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/verify" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition">الوحدة التالية: الحقيقة والتضليل <ArrowLeft className="size-4" /></Link>
          <Link href="/library/rage-bait-clickbait" className="inline-flex items-center gap-2 rounded-full border border-line bg-ink2 px-6 py-3.5 font-bold hover:border-primary/60 transition">اقرأ: الغضب والفضول كطُعم</Link>
        </div>
      </section>
    </div>
  );
}
