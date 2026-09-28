import { Brain, Repeat, Sunrise } from "lucide-react";

export default function SleepGuide() {
  return (
    <section
      aria-labelledby="sleep-guide-title"
      className="pb-12 sm:pb-16"
    >
      <div className="mb-8 text-center">
        <h2
          id="sleep-guide-title"
          className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
        >
          Uyku Rehberi
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-slate-400">
          Uyku döngülerini anlamak, daha dinç ve enerjik uyanmanın ilk adımıdır.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* REM */}
        <article className="glass-card bg-card-gradient p-6 transition hover:-translate-y-0.5 hover:shadow-glow">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-moon-600/20 ring-1 ring-moon-500/40">
            <Brain className="h-5 w-5 text-moon-400" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">
            Uyku Döngüsü (REM) Nedir?
          </h3>
          <div className="space-y-3 text-sm leading-relaxed text-slate-300">
            <p>
              Uyku tek parça bir dinlenme değil, gece boyunca tekrarlanan
              döngülerden oluşan bir süreçtir. Her döngü hafif uyku (N1, N2),
              derin uyku (N3) ve <strong className="text-white">REM</strong>{" "}
              (Rapid Eye Movement — Hızlı Göz Hareketi) aşamalarını içerir.
            </p>
            <p>
              Derin uyku bedenin onarıldığı, bağışıklığın güçlendiği evredir.
              REM ise beynin en aktif olduğu, rüyaların görüldüğü ve öğrenilen
              bilgilerin hafızaya yerleştiği aşamadır. Gecenin ilerleyen
              saatlerinde REM süreleri uzar.
            </p>
          </div>
        </article>

        {/* 90 minutes */}
        <article className="glass-card bg-card-gradient p-6 transition hover:-translate-y-0.5 hover:shadow-glow">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-star-500/20 ring-1 ring-star-400/40">
            <Repeat className="h-5 w-5 text-star-300" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">
            Neden 90 Dakikalık Döngülerle Uyumalıyız?
          </h3>
          <div className="space-y-3 text-sm leading-relaxed text-slate-300">
            <p>
              Bir uyku döngüsü ortalama <strong className="text-white">90 dakika</strong>{" "}
              sürer. Alarmınız derin uykunun ortasında çalarsa, uyku ataleti
              denilen sersemlik ve ağırlık hissiyle uyanırsınız.
            </p>
            <p>
              Döngü sonunda, yani uykunun en hafif olduğu anda uyanmak çok daha
              doğal ve dinç bir uyanış sağlar. Yetişkinler için genellikle 5–6
              tam döngü (7,5–9 saat) önerilir. Uyku hesaplayıcı, yatma ve
              uyanma saatlerinizi bu döngülere göre planlamanıza yardımcı olur.
            </p>
          </div>
        </article>

        {/* Tips */}
        <article className="glass-card bg-card-gradient p-6 transition hover:-translate-y-0.5 hover:shadow-glow">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-moon-600/20 ring-1 ring-moon-500/40">
            <Sunrise className="h-5 w-5 text-moon-400" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">
            Sabah Yorgun Uyanmamak İçin İpuçları
          </h3>
          <ul className="space-y-2.5 text-sm leading-relaxed text-slate-300">
            {[
              "Her gün, hafta sonları dahil, aynı saatte yatıp kalkın.",
              "Yatmadan 1 saat önce telefon ve ekranlardan uzak durun; mavi ışık melatonini baskılar.",
              "Öğleden sonra kafein, akşam saatlerinde ağır yemek ve alkol tüketmeyin.",
              "Yatak odanızı serin (18–20 °C), karanlık ve sessiz tutun.",
              "Uyanınca perdeleri açın; gün ışığı biyolojik saatinizi ayarlar.",
              "Erteleme (snooze) tuşundan kaçının; yeni bir döngüye girip daha yorgun uyanabilirsiniz.",
            ].map((tip) => (
              <li key={tip} className="flex gap-2.5">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-moon-400 to-star-400"
                  aria-hidden="true"
                />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
