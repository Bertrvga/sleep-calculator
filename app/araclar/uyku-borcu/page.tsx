import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Moon } from "lucide-react";
import SleepDebtCalculator from "@/components/SleepDebtCalculator";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Uyku Borcu Hesaplayıcı — Eksik Uykunuzu Hesaplayın | Uykusaati";
const DESCRIPTION =
  "Son 7 günlük uykunuza göre haftalık uyku borcunuzu hesaplayın, risk seviyenizi öğrenin ve borcu vücudunuzu yormadan kaç günde kapatabileceğinizi görün.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/araclar/uyku-borcu" },
  keywords: [
    "uyku borcu",
    "uyku borcu hesaplama",
    "eksik uyku",
    "uyku eksikliği",
    "uyku telafisi",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "tr_TR",
    url: "/araclar/uyku-borcu",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS: Faq[] = [
  {
    question: "Uyku borcu nedir?",
    answer:
      "Uyku borcu, vücudunuzun ihtiyaç duyduğu uyku süresi ile gerçekte uyuduğunuz süre arasındaki farkın birikmesidir. Örneğin her gece 8 saate ihtiyacınız varken 6 saat uyursanız, bir haftada 14 saatlik uyku borcu oluşur. Bu borç; yorgunluk, dikkat eksikliği ve ruh hali dalgalanmalarına yol açabilir.",
  },
  {
    question: "Uyku borcu hafta sonu uyuyarak kapatılabilir mi?",
    answer:
      "Hafta sonu uzun uyumak borcun bir kısmını hafifletse de tamamen kapatmaz ve biyolojik saatinizi kaydırarak pazartesi sabahlarını zorlaştırabilir. Borcu birkaç güne yayarak her gece 30–60 dakika erken yatmak çok daha sağlıklı ve sürdürülebilir bir yöntemdir.",
  },
  {
    question: "Ne kadar uyku borcu tehlikelidir?",
    answer:
      "Haftalık 5 saatin altındaki borç genellikle hafif kabul edilir. 5–10 saat arası borç konsantrasyon ve reaksiyon süresini belirgin şekilde etkiler. 10 saati aşan ve haftalarca süren borç ise kronik uyku eksikliğine işaret eder; bağışıklık, kalp-damar ve metabolik sağlık üzerinde olumsuz etkileri olabilir.",
  },
];

export default function SleepDebtPage() {
  return (
    <>
      <SleepDebtCalculator />

      <FaqSection
        faqs={FAQS}
        subtitle="Uyku borcu ve telafisi hakkında merak edilenler."
      />

      <section className="pb-12">
        <Link
          href="/"
          className="glass-card bg-card-gradient group flex items-center justify-between gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          <div className="flex items-center gap-4">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-moon-600/20 ring-1 ring-moon-500/40">
              <Moon className="h-5 w-5 text-moon-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Uyku Hesaplayıcı</div>
              <p className="text-sm text-slate-400">
                Borcunu kapatmak için ideal yatma saatini hesapla.
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
        </Link>
      </section>
    </>
  );
}
