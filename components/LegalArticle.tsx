import type { ReactNode } from "react";

export default function LegalArticle({ children }: { children: ReactNode }) {
  return (
    <article
      className="mx-auto max-w-3xl py-10
        [&_h1]:mt-6 [&_h1]:bg-gradient-to-b [&_h1]:from-white [&_h1]:to-slate-400 [&_h1]:bg-clip-text [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-transparent
        [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white
        [&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-slate-300
        [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-slate-300
        [&_a]:text-moon-400 [&_a:hover]:underline
        [&_strong]:text-white"
    >
      {children}
    </article>
  );
}
