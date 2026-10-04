import type { Metadata } from "next";
import AgeSleepCalculator from "@/components/AgeSleepCalculator";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { SITE_NAME } from "@/lib/site";

const TITLE =
  "Yaşa Göre Uyku İhtiyacı Hesaplama — Kaç Saat Uyumalısınız? | Uykusaati";
const DESCRIPTION =
  "Yenidoğandan 65 yaş üstüne kadar her yaş grubu için AASM ve National Sleep Foundation önerilerine göre ideal uyku süresini, gündüz uykusu ihtiyacını ve uzman ipuçlarını öğrenin.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/araclar/yasa-gore-uyku" },
  keywords: [
    "yaşa göre uyku ihtiyacı",
    "kaç saat uyumalıyım",
    "bebek uyku süresi",
    "çocuk uyku süresi",
    "yetişkin uyku süresi",
    "ideal uyku süresi",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "tr_TR",
    url: "/araclar/yasa-gore-uyku",
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
    question: "Yetişkinler günde kaç saat uyumalı?",
    answer:
      "Amerikan Uyku Tıbbı Akademisi (AASM) ve National Sleep Foundation, 18–64 yaş arası yetişkinler için gecede 7–9 saat uyku önermektedir. 65 yaş üstü bireyler için önerilen süre 7–8 saattir. Düzenli olarak 7 saatin altında uyumak birçok sağlık riskiyle ilişkilidir.",
  },
  {
    question: "Bebekler ve çocuklar ne kadar uyumalı?",
    answer:
      "Yenidoğanlar (0–3 ay) günde 14–17 saat, bebekler (4–11 ay) 12–15 saat, 1–2 yaş arası çocuklar 11–14 saat, 3–5 yaş arası çocuklar 10–13 saat ve 6–13 yaş arası okul çağındaki çocuklar 9–11 saat uyumalıdır. 5 yaşa kadar bu sürelere gündüz uykuları da dahildir.",
  },
  {
    question: "Yaş ilerledikçe uyku ihtiyacı azalır mı?",
    answer:
      "Uyku ihtiyacı çocukluk ve ergenlik boyunca azalır, ancak yetişkinlikten sonra belirgin şekilde değişmez. Yaşlılarda değişen asıl şey uykunun yapısıdır: derin uyku oranı azalır, uyku daha hafif ve bölünmüş hale gelir. Bu nedenle yaşlılar da 7–8 saat uykuya ihtiyaç duyar.",
  },
  {
    question: "Gençler neden geç uyuyup geç uyanmak ister?",
    answer:
      "Ergenlik döneminde uyku hormonu melatoninin salgılanması biyolojik olarak 1–2 saat gecikir. Bu nedenle gençler doğal olarak gece daha geç uykulu olur ve sabah erken kalkmakta zorlanır. 14–17 yaş arası gençlerin 8–10 saat uyuması önerilir; akşam ekran ışığını azaltmak bu kaymayı dengelemeye yardımcı olur.",
  },
];

export default function AgeSleepPage() {
  return (
    <>
      <AgeSleepCalculator />

      <FaqSection
        faqs={FAQS}
        subtitle="Yaşa göre uyku ihtiyacı hakkında merak edilenler."
      />
    </>
  );
}
