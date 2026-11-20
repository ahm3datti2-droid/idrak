import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, AlertTriangle, ShieldCheck, Link2, CheckCircle2, Share2 } from "lucide-react";
import { articles } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Shared";
import ShareButton from "@/components/library/ShareButton";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "مقال غير موجود" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, type: "article" },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = article.related
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "المكتبة", href: "/library" }, { label: article.title }]} />
      <div className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold text-cyanx"><BookOpen className="size-3.5" /> {article.category}</span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-snug">{article.title}</h1>
        <p className="mt-3 text-lg text-muted leading-9">{article.summary}</p>
        <p className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5"><Clock className="size-4" /> قراءة {article.minutes} دقائق</span>
          <span>نُشر في {article.date}</span>
        </p>
      </div>

      <div className="mt-8 grid gap-5 text-[1.05rem] leading-9 text-paper/90">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="mt-10 rounded-3xl border border-amber-400/40 bg-amber-400/5 p-6 sm:p-7">
        <h2 className="flex items-center gap-2 text-xl font-extrabold"><AlertTriangle className="size-5 text-amber-300" /> انتبه لـ</h2>
        <ul className="mt-4 grid gap-2.5">
          {article.watch.map((w) => (
            <li key={w} className="flex gap-2 leading-8 text-muted"><AlertTriangle className="size-5 shrink-0 mt-1.5 text-amber-300" /><span>{w}</span></li>
          ))}
        </ul>
      </section>

      <section className="mt-5 rounded-3xl border border-line bg-surface p-6 sm:p-7">
        <h2 className="flex items-center gap-2 text-xl font-extrabold"><ShieldCheck className="size-5 text-cyanx" /> كيف تحمي نفسك؟</h2>
        <ul className="mt-4 grid gap-2.5">
          {article.protect.map((p) => (
            <li key={p} className="flex gap-2 leading-8 text-muted"><CheckCircle2 className="size-5 shrink-0 mt-1.5 text-cyanx" /><span>{p}</span></li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-extrabold"><Link2 className="size-5 text-cyanx" /> المصادر</h2>
        <ul className="mt-3 grid gap-2">
          {article.sources.map((s) => (
            <li key={s} className="text-sm text-muted leading-7">• {s}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted leading-6">نذكر المصادر العامة التي بُني عليها الشرح؛ ولا ننسب أي ادعاء محدد لمصدر لم يتحقق منه فعليًا.</p>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-3xl border border-line bg-surface p-5">
        <Share2 className="size-5 text-cyanx" />
        <p className="flex-1 text-sm font-bold">وجدت المقال مفيدًا؟ شاركه مع من يهمك أمره.</p>
        <ShareButton />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold">مواضيع ذات صلة</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/library/${r.slug}`} className="glass card-hover rounded-3xl p-5 flex flex-col gap-2">
                <span className="text-xs font-bold text-cyanx">{r.category}</span>
                <span className="font-extrabold leading-8">{r.title}</span>
                <span className="text-xs text-muted">قراءة {r.minutes} دقائق</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link href="/library" className="mt-10 inline-flex items-center gap-2 font-bold text-cyanx hover:underline">عودة إلى المكتبة <ArrowLeft className="size-4" /></Link>
    </article>
  );
}
