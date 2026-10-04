import { ChevronDown, HelpCircle } from "lucide-react";

export type Faq = { question: string; answer: string };

type FaqSectionProps = {
  faqs: Faq[];
  title?: string;
  subtitle?: string;
};

export default function FaqSection({
  faqs,
  title = "Sıkça Sorulan Sorular",
  subtitle,
}: FaqSectionProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="pb-12 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-8 text-center">
        <h2
          id="faq-title"
          className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-balance text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
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
  );
}
