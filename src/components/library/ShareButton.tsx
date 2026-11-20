"use client";
import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition">
      {copied ? <><Check className="size-4" /> تم نسخ الرابط</> : <><Share2 className="size-4" /> نسخ رابط المقال</>}
      {!copied && <Copy className="size-3.5 opacity-70" />}
    </button>
  );
}
