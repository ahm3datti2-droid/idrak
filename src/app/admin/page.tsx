"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, Plus, Pencil, Trash2, Star, BarChart3, FileText, Trophy, ShieldCheck, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { articles, challenges, categories } from "@/lib/data";
import { Eyebrow, Breadcrumbs } from "@/components/ui/Shared";

const DEMO_PASSWORD = "idrak-admin";
const LS = {
  overrides: "idrak-admin-overrides",
  drafts: "idrak-admin-drafts",
  featured: "idrak-admin-featured",
  disabledChallenges: "idrak-admin-disabled-challenges",
  unlocked: "idrak-admin-unlocked",
};

type Draft = { slug: string; title: string; summary: string; category: string; body: string[]; createdAt: string };
type Overrides = Record<string, boolean>; // slug -> published

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* مساحة التخزين ممتلئة */ }
}

const tabs = [
  { id: "overview", label: "نظرة عامة", icon: BarChart3 },
  { id: "articles", label: "المقالات", icon: FileText },
  { id: "challenges", label: "التحديات", icon: Trophy },
  { id: "draft", label: "مسودة جديدة", icon: Plus },
  { id: "featured", label: "المحتوى المميز", icon: Star },
] as const;
type Tab = (typeof tabs)[number]["id"];

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [mounted, setMounted] = useState(false);

  const [overrides, setOverrides] = useState<Overrides>({});
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [featured, setFeatured] = useState("");
  const [disabledChallenges, setDisabledChallenges] = useState<string[]>([]);
  const [completions, setCompletions] = useState(0);

  const [form, setForm] = useState({ slug: "", title: "", summary: "", category: categories[0], body: "" });
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setMounted(true);
    setOverrides(load<Overrides>(LS.overrides, {}));
    setDrafts(load<Draft[]>(LS.drafts, []));
    setFeatured(localStorage.getItem(LS.featured) ?? "");
    setDisabledChallenges(load<string[]>(LS.disabledChallenges, []));
    try {
      if (sessionStorage.getItem(LS.unlocked) === "1") setUnlocked(true);
      const done = load<string[]>("idrak-completed-challenges", []);
      setCompletions(Array.isArray(done) ? done.length : 0);
    } catch { /* ignore */ }
  }, []);

  const allArticles = useMemo(() => {
    const base = articles.map((a) => ({ slug: a.slug, title: a.title, summary: a.summary, category: a.category, minutes: a.minutes, isDraft: false }));
    const ds = drafts.map((d) => ({ slug: d.slug, title: d.title, summary: d.summary, category: d.category, minutes: Math.max(1, Math.round(d.body.join(" ").split(/\s+/).length / 180)), isDraft: true }));
    return [...base, ...ds];
  }, [drafts]);

  const isPublished = (slug: string, isDraft: boolean) => {
    if (slug in overrides) return overrides[slug];
    return !isDraft;
  };

  const togglePublish = (slug: string) => {
    const next = { ...overrides, [slug]: !isPublished(slug, drafts.some((d) => d.slug === slug)) };
    setOverrides(next); save(LS.overrides, next);
  };

  const deleteDraft = (slug: string) => {
    const next = drafts.filter((d) => d.slug !== slug);
    setDrafts(next); save(LS.drafts, next);
    setNotice("تم حذف المسودة.");
  };

  const startEdit = (d: Draft) => {
    setForm({ slug: d.slug, title: d.title, summary: d.summary, category: d.category, body: d.body.join("\n\n") });
    setEditingSlug(d.slug);
    setTab("draft");
  };

  const saveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = editingSlug ?? (form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `draft-${Date.now()}`);
    const body = form.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (!form.title.trim() || !form.summary.trim() || body.length === 0) {
      setNotice("من فضلك أكمل العنوان والملخص وفقرة واحدة على الأقل.");
      return;
    }
    const draft: Draft = { slug, title: form.title.trim(), summary: form.summary.trim(), category: form.category, body, createdAt: new Date().toISOString().slice(0, 10) };
    const next = editingSlug ? drafts.map((d) => (d.slug === editingSlug ? draft : d)) : [...drafts, draft];
    setDrafts(next); save(LS.drafts, next);
    setNotice(editingSlug ? "تم حفظ تعديلات المسودة." : "تم حفظ المسودة الجديدة (مسودة — غير منشورة).");
    setForm({ slug: "", title: "", summary: "", category: categories[0], body: "" });
    setEditingSlug(null);
    setTab("articles");
  };

  const publishedCount = allArticles.filter((a) => isPublished(a.slug, a.isDraft)).length;
  const totalXp = challenges.filter((c) => !disabledChallenges.includes(c.id)).reduce((s, c) => s + c.xp, 0);

  if (!mounted) return <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 text-muted">جارٍ تحميل لوحة الإدارة...</div>;

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: "لوحة الإدارة" }]} />
        <div className="mt-8 rounded-3xl border border-line bg-surface p-7 sm:p-9 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/15 text-cyanx"><Lock className="size-7" /></span>
          <h1 className="mt-4 text-2xl font-extrabold">لوحة إدارة إدراك</h1>
          <p className="mt-2 text-sm text-muted leading-7">
            نظام إدارة محتوى تجريبي محلي (Local Demo CMS): كل التغييرات تُحفظ في متصفحك فقط (localStorage)، ولا يوجد خادم أو قاعدة بيانات بعد.
          </p>
          <div className="mt-5 rounded-2xl border border-amber-400/40 bg-amber-400/5 p-4 text-sm leading-7">
            <p className="font-bold flex items-center justify-center gap-2"><AlertTriangle className="size-4 text-amber-300" /> كلمة مرور العرض التجريبي</p>
            <p className="mt-1 font-mono text-lg font-bold text-amber-200" dir="ltr">{DEMO_PASSWORD}</p>
            <p className="text-xs text-muted">هذه ليست كلمة مرور حقيقية ولا تحمي أي بيانات — للتجربة المحلية فقط.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (password === DEMO_PASSWORD) { setUnlocked(true); try { sessionStorage.setItem(LS.unlocked, "1"); } catch { /* ignore */ } } else setPwError("كلمة المرور غير صحيحة — جرّب كلمة مرور العرض التجريبي أعلاه."); }} className="mt-6 grid gap-3">
            <label className="relative text-start">
              <span className="text-sm font-bold">كلمة المرور</span>
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr"
                className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary pe-12" placeholder="idrak-admin" />
              <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                className="absolute end-3 bottom-3 text-muted hover:text-white">{showPw ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button>
            </label>
            {pwError && <p className="text-sm text-amber-300">{pwError}</p>}
            <button type="submit" className="rounded-full bg-primary py-3.5 font-bold text-white hover:bg-blue-500 transition">دخول لوحة الإدارة</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "لوحة الإدارة" }]} />
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Eyebrow>لوحة إدارة — عرض تجريبي محلي</Eyebrow>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold">إدارة محتوى إدراك</h1>
          <p className="mt-2 text-sm text-muted leading-7">كل التغييرات هنا تُحفظ في متصفحك فقط (localStorage) — لا خادم ولا قاعدة بيانات بعد. المسودات لا تظهر للزوار حتى تُنشر.</p>
        </div>
        <button onClick={() => { setUnlocked(false); try { sessionStorage.removeItem(LS.unlocked); } catch { /* ignore */ } }}
          className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold hover:border-primary/60 transition">تسجيل الخروج</button>
      </div>

      {notice && (
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-cyanx/40 bg-cyanx/10 px-4 py-3 text-sm font-bold">
          <span className="flex items-center gap-2"><CheckCircle2 className="size-5 text-cyanx" />{notice}</span>
          <button onClick={() => setNotice("")} aria-label="إغلاق التنبيه"><X className="size-4" /></button>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="أقسام لوحة الإدارة">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${tab === t.id ? "bg-primary text-white border-primary" : "border-line bg-surface text-muted hover:text-white"}`}>
            <t.icon className="size-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "إجمالي المقالات", value: allArticles.length, note: `${publishedCount} منشورة • ${allArticles.length - publishedCount} مسودة/مخفية` },
            { label: "التحديات المفعّلة", value: challenges.length - disabledChallenges.length, note: `من أصل ${challenges.length} تحديًا` },
            { label: "إجمالي نقاط XP المتاحة", value: totalXp, note: "مجموع نقاط التحديات المفعّلة" },
            { label: "تحديات مكتملة (محليًا)", value: completions, note: "من سجل إكمال التحديات على هذا الجهاز" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-3xl font-extrabold text-cyanx">{s.value}</p>
              <p className="mt-1 font-bold">{s.label}</p>
              <p className="mt-1 text-xs text-muted leading-6">{s.note}</p>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-4 rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-extrabold flex items-center gap-2"><ShieldCheck className="size-5 text-cyanx" /> ملاحظات الإدارة</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted leading-7">
              <li>• المقالات المنشورة في المكتبة تأتي من ملف بيانات المنصة؛ التبديل هنا يخزّن تجاوزًا محليًا فقط ولا يغيّر الملف الأصلي.</li>
              <li>• المسودات التي تنشئها هنا محلية بالكامل — لنشرها فعليًا للزوار تحتاج إضافتها إلى ملف بيانات المنصة ثم إعادة النشر.</li>
              <li>• قبل ربط قاعدة بيانات حقيقية (مثل Supabase) يلزم نظام مصادقة آمن؛ كلمة المرور الحالية للعرض فقط ولا تحمي أي بيانات.</li>
            </ul>
          </div>
        </div>
      )}

      {tab === "articles" && (
        <div className="mt-6 grid gap-3">
          {allArticles.map((a) => {
            const pub = isPublished(a.slug, a.isDraft);
            return (
              <div key={a.slug} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-line bg-surface p-5">
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold leading-7 truncate">{a.title}</p>
                  <p className="mt-1 text-xs text-muted">{a.category} • قراءة {a.minutes} دقائق {a.isDraft && "• مسودة محلية"}</p>
                  <p className="mt-1 text-sm text-muted leading-6 line-clamp-2">{a.summary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${pub ? "bg-cyanx/15 text-cyanx" : "bg-amber-400/15 text-amber-300"}`}>{pub ? "منشور" : "مسودة"}</span>
                  <button onClick={() => togglePublish(a.slug)} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 transition">
                    {pub ? "إلغاء النشر" : "نشر"}
                  </button>
                  {a.isDraft && (
                    <>
                      <button onClick={() => { const d = drafts.find((x) => x.slug === a.slug); if (d) startEdit(d); }} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink2 px-4 py-2 text-sm font-bold hover:border-primary/60 transition"><Pencil className="size-4" /> تعديل</button>
                      <button onClick={() => deleteDraft(a.slug)} className="inline-flex items-center gap-1.5 rounded-full border border-red-400/40 bg-red-400/10 px-4 py-2 text-sm font-bold text-red-300 hover:bg-red-400/20 transition"><Trash2 className="size-4" /> حذف</button>
                    </>
                  )}
                  {!a.isDraft && <Link href={`/library/${a.slug}`} className="rounded-full border border-line bg-ink2 px-4 py-2 text-sm font-bold hover:border-primary/60 transition">عرض</Link>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "challenges" && (
        <div className="mt-6 grid gap-3">
          {challenges.map((c) => {
            const disabled = disabledChallenges.includes(c.id);
            return (
              <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-3xl border border-line bg-surface p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-cyanx"><Trophy className="size-5" /></span>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold leading-7">{c.title}</p>
                  <p className="mt-1 text-sm text-muted leading-6">{c.desc}</p>
                  <p className="mt-1 text-xs text-muted">{c.category} • {c.xp} نقطة XP</p>
                </div>
                <button onClick={() => {
                  const next = disabled ? disabledChallenges.filter((x) => x !== c.id) : [...disabledChallenges, c.id];
                  setDisabledChallenges(next); save(LS.disabledChallenges, next);
                }} className={`rounded-full px-4 py-2 text-sm font-bold transition ${disabled ? "bg-amber-400 text-ink" : "bg-primary text-white hover:bg-blue-500"}`}>
                  {disabled ? "معطّل — تفعيل" : "مفعّل — تعطيل"}
                </button>
              </div>
            );
          })}
          <p className="text-xs text-muted leading-6">إنشاء تحديات جديدة بالكامل يحتاج قاعدة بيانات؛ حاليًا يمكنك تفعيل/تعطيل التحديات الموجودة، وإضافة تحديات جديدة كمسودات مقالات من تبويب «مسودة جديدة».</p>
        </div>
      )}

      {tab === "draft" && (
        <form onSubmit={saveDraft} className="mt-6 max-w-3xl rounded-3xl border border-line bg-surface p-6 sm:p-8 grid gap-5">
          <h2 className="text-xl font-extrabold">{editingSlug ? "تعديل مسودة" : "إنشاء مسودة مقال جديدة"}</h2>
          <div>
            <label htmlFor="d-title" className="text-sm font-bold">العنوان</label>
            <input id="d-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="عنوان المقال"
              className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary placeholder:text-muted" />
          </div>
          <div>
            <label htmlFor="d-summary" className="text-sm font-bold">الملخص</label>
            <input id="d-summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="ملخص من جملة أو جملتين"
              className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary placeholder:text-muted" />
          </div>
          <div>
            <label htmlFor="d-cat" className="text-sm font-bold">التصنيف</label>
            <select id="d-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="d-body" className="text-sm font-bold">المحتوى — فقرة في كل سطرين (افصل الفقرات بسطر فارغ)</label>
            <textarea id="d-body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={8}
              placeholder="اكتب الفقرة الأولى هنا...&#10;&#10;ثم الفقرة الثانية هنا..."
              className="mt-2 w-full rounded-2xl border border-line bg-ink2 px-4 py-3 text-sm outline-none focus:border-primary placeholder:text-muted resize-y leading-7" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-blue-500 transition">{editingSlug ? "حفظ التعديلات" : "حفظ المسودة"}</button>
            {editingSlug && <button type="button" onClick={() => { setEditingSlug(null); setForm({ slug: "", title: "", summary: "", category: categories[0], body: "" }); }} className="rounded-full border border-line bg-ink2 px-6 py-3 font-bold">إلغاء التعديل</button>}
          </div>
          <p className="text-xs text-muted leading-6">تُحفظ المسودة في متصفحك فقط، وتظهر في تبويب «المقالات» بحالة «مسودة» حتى تنشرها من هناك.</p>
        </form>
      )}

      {tab === "featured" && (
        <div className="mt-6 max-w-3xl rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-extrabold flex items-center gap-2"><Star className="size-5 text-cyanx" /> اختر المقال المميز في الرئيسية</h2>
          <p className="mt-2 text-sm text-muted leading-7">اختيارك يُحفظ في متصفحك فقط (localStorage) كإعداد محلي تجريبي؛ عرضه في الرئيسية يتطلب ربطه بمكوّن الرئيسية.</p>
          <div className="mt-5 grid gap-2">
            {allArticles.filter((a) => isPublished(a.slug, a.isDraft)).map((a) => (
              <button key={a.slug} onClick={() => { setFeatured(a.slug); localStorage.setItem(LS.featured, a.slug); setNotice(`تم اختيار «${a.title}» كمقال مميز.`); }}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-start transition ${featured === a.slug ? "border-primary bg-primary/10" : "border-line bg-ink2 hover:border-primary/50"}`}>
                <span className="min-w-0"><span className="block truncate font-bold">{a.title}</span><span className="block text-xs text-muted">{a.category}</span></span>
                {featured === a.slug ? <Star className="size-5 shrink-0 text-cyanx fill-current" /> : <Star className="size-5 shrink-0 text-muted" />}
              </button>
            ))}
          </div>
          {featured && (
            <button onClick={() => { setFeatured(""); localStorage.removeItem(LS.featured); }} className="mt-4 rounded-full border border-line bg-ink2 px-5 py-2.5 text-sm font-bold">إلغاء الاختيار</button>
          )}
        </div>
      )}
    </div>
  );
}
