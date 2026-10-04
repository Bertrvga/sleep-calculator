import type { Metadata } from "next";
import PowerNapCalculator from "@/components/PowerNapCalculator";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { SITE_NAME } from "@/lib/site";

const TITLE =
  "Güç Uykusu (Power Nap) Zamanlayıcı — Kaç Dakika Kestirmelisiniz? | Uykusaati";
const DESCRIPTION =
  "20 dakikalık güç uykusu, 26 dakikalık NASA uykusu veya 90 dakikalık tam döngü şekerlemesi için alarmınızı kaça kurmanız gerektiğini hesaplayın. Uyku sersemliği olmadan tazelenin.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/araclar/power-nap" },
  keywords: [
    "power nap",
    "güç uykusu",
    "şekerleme",
    "kestirme",
    "NASA uykusu",
    "kahve uykusu",
    "coffee nap",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "tr_TR",
    url: "/araclar/power-nap",
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
    question: "Güç uykusu (power nap) kaç dakika olmalı?",
    answer:
      "İdeal güç uykusu 10–20 dakika arasındadır. Bu süre boyunca yalnızca hafif uyku evrelerinde kalırsınız ve uyandığınızda sersemlik yaşamadan dikkat ve enerji artışı elde edersiniz. 30 dakikayı aşan şekerlemeler derin uykuya geçme ve uyku ataleti riskini artırır.",
  },
  {
    question: "Şekerleme yapmak için en iyi saat hangisidir?",
    answer:
      "Şekerleme için en uygun zaman, biyolojik saatimizdeki doğal enerji düşüşüne denk gelen öğleden sonra 13:00–16:00 arasıdır. Saat 16:00'dan sonra yapılan şekerlemeler gece uykuya dalmayı zorlaştırabilir ve gece uykusunun kalitesini düşürebilir.",
  },
  {
    question: "NASA uykusu (26 dakika) nedir?",
    answer:
      "NASA'nın uzun uçuşlardaki pilotlar üzerinde yaptığı araştırmada, 26 dakikalık bir kestirmenin performansı %34, uyanıklığı ise %54 oranında artırdığı görülmüştür. Bu nedenle 26 dakika, derin uykuya geçmeden en yüksek faydayı sağlayan şekerleme süresi olarak bilinir.",
  },
  {
    question: "Kahve uykusu (coffee nap) gerçekten işe yarar mı?",
    answer:
      "Evet. Kafeinin etkisini göstermesi yaklaşık 20 dakika sürer. Şekerlemeden hemen önce kahve içtiğinizde, uyku sırasında beyin yorgunluk yaratan adenozini temizler ve uyandığınız anda kafein devreye girer. Araştırmalar kahve uykusunun tek başına kahveden veya tek başına şekerlemeden daha fazla uyanıklık sağladığını göstermektedir.",
  },
];

export default function PowerNapPage() {
  return (
    <>
      <PowerNapCalculator />

      <FaqSection
        faqs={FAQS}
        subtitle="Güç uykusu ve şekerleme hakkında merak edilenler."
      />
    </>
  );
}
