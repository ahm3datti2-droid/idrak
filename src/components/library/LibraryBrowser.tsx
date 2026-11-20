"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, BookOpen, Clock } from "lucide-react";
import type { Article } from "@/lib/data";

export default function LibraryBrowser({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("الكل");

  const filtered = useMemo(() => {
    const query = q.trim();
    return articles.filter((a) => {
      const okCat = cat === "الكل" || a.category === cat;
      const okQ = !query || a.title.includes(query) || a.summary.includes(query) || a.category.includes(query);
      return okCat && okQ;
    });
  }, [articles, q, cat]);

  return (
    <div>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <label className="relative flex-1">
          <span className="sr-only">ابحث في المكتبة</span>
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 size-5 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="ابحث عن موضوع... مثال: الخوارزميات، الخصوصية، التزييف"
            className="w-full rounded-full border border-line bg-surface py-3.5 pe-4 ps-12 text-sm outline-none focus:border-primary placeholder:text-muted" />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="تصفية حسب التصنيف">
        {["الكل", ...categories].map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${cat === c ? "bg-primary text-white border-primary" : "border-line bg-surface text-muted hover:text-white hover:border-primary/50"}`}>
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted" role="status">
        {filtered.length === 0 ? "لا توجد نتائج مطابقة — جرّب كلمة أخرى أو تصنيفًا آخر." : `عرض ${filtered.length} من ${articles.length} مقالًا`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-surface/50 p-10 text-center">
          <BookOpen className="mx-auto size-10 text-muted" />
          <p className="mt-3 font-extrabold">لا توجد مقالات مطابقة</p>
          <p className="mt-1 text-sm text-muted">جرّب كلمة بحث مختلفة، أو أعد ضبط التصنيف إلى «الكل».</p>
          <button onClick={() => { setQ(""); setCat("الكل"); }} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">إعادة ضبط البحث</button>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <Link key={a.slug} href={`/library/${a.slug}`} className="glass card-hover rounded-3xl p-6 flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold text-cyanx"><BookOpen className="size-3.5" /> {a.category}</span>
              <h2 className="text-lg font-extrabold leading-8">{a.title}</h2>
              <p className="text-sm text-muted leading-7 flex-1">{a.summary}</p>
              <span className="flex items-center gap-1.5 text-xs text-muted"><Clock className="size-3.5" /> قراءة {a.minutes} دقائق • {a.date}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
