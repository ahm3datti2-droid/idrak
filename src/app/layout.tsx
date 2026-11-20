import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Cairo, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["300","400","500","600","700"], variable: "--font-arabic", display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400","600","700","800","900"], variable: "--font-cairo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://idrak-nine.vercel.app"),
  title: { default: "إدراك | IDRAK — وعي. فهم. تحكم.", template: "%s | إدراك IDRAK" },
  description: "افهم العالم الرقمي قبل أن يؤثر عليك. إدراك يساعدك تفهم الخوارزميات، تكتشف التضليل، تحمي خصوصيتك، وتستعيد السيطرة على تجربتك الرقمية.",
  keywords: ["إدراك","IDRAK","الوعي الرقمي","الخوارزميات","التضليل","الأخبار الكاذبة","الخصوصية الرقمية","Digital Awareness","Algorithm Awareness","Media Literacy"],
  openGraph: { type: "website", locale: "ar_EG", siteName: "إدراك IDRAK", title: "إدراك | وعي. فهم. تحكم.", description: "افهم العالم الرقمي قبل أن يؤثر عليك — الخوارزميات، التضليل، الخصوصية، وعاداتك الرقمية." },
  twitter: { card: "summary_large_image", title: "إدراك | وعي. فهم. تحكم.", description: "افهم العالم الرقمي قبل أن يؤثر عليك." },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#080D18", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${cairo.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink text-paper antialiased pb-20 md:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">تخطَّ إلى المحتوى</a>
        <Header />
        <main id="main" className="min-h-[70vh]">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
