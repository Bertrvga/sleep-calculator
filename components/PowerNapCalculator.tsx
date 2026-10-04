"use client";

import { useEffect, useState } from "react";
import {
  AlarmClock,
  BatteryCharging,
  Brain,
  ChevronDown,
  Clock,
  Coffee,
  Rocket,
  Settings2,
  Sun,
  TrendingDown,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ToolLinkCard from "./ToolLinkCard";

type NapKey = "power" | "nasa" | "cycle";
type StartMode = "now" | "pick";

type NapMode = {
  key: NapKey;
  name: string;
  subtitle: string;
  minutes: number;
  icon: LucideIcon;
  summary: string;
  science: string[];
};

const NAP_MODES: NapMode[] = [
  {
    key: "power",
    name: "Power Nap",
    subtitle: "Güç Uykusu",
    minutes: 20,
    icon: Zap,
    summary: "Hızlı tazelenme, zihinsel berraklık",
    science: [
      "20 dakikalık bir şekerleme seni yalnızca hafif uyku evrelerinde (N1–N2) tutar. Bu sürede beyin adenozin denen yorgunluk molekülünün bir kısmını temizler, dikkat ve tepki süresi belirgin şekilde toparlanır.",
      "Derin uykuya (N3) geçmeden uyandığın için uyku sersemliği (uyku ataleti) yaşamazsın; gözünü açtığın anda işine dönebilirsin.",
    ],
  },
  {
    key: "nasa",
    name: "NASA Nap",
    subtitle: "Performans Uykusu",
    minutes: 26,
    icon: Rocket,
    summary: "%34 performans artışı",
    science: [
      "NASA'nın uzun uçuş pilotlarıyla yaptığı araştırmada 26 dakikalık bir kestirme, performansı %34, uyanıklığı ise %54 artırdı. Bu süre hafif uykunun faydalarını en üst düzeye çıkaran sınıra yakındır.",
      "Şekerleme hâlâ derin uyku başlamadan biter; böylece uzun süre odak gerektiren işler için güçlü bir enerji takviyesi alırken sersemlik riskini düşük tutarsın.",
    ],
  },
  {
    key: "cycle",
    name: "Tam Döngü",
    subtitle: "Şekerlemesi",
    minutes: 90,
    icon: BatteryCharging,
    summary: "Tam REM döngüsü, derin yenilenme",
    science: [
      "90 dakika, hafif uyku, derin uyku ve REM evrelerini içeren tam bir uyku döngüsüdür. Derin uyku bedeni onarır; REM ise yaratıcılığı, duygusal dengeyi ve hafızayı güçlendirir.",
      "Döngünün sonunda uyku yeniden hafifler; bu yüzden derin uykunun ortasında bölünmezsin ve sersemlik olmadan uyanırsın. Gece uykusu eksik kalmış günler için idealdir.",
    ],
  },
];

const FALL_ASLEEP_OPTIONS = [5, 10, 14, 20] as const;
const IDEAL_START_HOUR = 13;
const IDEAL_END_HOUR = 16;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseTimeToDate(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

// Turkish dative suffix based on how the time is read aloud ("14:30'a", "15:00'e").
const ONES_SUFFIX = ["", "'e", "'ye", "'e", "'e", "'e", "'ya", "'ye", "'e", "'a"];
const TENS_SUFFIX = ["'a", "'a", "'ye", "'a", "'a", "'ye"];

function dativeSuffix(n: number) {
  return n % 10 ? ONES_SUFFIX[n % 10] : TENS_SUFFIX[n / 10];
}

function timeDativeSuffix(date: Date) {
  const m = date.getMinutes();
  return dativeSuffix(m === 0 ? date.getHours() : m);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export default function PowerNapCalculator() {
  const [napKey, setNapKey] = useState<NapKey>("power");
  const [startMode, setStartMode] = useState<StartMode>("now");
  const [pickedTime, setPickedTime] = useState("14:00");
  const [fallAsleepMin, setFallAsleepMin] =
    useState<(typeof FALL_ASLEEP_OPTIONS)[number]>(14);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  // Current time is only known on the client; keep it null during prerender.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  const nap = NAP_MODES.find((m) => m.key === napKey)!;
  const start = startMode === "now" ? now : parseTimeToDate(pickedTime);
  const alarm = start ? addMinutes(start, fallAsleepMin + nap.minutes) : null;
  const startHour = start ? start.getHours() : null;
  const outsideIdeal =
    startHour !== null &&
    (startHour < IDEAL_START_HOUR || startHour >= IDEAL_END_HOUR);

  return (
    <section className="py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          <Zap className="h-3.5 w-3.5 text-moon-400" />
          Uyku sersemliği olmadan tazelen
        </div>
        <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Güç Uykusu Zamanlayıcı
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-slate-400 sm:text-lg">
          Şekerleme türünü seç, alarmını tam olarak kaça kurman gerektiğini
          saniyeler içinde öğren.
        </p>
      </div>

      {/* Nap modes */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {NAP_MODES.map((m) => {
          const active = m.key === napKey;
          const Icon = m.icon;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setNapKey(m.key)}
              aria-pressed={active}
              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                active
                  ? "border-moon-500/60 bg-gradient-to-br from-moon-600/25 to-star-500/15 shadow-glow"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${
                    active
                      ? "bg-gradient-to-r from-moon-600 to-star-500 ring-transparent"
                      : "bg-moon-600/20 ring-moon-500/40"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${active ? "text-white" : "text-moon-400"}`}
                  />
                </div>
                <span className="font-mono text-2xl font-bold text-white">
                  {m.minutes}
                  <span className="ml-0.5 text-sm text-slate-400">dk</span>
                </span>
              </div>
              <div className="mt-3 font-semibold text-white">
                {m.name}{" "}
                <span className="font-normal text-slate-400">/ {m.subtitle}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{m.summary}</p>
            </button>
          );
        })}
      </div>

      {/* Input Card */}
      <div className="glass-card p-6 sm:p-8">
        {/* Start mode switch */}
        <div className="flex w-full rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
          {(
            [
              { key: "now", label: "Şu An Şekerleme Yapıyorum", short: "Şu An", icon: Clock },
              { key: "pick", label: "Saat Seç", short: "Saat Seç", icon: Sun },
            ] as const
          ).map(({ key, label, short, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setStartMode(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                startMode === key
                  ? "bg-gradient-to-r from-moon-600 to-star-500 text-white shadow-glow"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          {startMode === "now" ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
                <Clock className="h-3.5 w-3.5 text-star-400" />
                Şu an saat{" "}
                <span className="font-mono font-semibold text-white">
                  {now ? formatTime(now) : "--:--"}
                </span>
              </div>
              <p className="mt-4 text-slate-300">
                Şimdi uzanırsan alarmını kaça kurman gerektiği aşağıda.
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="nap-time"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
              >
                <Sun className="h-4 w-4 text-star-400" />
                Uzanacağın saat
              </label>
              <input
                id="nap-time"
                type="time"
                value={pickedTime}
                onChange={(e) => setPickedTime(e.target.value || "14:00")}
                className="w-full rounded-xl border border-white/10 bg-night-800/70 px-4 py-4 text-center text-3xl font-bold text-white shadow-inner outline-none transition focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40 sm:text-4xl"
              />
            </div>
          )}
          <p className="mt-3 text-xs text-slate-500">
            İdeal şekerleme aralığı {pad(IDEAL_START_HOUR)}:00–
            {pad(IDEAL_END_HOUR)}:00 arasıdır.
            {outsideIdeal &&
              " Seçtiğin saat bu aralığın dışında; geç saatte şekerleme gece uykunu zorlaştırabilir."}
          </p>
        </div>

        {/* Advanced */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            aria-expanded={advancedOpen}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-200"
          >
            <span className="inline-flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-moon-400" />
              Uykuya dalma süresi: +{fallAsleepMin} dk
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                advancedOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {advancedOpen && (
            <div className="border-t border-white/10 p-4">
              <p className="mb-3 text-xs text-slate-400">
                Ortalama bir insan gündüz yaklaşık 14 dakikada uykuya dalar.
                Kendi süreni seçebilirsin.
              </p>
              <div className="flex flex-wrap gap-2">
                {FALL_ASLEEP_OPTIONS.map((min) => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => setFallAsleepMin(min)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      fallAsleepMin === min
                        ? "border-moon-500 bg-moon-600/20 text-white"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {min} dk
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        {/* Alarm */}
        <article className="relative overflow-hidden rounded-2xl border border-moon-500/40 bg-gradient-to-br from-moon-600/15 to-star-500/10 p-6 text-center shadow-glow sm:p-8">
          <div className="inline-flex items-center gap-2 text-sm text-slate-300">
            <AlarmClock className="h-4 w-4 text-moon-400" />
            Alarm kurma saati
          </div>
          <div className="mt-3 bg-gradient-to-r from-moon-400 to-star-300 bg-clip-text font-mono text-6xl font-bold text-transparent sm:text-7xl">
            {alarm ? formatTime(alarm) : "--:--"}
          </div>
          <p className="mt-4 text-slate-200 sm:text-lg">
            Alarmını tam saat{" "}
            <strong className="text-white">
              {alarm ? formatTime(alarm) : "--:--"}
              {alarm ? timeDativeSuffix(alarm) : ""}
            </strong>{" "}
            kurmalısın.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {start ? formatTime(start) : "--:--"} + {fallAsleepMin} dk uykuya
            dalma + {nap.minutes} dk {nap.name}
          </p>
        </article>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Science */}
          <article className="glass-card bg-card-gradient p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-moon-600/20 ring-1 ring-moon-500/40">
              <Brain className="h-5 w-5 text-moon-400" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">
              Neden {nap.minutes} Dakika?
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-slate-300">
              {nap.science.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>

          {/* Coffee nap */}
          <article className="glass-card bg-card-gradient p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-star-500/20 ring-1 ring-star-400/40">
              <Coffee className="h-5 w-5 text-star-300" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">
              Kahve Uykusu (Coffee Nap) İpucu
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-slate-300">
              <p>
                20 dakikalık kestirmeden hemen önce bir fincan kahve iç. Kafein
                kana karışıp etkisini göstermeye yaklaşık{" "}
                <strong className="text-white">20 dakikada</strong> başlar;
                yani tam uyandığın anda devreye girer.
              </p>
              <p>
                Uyurken beyin, yorgunluk hissi yaratan adenozini temizler.
                Kafein de adenozinin bağlandığı reseptörleri kapattığı için
                uyandığında boşalan reseptörleri kafein doldurur ve çift etkili
                bir uyanıklık elde edersin.
              </p>
              {napKey === "cycle" && (
                <p className="text-xs text-slate-500">
                  Not: 90 dakikalık şekerlemede kafein uykunu bölebilir; kahve
                  uykusu 20 dakikalık Power Nap için önerilir.
                </p>
              )}
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ToolLinkCard
            href="/"
            label="Bu gece ideal saatte uyanmak için hesaplama yap"
            icon={AlarmClock}
          />
          <ToolLinkCard
            href="/araclar/uyku-borcu"
            label="Haftalık uyku borcunu hesapla"
            icon={TrendingDown}
          />
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Süreler genel bilimsel ortalamalara dayanır; kişisel farklılıklar
          sonuçları etkileyebilir. Bu araç sağlık tavsiyesi değildir.
        </p>
      </div>
    </section>
  );
}
