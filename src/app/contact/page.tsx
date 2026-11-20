"use client";
import { useState } from "react";
import { Send, CheckCircle2, Mail, MessageSquare, ChevronDown, AlertTriangle } from "lucide-react";
import { Eyebrow, Breadcrumbs } from "@/components/ui/Shared";

const topics = ["اقتراح محتوى", "تصحيح معلومة", "شراكة أو ورشة توعية", "مشكلة تقنية", "موضوع آخر"];

const faqs = [
  { q: "هل تقييمات إدراك تشخيص نفسي؟", a: "لا. المرآة الرقمية وقائمة الخصوصية وتقييم العادات كلها أدوات تعليمية مبنية على إجاباتك، تعطيك نقاط قوة وجوانب تحتاج انتباهًا وخطوات عملية. لا تصنّفك نفسيًا ولا تكشف شخصيتك، ولا تحل محل استشارة مختص." },
  { q: "هل تُحفظ إجاباتي أو بياناتي؟", a: "الأصل أن التقييمات تعمل محليًا على جهازك ولا تُرسل لأي خادم. لا نطلب كلمات مرور أو بيانات حسابات حقيقية أبدًا. نموذج التواصل في هذه الصفحة لا يُخزَّن على خادم بعد — وسيُوضح ذلك بوضوح حين يُفعَّل الإرسال." },
  { q: "هل محاكاة الخوارزمية حقيقية؟", a: "لا. مختبر الخوارزمية ومحاكاة الفيد محاكاة تعليمية مبسطة توضح المبدأ العام لأنظمة التوصية. تفاصيل خوارزميات المنصات الحقيقية غير معلنة وتتغير باستمرار." },
  { q: "هل يمكن استخدام إدراك في مدرسة أو جامعة؟", a: "نعم، هذا من أهداف المنصة. اختر موضوع «شراكة أو ورشة توعية» في النموذج وأخبرنا عن مؤسستك وعدد المشاركين والفئة العمرية، وسنرد عليك بما يمكننا تقديمه." },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "من فضلك اكتب اسمك (حرفان على الأقل).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "من فضلك اكتب بريدًا إلكترونيًا صحيحًا.";
    if (message.trim().length < 10) errs.message = "من فضلك اكتب رسالتك (10 أحرف على الأقل).";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "تواصل معنا" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>تواصل معنا</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">عندك سؤال أو اقتراح؟ <span className="text-gradient">نسمعك.</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          اقتراح محتوى، تصحيح معلومة، طلب ورشة توعية لمؤسستك، أو بلاغ عن مشكلة تقنية — كلها تصلنا بنفس الاهتمام.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-extrabold flex items-center gap-2"><Mail className="size-5 text-cyanx" /> قبل أن ترسل</h2>
          <p className="mt-3 text-sm text-muted leading-8">
            هذا النموذج عرض توضيحي حاليًا: رسالتك <strong className="text-paper">لا تُخزَّن على أي خادم بعد</strong>، ولن تصلنا فعليًا حتى يُفعَّل نظام الإرسال. حين يُفعَّل، سنوضح هنا عنوان البريد وطريقة الرد.
          </p>
          <p className="mt-3 text-sm text-muted leading-8">
            لا تكتب كلمات مرور أو بيانات حسابات أو معلومات حساسة في الرسالة أبدًا — لا نطلبها ولا نحتاجها.
          </p>
          <div className="mt-5 rounded-2xl bg-ink2 border border-line p-4 text-sm text-muted leading-7">
            <p className="font-bold text-paper">ماذا يحدث بعد الإرسال؟</p>
            <p className="mt-1">في النسخة الحالية: تظهر لك رسالة تأكيد على الشاشة فقط. في النسخة الكاملة: ستصلك نسخة من رسالتك على بريدك، ونرد خلال أيام عمل قليلة.</p>
          </div>
        </div>

        {sent ? (
          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10 text-center">
            <CheckCircle2 className="mx-auto size-14 text-cyanx" />
            <h2 className="mt-4 text-2xl font-extrabold">شكرًا لك، {name.trim()}!</h2>
            <p className="mt-3 text-muted leading-8">
              تم استلام رسالتك حول «{topic}» (عرض توضيحي — لم تُرسل إلى خادم بعد).
              حين يُفعَّل الإرسال الفعلي، سنرد على بريدك {email.trim()} خلال أيام عمل قليلة.
            </p>
            <button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); setTopic(topics[0]); }}
              className="mt-6 rounded-full border border-line bg-ink2 px-6 py-3 font-bold hover:border-primary/60 transition">إرسال رسالة أخرى</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-surface p-6 sm:p-8 grid gap-5">
            <div>
              <label htmlFor="c-name" className="text-sm font-bold">الاسم</label>
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك الكامل"
                className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary placeholder:text-muted" />
              {errors.name && <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300"><AlertTriangle className="size-3.5" />{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-email" className="text-sm font-bold">البريد الإلكتروني</label>
              <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" dir="ltr"
                className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary placeholder:text-muted" />
              {errors.email && <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300"><AlertTriangle className="size-3.5" />{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="c-topic" className="text-sm font-bold">الموضوع</label>
              <select id="c-topic" value={topic} onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary">
                {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm font-bold">رسالتك</label>
              <textarea id="c-msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="اكتب رسالتك هنا..."
                className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary placeholder:text-muted resize-y" />
              {errors.message && <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300"><AlertTriangle className="size-3.5" />{errors.message}</p>}
            </div>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-blue-500 transition">
              <Send className="size-4" /> إرسال الرسالة
            </button>
            <p className="text-xs text-muted leading-6 flex items-start gap-2"><MessageSquare className="size-4 shrink-0 mt-0.5" /> بالضغط على «إرسال» أنت توافق على أن بياناتك في هذا النموذج تُستخدم فقط للرد عليك، وأنها حاليًا لا تُخزَّن على خادم.</p>
          </form>
        )}
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold">الأسئلة الشائعة</h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl border border-line bg-surface overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start font-bold">
                {f.q}
                <ChevronDown className={`size-5 shrink-0 text-cyanx transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="px-5 pb-5 text-sm text-muted leading-8">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
