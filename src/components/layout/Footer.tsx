import Link from "next/link";
import { Brain } from "lucide-react";
export default function Footer(){
  return (
    <footer className="border-t border-line bg-ink2/60 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5"><span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyanx text-white"><Brain className="size-5"/></span><span className="text-xl font-extrabold">إدراك <span className="text-xs tracking-[0.3em] text-cyanx">IDRAK</span></span></div>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">وعي. فهم. تحكم. منصة توعوية مستقلة تساعدك تفهم كيف تعمل المنصات الرقمية، وكيف تتشكل اهتماماتك، وكيف تحمي وعيك وبياناتك — من غير نظريات مؤامرة، ومن غير توجيه سياسي أو فكري.</p>
          <p className="mt-3 text-xs text-muted/70">كل التقييمات والمحاكاة هنا تعليمية، وتعمل على جهازك — لا نحفظ إجاباتك ولا نطلب كلمات مرورك.</p>
        </div>
        <div>
          <h3 className="font-bold mb-3">الأقسام</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link className="hover:text-white" href="/awareness">الوعي الرقمي</Link></li>
            <li><Link className="hover:text-white" href="/algorithms">افهم الخوارزمية</Link></li>
            <li><Link className="hover:text-white" href="/verify">الحقيقة والتضليل</Link></li>
            <li><Link className="hover:text-white" href="/privacy">بياناتك الرقمية</Link></li>
            <li><Link className="hover:text-white" href="/library">مكتبة الوعي</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">أدوات تفاعلية</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link className="hover:text-white" href="/digital-mirror">مرآتك الرقمية</Link></li>
            <li><Link className="hover:text-white" href="/algorithm-lab">مختبر الخوارزمية</Link></li>
            <li><Link className="hover:text-white" href="/challenges">تحديات الوعي اليومية</Link></li>
            <li><Link className="hover:text-white" href="/about">عن إدراك</Link></li>
            <li><Link className="hover:text-white" href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">© 2026 إدراك IDRAK — محتوى توعوي مبني على مصادر موثقة. تحقّق دائمًا من المصدر الأصلي قبل مشاركة أي خبر.</div>
    </footer>
  );
}
