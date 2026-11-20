"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FlaskConical, ScanFace, Trophy } from "lucide-react";
const items = [
  { href: "/", label: "الرئيسية", Icon: Home },
  { href: "/library", label: "المكتبة", Icon: BookOpen },
  { href: "/algorithm-lab", label: "المختبر", Icon: FlaskConical },
  { href: "/digital-mirror", label: "مرآتك", Icon: ScanFace },
  { href: "/challenges", label: "التحديات", Icon: Trophy },
];
export default function BottomNav(){
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden glass border-t border-line" aria-label="التنقل السفلي">
      <div className="grid grid-cols-5">
        {items.map(({href,label,Icon})=>(
          <Link key={href} href={href} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${pathname===href?"text-cyanx":"text-muted"}`}>
            <Icon className="size-5" />{label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
