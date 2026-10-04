import Link from "next/link";
import { Moon, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-white">
              <Moon className="h-5 w-5 text-moon-400" />
              <span className="text-lg font-semibold">Uyku Hesaplayıcı</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Uyku döngülerinize göre en ideal yatma ve uyanma saatlerini
              saniyeler içinde hesaplayın. Daha dinç ve enerjik bir güne
              başlayın.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Araçlar
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  Uyku Hesaplayıcı
                </Link>
              </li>
              <li>
                <Link
                  href="/araclar/uyku-borcu"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  Uyku Borcu Hesaplayıcı
                </Link>
              </li>
              <li>
                <Link
                  href="/araclar/yasa-gore-uyku"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  Yaşa Göre Uyku İhtiyacı
                </Link>
              </li>
              <li>
                <Link
                  href="/araclar/power-nap"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  Güç Uykusu (Power Nap)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Kurumsal
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition hover:text-moon-400"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Hakkında
            </h4>
            <p className="mt-3 text-sm text-slate-400">
              Bu araç, 90 dakikalık ortalama uyku döngüsü bilgisini kullanır.
              Sağlık tavsiyesi değildir; kişisel farklılıklar sonuçları
              etkileyebilir.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Uyku Hesaplayıcı. Tüm hakları saklıdır.
          </p>
          <p className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-moon-400" />
            Daha iyi uyku için tasarlandı.
          </p>
        </div>
      </div>
    </footer>
  );
}
