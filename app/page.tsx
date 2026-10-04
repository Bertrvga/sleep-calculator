import type { Metadata } from "next";
import { Brain } from "lucide-react";
import SleepCalculator from "@/components/SleepCalculator";
import SleepGuide from "@/components/SleepGuide";
import FaqSection, { type Faq } from "@/components/FaqSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const QUICK_BED_TIMES = ["22:00", "22:30", "23:00", "23:30", "00:00"];
const QUICK_WAKE_TIMES = ["06:00", "06:30", "07:00", "07:30", "08:00"];

const FAQS: Faq[] = [
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

export default function HomePage() {
  return (
    <>
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

      <FaqSection
        faqs={FAQS}
        subtitle="Uyku döngüleri ve hesaplayıcı hakkında merak edilenler."
      />
    </>
  );
}
