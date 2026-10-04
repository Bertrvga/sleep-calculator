"use client";

import { useState } from "react";
import {
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Gauge,
  AlarmClock,
  HeartPulse,
  ShieldAlert,
  Target,
  TrendingDown,
} from "lucide-react";
import ToolLinkCard from "./ToolLinkCard";

type InputMode = "average" | "daily";
type Risk = "none" | "low" | "medium" | "high" | "oversleep";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MAX_EXTRA_MIN_PER_DAY = 60;
// Sleeping at least this much more than needed per night counts as oversleeping.
const OVERSLEEP_HOURS_PER_NIGHT = 1;

function formatHours(hours: number) {
  return hours.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

function riskFor(debtHours: number, surplusHours: number): Risk {
  if (surplusHours >= OVERSLEEP_HOURS_PER_NIGHT * 7) return "oversleep";
  if (debtHours <= 0) return "none";
  if (debtHours < 5) return "low";
  if (debtHours < 10) return "medium";
  return "high";
}

const RISK_INFO: Record<
  Risk,
  { label: string; text: string; card: string; badge: string; icon: string }
> = {
  none: {
    label: "Borç Yok",
    text: "Harika! Bu hafta uyku ihtiyacını karşılamışsın. Düzenli uyku saatlerini korumaya devam et.",
    card: "border-star-400/30 bg-white/[0.03]",
    badge: "bg-star-500/20 text-star-300 ring-star-400/40",
    icon: "text-star-300",
  },
  low: {
    label: "Hafif Uyku Borcu",
    text: "Küçük bir açık var. Hafif yorgunluk ve dikkat dağınıklığı hissedebilirsin; birkaç gün biraz erken yatmak yeterli olacaktır.",
    card: "border-moon-500/30 bg-white/[0.03]",
    badge: "bg-moon-600/30 text-moon-400 ring-moon-500/40",
    icon: "text-moon-400",
  },
  medium: {
    label: "Orta Uyku Borcu",
    text: "Birikmiş borç konsantrasyonu, ruh halini ve reaksiyon süreni olumsuz etkileyebilir. Araç kullanırken ve önemli kararlarda dikkatli ol.",
    card: "border-amber-400/30 bg-amber-500/[0.05]",
    badge: "bg-amber-500/20 text-amber-300 ring-amber-400/40",
    icon: "text-amber-300",
  },
  high: {
    label: "Yüksek Uyku Borcu",
    text: "Kronik uyku eksikliği bağışıklığı zayıflatabilir, kalp-damar ve metabolik riskleri artırabilir. Uyku düzenini önceliklendir; sürekli yorgunluk yaşıyorsan bir uzmana danış.",
    card: "border-rose-400/30 bg-rose-500/[0.05]",
    badge: "bg-rose-500/20 text-rose-300 ring-rose-400/40",
    icon: "text-rose-300",
  },
  oversleep: {
    label: "Aşırı Uyku Uyarısı",
    text: "Gereğinden fazla uyumak sersemlik ve gün içi halsizliğe sebep olabilir. Sürekli fazla uyku ihtiyacı hissediyorsan bunun altında yatan bir neden olabilir.",
    card: "border-amber-400/30 bg-amber-500/[0.05]",
    badge: "bg-amber-500/20 text-amber-300 ring-amber-400/40",
    icon: "text-amber-300",
  },
};

function recoveryPlan(debtHours: number) {
  const debtMin = Math.round(debtHours * 60);
  if (debtMin <= 0) return null;
  // Small debts are spread at 30 min/day; larger ones up to 60 min/day.
  const targetPerDay = debtMin <= 210 ? 30 : MAX_EXTRA_MIN_PER_DAY;
  const days = Math.max(1, Math.ceil(debtMin / targetPerDay));
  const perDay = Math.min(
    MAX_EXTRA_MIN_PER_DAY,
    Math.ceil(debtMin / days / 5) * 5
  );
  return { days, perDay };
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  onChange,
  compact = false,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className={`font-medium text-slate-300 ${compact ? "text-xs" : "text-sm"}`}
        >
          {label}
        </label>
        <span
          className={`font-mono font-bold text-white ${compact ? "text-sm" : "text-lg"}`}
        >
          {formatHours(value)} sa
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-night-700 accent-moon-500"
      />
    </div>
  );
}

export default function SleepDebtCalculator() {
  const [need, setNeed] = useState(8);
  const [inputMode, setInputMode] = useState<InputMode>("average");
  const [average, setAverage] = useState(6.5);
  const [daily, setDaily] = useState<number[]>(() => Array(7).fill(6.5));

  const totalSlept =
    inputMode === "average" ? average * 7 : daily.reduce((a, b) => a + b, 0);
  const totalNeed = need * 7;
  const debt = Math.max(0, +(totalNeed - totalSlept).toFixed(1));
  const surplus = Math.max(0, +(totalSlept - totalNeed).toFixed(1));
  const risk = riskFor(debt, surplus);
  const info = RISK_INFO[risk];
  const plan = recoveryPlan(debt);

  function setDay(index: number, value: number) {
    setDaily((prev) => prev.map((v, i) => (i === index ? value : v)));
  }

  return (
    <section className="py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          <TrendingDown className="h-3.5 w-3.5 text-moon-400" />
          Son 7 günlük uykuna göre
        </div>
        <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Uyku Borcu Hesaplayıcı
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-slate-400 sm:text-lg">
          Bu hafta ne kadar eksik uyuduğunu öğren ve borcunu vücudunu yormadan
          nasıl kapatabileceğini gör.
        </p>
      </div>

      {/* Input Card */}
      <div className="glass-card p-6 sm:p-8">
        <Slider
          id="need"
          label="Günlük ideal uyku ihtiyacın"
          value={need}
          min={5}
          max={12}
          onChange={setNeed}
        />
        <p className="mt-2 text-xs text-slate-500">
          Yetişkinler için önerilen süre 7–9 saattir.
        </p>

        {/* Mode Switch */}
        <div className="mt-6 flex w-full rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
          {(
            [
              { key: "average", label: "Haftalık Ortalama", icon: Gauge },
              { key: "daily", label: "Gün Gün Gir", icon: CalendarDays },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setInputMode(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                inputMode === key
                  ? "bg-gradient-to-r from-moon-600 to-star-500 text-white shadow-glow"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          {inputMode === "average" ? (
            <Slider
              id="average"
              label="Son 7 günde ortalama kaç saat uyudun?"
              value={average}
              min={0}
              max={12}
              onChange={setAverage}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {DAYS.map((day, i) => (
                <Slider
                  key={day}
                  id={`day-${i}`}
                  label={day}
                  value={daily[i]}
                  min={0}
                  max={12}
                  onChange={(v) => setDay(i, v)}
                  compact
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        <h2 className="mb-6 text-2xl font-bold text-white">Sonuçların</h2>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Debt */}
          <article className="relative overflow-hidden rounded-2xl border border-moon-500/40 bg-gradient-to-br from-moon-600/15 to-star-500/10 p-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <BedDouble className="h-3.5 w-3.5" />
              Haftalık uyku borcu
            </div>
            <div className="mt-3 font-mono text-4xl font-bold text-white sm:text-5xl">
              {formatHours(debt)}
              <span className="ml-1 text-2xl text-slate-400">sa</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              {debt > 0 ? (
                <>
                  Bu hafta{" "}
                  <strong className="text-white">
                    {formatHours(debt)} saat
                  </strong>{" "}
                  uyku borcunuz birikti.
                </>
              ) : (
                "Bu hafta uyku borcunuz yok."
              )}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {formatHours(totalSlept)} / {formatHours(totalNeed)} saat uyudun
            </p>
          </article>

          {/* Risk */}
          <article className={`rounded-2xl border p-5 ${info.card}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <HeartPulse className={`h-3.5 w-3.5 ${info.icon}`} />
                Sağlık & risk durumu
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${info.badge}`}
              >
                {info.label}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xl font-semibold text-white">
              {risk === "none" ? (
                <CheckCircle2 className={`h-5 w-5 ${info.icon}`} />
              ) : (
                <ShieldAlert className={`h-5 w-5 ${info.icon}`} />
              )}
              {info.label}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {risk === "oversleep" && (
                <>
                  İhtiyacından haftalık{" "}
                  <strong className="text-white">
                    {formatHours(surplus)} saat
                  </strong>{" "}
                  fazla uyudun.{" "}
                </>
              )}
              {info.text}
            </p>
          </article>

          {/* Recovery */}
          <article className="rounded-2xl border border-star-400/30 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Target className="h-3.5 w-3.5 text-star-400" />
              Telafi önerisi
            </div>
            {risk === "oversleep" ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Günde ideal{" "}
                <strong className="text-white">{formatHours(need)} saat</strong>{" "}
                uykunu korumaya çalış, fazla uykuyu kademeli olarak azalt. Her
                gece 15–30 dakika daha erken kalkmak, ritmini bozmadan
                ihtiyacına yaklaşmanı sağlar.
              </p>
            ) : plan ? (
              <>
                <div className="mt-3 font-mono text-4xl font-bold text-white sm:text-5xl">
                  +{plan.perDay}
                  <span className="ml-1 text-2xl text-slate-400">dk</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  <strong className="text-white">{plan.days} gün</strong>{" "}
                  boyunca her gece{" "}
                  <strong className="text-white">{plan.perDay} dakika</strong>{" "}
                  fazla uyuyarak borcunu kapatabilirsin. Bunun için yaklaşık{" "}
                  {plan.perDay} dakika erken yatman yeterli.
                </p>
                {plan.days > 14 && (
                  <p className="mt-2 text-xs text-slate-500">
                    Borç yüksek olduğu için telafi uzun sürebilir; önceliğin
                    her gece ihtiyacın kadar uyumak olsun.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Telafi etmen gereken bir borç yok. Her gece{" "}
                <strong className="text-white">{formatHours(need)} saat</strong>{" "}
                uyumaya devam et.
              </p>
            )}
          </article>
        </div>

        <ToolLinkCard
          href="/"
          label="Bu gece ideal saatte uyanmak için hesaplama yap"
          icon={AlarmClock}
          className="mt-6"
        />

        <p className="mt-6 text-xs text-slate-500">
          Telafi planı, günde en fazla {MAX_EXTRA_MIN_PER_DAY} dakika ekstra
          uykuyla vücudun ritmini bozmadan hesaplanır. Bu araç sağlık tavsiyesi
          değildir.
        </p>
      </div>
    </section>
  );
}
