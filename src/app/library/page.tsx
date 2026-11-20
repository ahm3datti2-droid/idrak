import type { Metadata } from "next";
import { articles, categories } from "@/lib/data";
import { Eyebrow, Breadcrumbs } from "@/components/ui/Shared";
import LibraryBrowser from "@/components/library/LibraryBrowser";

export const metadata: Metadata = {
  title: "مكتبة المعرفة",
  description: "مقالات مبسطة بالعربية عن الوعي الرقمي والخوارزميات والذكاء الاصطناعي والخصوصية والأخبار الكاذبة والتزييف العميق.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "المكتبة" }]} />
      <div className="mt-6 max-w-3xl">
        <Eyebrow>مكتبة المعرفة</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-snug">اقرأ لتفهم، <span className="text-gradient">لا لتخاف</span></h1>
        <p className="mt-4 text-lg text-muted leading-9">
          مقالات قصيرة بلغة مصرية بسيطة، كل مقال يشرح فكرة واحدة بوضوح، مع أمثلة واقعية، وقائمة «انتبه لـ» وقائمة «كيف تحمي نفسك»، ومصادر يمكنك الرجوع إليها.
        </p>
      </div>
      <LibraryBrowser articles={articles} categories={categories} />
    </div>
  );
}
