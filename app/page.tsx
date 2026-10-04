import type { Metadata } from "next";
import { Brain, ChevronDown, HelpCircle } from "lucide-react";
import SleepCalculator from "@/components/SleepCalculator";
import SleepGuide from "@/components/SleepGuide";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const QUICK_BED_TIMES = ["22:00", "22:30", "23:00", "23:30", "00:00"];
const QUICK_WAKE_TIMES = ["06:00", "06:30", "07:00", "07:30", "08:00"];

const FAQS = [
  {
    question: "Uyku döngüsü nedir ve neden önemlidir?",
    answer:
      "Uyku döngüsü; hafif uyku (N1, N2), derin uyku (N3) ve REM aşamalarından oluşan, ortalama 90 dakika süren ve gece boyunca 4–6 kez tekrarlanan bir süreçtir. Derin uyku bedenin onarımını, REM ise hafıza ve öğrenmeyi destekler. Döngüleri tamamlayarak uyumak, hem fiziksel hem zihinsel toparlanmayı en üst düzeye çıkarır.",
  },
  {
    question: "İdeal uyku süresi kaç saattir?",
    answer:
      "Yetişkinler için önerilen uyku süresi gecede 7–9 saattir. Bu da yaklaşık 5–6 tam uyku döngüsüne denk gelir. Gençler ve çocuklar daha fazla uykuya ihtiyaç duyar; bireysel ihtiyaç kişiden kişiye biraz farklılık gösterebilir.",
  },
  {
    question: "Uykuya dalma süresi hesaplamaya nasıl dahil edilir?",
    answer:
      "Ortalama bir insan yatağa girdikten sonra yaklaşık 15 dakikada uykuya dalar. Hesaplayıcı, döngüleri yatağa girdiğiniz andan değil uykuya daldığınız andan itibaren sayar ve bu süreyi otomatik olarak ekler. Gelişmiş Ayarlar bölümünden uykuya dalma sürenizi 10, 15, 20 veya 30 dakika olarak özelleştirebilirsiniz.",
  },
  {
    question: "Neden alarm çalmadan hemen önce uyanmak daha iyidir?",
    answer:
      "Bir döngünün sonunda uyku en hafif hâlindedir ve beyin uyanmaya hazırdır. Bu anda kendiliğinden uyanmak, derin uykunun ortasında alarmla bölünmekten kaynaklanan uyku ataletini (sersemlik ve ağırlık hissi) önler. Alarmdan hemen önce uyanıyorsanız, biyolojik saatiniz uyku düzeninize iyi uyum sağlamış demektir.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SleepCalculator
        quickBedTimes={QUICK_BED_TIMES}
        quickWakeTimes={QUICK_WAKE_TIMES}
      />

      {/* Sleep cycle summary */}
      <section aria-labelledby="sleep-cycle-title" className="pb-12">
        <article className="glass-card bg-card-gradient p-6 transition hover:-translate-y-0.5 hover:shadow-glow">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-moon-600/20 ring-1 ring-moon-500/40">
              <Brain className="h-5 w-5 text-moon-400" />
            </div>
            <div>
              <h2
                id="sleep-cycle-title"
                className="mb-2 text-xl font-semibold text-white"
              >
                Uyku Döngüsü Nedir?
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Uyku döngüsü, beynin gece boyunca hafif uyku, derin uyku ve{" "}
                <strong className="text-white">REM</strong> aşamaları arasında
                geçiş yaptığı ve ortalama{" "}
                <strong className="text-white">90 dakika</strong> süren bir
                süreçtir. Bir gecede bu döngü 4–6 kez tekrarlanır; derin uyku
                bedeni onarırken REM evresi hafızayı ve öğrenmeyi güçlendirir.
                Bir döngünün sonunda uyanmak, uyku ataletini azaltarak daha dinç
                bir sabaha başlamanızı sağlar.
              </p>
            </div>
          </div>
        </article>
      </section>

      <SleepGuide />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="pb-12 sm:pb-16">
        <div className="mb-8 text-center">
          <h2
            id="faq-title"
            className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Sıkça Sorulan Sorular
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-slate-400">
            Uyku döngüleri ve hesaplayıcı hakkında merak edilenler.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition open:border-moon-500/40 open:bg-card-gradient"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-100 transition hover:text-white [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 shrink-0 text-moon-400" />
                  {faq.question}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-300">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
