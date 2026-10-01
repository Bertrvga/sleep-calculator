import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Clock } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "İletişim",
  description:
    "Uyku Hesaplayıcı ile iletişime geçin: geri bildirim, reklam ve iş birliği talepleri.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Ana sayfaya dön
      </Link>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
        <MessageSquare className="h-3.5 w-3.5 text-moon-400" />
        Bize ulaşın
      </div>

      <h1 className="mt-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
        İletişim
      </h1>
      <p className="mt-3 text-slate-400">
        Geri bildirimlerinizi, önerilerinizi veya iş birliği taleplerinizi
        aşağıdaki kanallardan iletebilirsiniz. Genellikle 1–3 iş günü içinde
        yanıt veriyoruz.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="glass-card p-5">
          <div className="mb-2 flex items-center gap-2 text-slate-200">
            <Mail className="h-5 w-5 text-moon-400" />
            <span className="font-semibold">E-posta</span>
          </div>
          <a
            href="mailto:iletisim@uykuhesaplayici.com"
            className="text-sm text-star-400 hover:underline"
          >
            iletisim@uykuhesaplayici.com
          </a>
          <p className="mt-2 text-xs text-slate-500">
            Genel sorular, hata bildirimleri ve öneriler için.
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="mb-2 flex items-center gap-2 text-slate-200">
            <Clock className="h-5 w-5 text-star-400" />
            <span className="font-semibold">Yanıt Süresi</span>
          </div>
          <p className="text-sm text-slate-300">1 – 3 iş günü</p>
          <p className="mt-2 text-xs text-slate-500">
            Hafta içi 09:00 – 18:00 saatleri arasında.
          </p>
        </div>
      </div>

      <form
        className="glass-card mt-8 space-y-4 p-6"
        action="mailto:iletisim@uykuhesaplayici.com"
        method="post"
        encType="text/plain"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              Ad Soyad
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-white/10 bg-night-800/70 px-3 py-2 text-sm text-white outline-none focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-300"
            >
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/10 bg-night-800/70 px-3 py-2 text-sm text-white outline-none focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="subject"
            className="mb-1 block text-sm font-medium text-slate-300"
          >
            Konu
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="w-full rounded-lg border border-white/10 bg-night-800/70 px-3 py-2 text-sm text-white outline-none focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-slate-300"
          >
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-lg border border-white/10 bg-night-800/70 px-3 py-2 text-sm text-white outline-none focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40"
          />
        </div>
        <button type="submit" className="cta-primary w-full sm:w-auto">
          <Mail className="h-4 w-4" />
          Gönder
        </button>
      </form>
    </article>
  );
}
