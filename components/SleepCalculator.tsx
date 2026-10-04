"use client";

import { useMemo, useRef, useState } from "react";
import {
  Moon,
  Sun,
  Clock,
  Settings2,
  Sparkles,
  BedDouble,
  AlarmClock,
  ChevronDown,
  Info,
} from "lucide-react";
import AdPlaceholder from "./AdPlaceholder";
import { ADS_ENABLED } from "@/lib/ads";

type Mode = "wake" | "now";

const CYCLE_MIN = 90;
const CYCLE_HOURS = CYCLE_MIN / 60;
const FALL_ASLEEP_OPTIONS = [10, 15, 20, 30] as const;

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

function subMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() - minutes * 60 * 1000);
}
function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

type ResultCard = {
  cycles: number;
  time: string;
  totalHours: number;
  quality: "ideal" | "good" | "ok";
};

type SleepCalculatorProps = {
  quickBedTimes?: string[];
  quickWakeTimes?: string[];
};

export default function SleepCalculator({
  quickBedTimes = [],
  quickWakeTimes = [],
}: SleepCalculatorProps = {}) {
  const [mode, setMode] = useState<Mode>("wake");
  const [wakeTime, setWakeTime] = useState<string>("06:30");
  const [fallAsleepMin, setFallAsleepMin] =
    useState<(typeof FALL_ASLEEP_OPTIONS)[number]>(15);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [computed, setComputed] = useState<{
    mode: Mode;
    reference: string;
    fromNow?: boolean;
    cards: ResultCard[];
  } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const cycleOptions = useMemo(() => [3, 4, 5, 6, 7], []);

  function qualityFor(cycles: number): ResultCard["quality"] {
    if (cycles === 5 || cycles === 6) return "ideal";
    if (cycles === 4 || cycles === 7) return "good";
    return "ok";
  }

  function calculateFromWakeTime(time: string = wakeTime) {
    const wake = parseTimeToDate(time);
    const cards: ResultCard[] = cycleOptions.map((c) => {
      const totalMin = c * CYCLE_MIN + fallAsleepMin;
      const bed = subMinutes(wake, totalMin);
      return {
        cycles: c,
        time: formatTime(bed),
        totalHours: +(c * CYCLE_HOURS).toFixed(1),
        quality: qualityFor(c),
      };
    });
    setComputed({ mode: "wake", reference: time, cards });
  }

  function calculateFromBedTime(bed: Date, fromNow: boolean) {
    const startSleep = addMinutes(bed, fallAsleepMin);
    const cards: ResultCard[] = cycleOptions.map((c) => {
      const wake = addMinutes(startSleep, c * CYCLE_MIN);
      return {
        cycles: c,
        time: formatTime(wake),
        totalHours: +(c * CYCLE_HOURS).toFixed(1),
        quality: qualityFor(c),
      };
    });
    setComputed({
      mode: "now",
      reference: formatTime(bed),
      fromNow,
      cards,
    });
  }

  function handleCalculate() {
    if (mode === "wake") calculateFromWakeTime();
    else calculateFromBedTime(new Date(), true);
  }

  function scrollToResults() {
    requestAnimationFrame(() =>
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }

  function handleQuickBed(time: string) {
    calculateFromBedTime(parseTimeToDate(time), false);
    scrollToResults();
  }

  function handleQuickWake(time: string) {
    setMode("wake");
    setWakeTime(time);
    calculateFromWakeTime(time);
    scrollToResults();
  }

  const quickGroups = [
    {
      key: "bed",
      title: "Yatış saati seç",
      icon: <Moon className="h-4 w-4 text-moon-400" />,
      times: quickBedTimes,
      onSelect: handleQuickBed,
      isActive: (t: string) =>
        computed?.mode === "now" && !computed.fromNow && computed.reference === t,
    },
    {
      key: "wake",
      title: "Kalkış saati seç",
      icon: <Sun className="h-4 w-4 text-star-400" />,
      times: quickWakeTimes,
      onSelect: handleQuickWake,
      isActive: (t: string) =>
        computed?.mode === "wake" && computed.reference === t,
    },
  ].filter((g) => g.times.length > 0);

  return (
    <section className="py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-moon-400" />
          90 dakikalık uyku döngüsü bilimine dayalı
        </div>
        <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Uyku Hesaplayıcı
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-slate-400 sm:text-lg">
          Daha dinç uyanmak için ideal yatma ve uyanma saatlerini saniyeler
          içinde hesaplayın.
        </p>
      </div>

      {/* Mode Switch */}
      <div className="mx-auto mb-6 flex w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
        <button
          onClick={() => setMode("wake")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            mode === "wake"
              ? "bg-gradient-to-r from-moon-600 to-star-500 text-white shadow-glow"
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          <AlarmClock className="h-4 w-4" />
          Uyanma Saatine Göre
        </button>
        <button
          onClick={() => setMode("now")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            mode === "now"
              ? "bg-gradient-to-r from-moon-600 to-star-500 text-white shadow-glow"
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          <BedDouble className="h-4 w-4" />
          Şimdi Yatıyorum
        </button>
      </div>

      {/* Input Card */}
      <div className="glass-card p-6 sm:p-8">
        {mode === "wake" ? (
          <div>
            <label
              htmlFor="wake-time"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <Sun className="h-4 w-4 text-star-400" />
              Uyanmak istediğin saat
            </label>
            <input
              id="wake-time"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-night-800/70 px-4 py-4 text-center text-3xl font-bold text-white shadow-inner outline-none transition focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40 sm:text-4xl"
            />
            <p className="mt-2 text-xs text-slate-500">
              Örn. 06:30. Aşağıdaki kartlarda hangi saatte yatman gerektiği
              görünecek.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
              <Clock className="h-3.5 w-3.5 text-star-400" />
              Şu anki saati baz alarak
            </div>
            <p className="mt-4 text-slate-300">
              Şimdi yatarsam, kaçta uyansam daha dinç kalkarım? Butona bas,
              seçenekleri görelim.
            </p>
          </div>
        )}

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
              Gelişmiş Ayarlar
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
                Uykuya dalma süreni özelleştir. Ortalama insan uykuya 15 dakikada
                dalar.
              </p>
              <div className="flex flex-wrap gap-2">
                {FALL_ASLEEP_OPTIONS.map((min) => (
                  <button
                    key={min}
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

        <button onClick={handleCalculate} className="cta-primary mt-6 w-full">
          {mode === "wake" ? (
            <>
              <Moon className="h-5 w-5" />
              Yatma Saatlerini Hesapla
            </>
          ) : (
            <>
              <Sun className="h-5 w-5" />
              Uyanma Saatlerini Hesapla
            </>
          )}
        </button>
      </div>

      {/* Quick time options */}
      {quickGroups.length > 0 && (
        <div className="mt-6 glass-card p-6 sm:p-8">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-white">
            <Clock className="h-5 w-5 text-moon-400" />
            Hızlı Saat Seçenekleri
          </h2>
          <p className="mb-5 text-xs text-slate-500">
            Bir saate dokun, sonuçlar anında hesaplansın.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {quickGroups.map((group) => (
              <div key={group.key}>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  {group.icon}
                  {group.title}
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {group.times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => group.onSelect(t)}
                      aria-pressed={group.isActive(t)}
                      className={`rounded-lg border px-2 py-2 font-mono text-sm font-medium transition ${
                        group.isActive(t)
                          ? "border-moon-500 bg-moon-600/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {computed && (
        <div ref={resultsRef} className="mt-10 scroll-mt-6">
          <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-bold text-white">
              {computed.mode === "wake" ? (
                <>
                  Şu saatte uyanmak için:{" "}
                  <span className="text-moon-400">{computed.reference}</span>
                </>
              ) : computed.fromNow ? (
                <>
                  Şimdi ({computed.reference}) yatarsan
                </>
              ) : (
                <>
                  Yatış saati:{" "}
                  <span className="text-moon-400">{computed.reference}</span>
                </>
              )}
            </h2>
            <span className="text-xs text-slate-500">
              +{fallAsleepMin} dk uykuya dalma süresi dahil
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {computed.cards.map((c) => {
              const isIdeal = c.quality === "ideal";
              const isGood = c.quality === "good";
              return (
                <article
                  key={c.cycles}
                  className={`relative overflow-hidden rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-glow ${
                    isIdeal
                      ? "border-moon-500/40 bg-gradient-to-br from-moon-600/15 to-star-500/10"
                      : isGood
                      ? "border-star-400/30 bg-white/[0.03]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {isIdeal && (
                    <span className="absolute right-3 top-3 rounded-full bg-moon-600/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-moon-400 ring-1 ring-moon-500/40">
                      Önerilen
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {computed.mode === "wake" ? (
                      <BedDouble className="h-3.5 w-3.5" />
                    ) : (
                      <AlarmClock className="h-3.5 w-3.5" />
                    )}
                    {c.cycles} döngü · {c.totalHours} saat uyku
                  </div>
                  <div className="mt-3 font-mono text-4xl font-bold text-white sm:text-5xl">
                    {c.time}
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    {computed.mode === "wake"
                      ? "Bu saatte yatağa gir"
                      : "Bu saatte alarm kur"}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Ad bottom */}
          {ADS_ENABLED && (
            <div className="mt-8">
              <AdPlaceholder
                id="ad-bottom"
                label="Reklam Alanı — Alt Banner"
                className="h-24 md:h-28"
              />
            </div>
          )}

          {/* Info */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-slate-400">
            <div className="mb-2 flex items-center gap-2 font-medium text-slate-200">
              <Info className="h-4 w-4 text-star-400" />
              Neden 90 dakika?
            </div>
            <p>
              Ortalama bir uyku döngüsü yaklaşık 90 dakika sürer ve hafif uyku,
              derin uyku ve REM aşamalarını içerir. Döngü sonunda uyanmak,
              döngünün ortasında uyanmaktan çok daha dinç hissetmenizi sağlar.
              5–6 tam döngü (yaklaşık 7.5–9 saat) yetişkinler için ideal kabul
              edilir.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
