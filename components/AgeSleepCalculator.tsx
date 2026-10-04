"use client";

import { useState } from "react";
import {
  AlarmClock,
  Baby,
  Clock,
  Coffee,
  Lightbulb,
  Moon,
  TrendingDown,
  Users,
} from "lucide-react";
import ToolLinkCard from "./ToolLinkCard";

type GroupKey =
  | "newborn"
  | "infant"
  | "toddler"
  | "preschool"
  | "school"
  | "teen"
  | "adult"
  | "senior";

type AgeGroup = {
  key: GroupKey;
  name: string;
  ageLabel: string;
  /** Representative age (years) the slider jumps to when the group is picked. */
  age: number;
  /** Recommended range (National Sleep Foundation, consistent with AASM). */
  recommended: [number, number];
  /** "May be appropriate" range (National Sleep Foundation). */
  acceptable: [number, number];
  includesNaps: boolean;
  nap: { needed: "yes" | "optional" | "no"; title: string; text: string };
  tip: string;
};

const AGE_GROUPS: AgeGroup[] = [
  {
    key: "newborn",
    name: "Yenidoğan",
    ageLabel: "0–3 ay",
    age: 0,
    recommended: [14, 17],
    acceptable: [11, 19],
    includesNaps: true,
    nap: {
      needed: "yes",
      title: "Evet, gün boyu",
      text: "Yenidoğanlar gece-gündüz ayrımı yapmadan, 2–4 saatlik parçalar halinde uyur. Gündüz uykuları toplam uykunun büyük kısmını oluşturur.",
    },
    tip: "Yenidoğanın biyolojik saati henüz gelişmemiştir; düzenli bir ritim genellikle 3. aydan sonra oturur. Gündüzleri doğal ışık, geceleri loş ve sessiz bir ortam sirkadiyen ritmin gelişmesine yardım eder. Güvenli uyku için bebeği her zaman sırt üstü yatırın.",
  },
  {
    key: "infant",
    name: "Bebek",
    ageLabel: "4–11 ay",
    age: 0,
    recommended: [12, 15],
    acceptable: [10, 18],
    includesNaps: true,
    nap: {
      needed: "yes",
      title: "Evet, günde 2–3 kez",
      text: "Bu dönemde bebekler genellikle günde 2–3 kez, toplam 2–4 saat gündüz uykusuna ihtiyaç duyar. 9. aydan sonra çoğu bebek 2 şekerlemeye geçer.",
    },
    tip: "Bebekler bu dönemde gece uykusunu birleştirmeye başlar. Her akşam aynı sırayla tekrarlanan banyo, masal ve ninni gibi bir uyku rutini, beyne uyku sinyali verir. Bebeği uykulu ama uyanıkken yatağa koymak kendi kendine uykuya dalmayı öğretir.",
  },
  {
    key: "toddler",
    name: "Oyun Çağı",
    ageLabel: "1–2 yaş",
    age: 1,
    recommended: [11, 14],
    acceptable: [9, 16],
    includesNaps: true,
    nap: {
      needed: "yes",
      title: "Evet, günde 1–2 kez",
      text: "Çoğu çocuk 18. ay civarında tek bir öğle uykusuna geçer. 1–3 saatlik öğle uykusu, akşam huysuzluğunu ve gece uyanmalarını azaltır.",
    },
    tip: "Bu yaşta hızlı beyin gelişimi nedeniyle uyku, dil ve motor becerilerin pekişmesi için kritiktir. Öğle uykusunu saat 15:00'ten sonraya bırakmamak gece uykusuna dalmayı kolaylaştırır. Yatmadan önce ekran yerine sakin oyunlar tercih edin.",
  },
  {
    key: "preschool",
    name: "Okul Öncesi",
    ageLabel: "3–5 yaş",
    age: 4,
    recommended: [10, 13],
    acceptable: [8, 14],
    includesNaps: true,
    nap: {
      needed: "yes",
      title: "Genellikle evet",
      text: "Çoğu çocuk 5 yaşına kadar günde bir kez öğle uykusuna ihtiyaç duyar. Öğle uykusunu bırakan çocuklarda gece uykusunun biraz daha erken başlaması gerekir.",
    },
    tip: "Okul öncesi dönemde kâbuslar ve gece korkuları sık görülür; tutarlı bir yatma saati ve güven veren bir rutin bunları azaltır. Gün içindeki fiziksel aktivite derin uykuyu artırır. Yatma saatinden 1 saat önce ekranları kapatın.",
  },
  {
    key: "school",
    name: "Okul Çağı",
    ageLabel: "6–13 yaş",
    age: 9,
    recommended: [9, 11],
    acceptable: [7, 12],
    includesNaps: false,
    nap: {
      needed: "no",
      title: "Genellikle hayır",
      text: "Okul çağındaki çocukların gece yeterince uyuması durumunda gündüz uykusuna ihtiyacı yoktur. Sık gündüz uykusu ihtiyacı, gece uykusunun yetersiz olduğuna işaret edebilir.",
    },
    tip: "Yeterli uyku; dikkat, öğrenme ve duygusal denge için doğrudan belirleyicidir ve eksikliği hiperaktivite gibi davranışlara benzeyebilir. Hafta içi ve hafta sonu yatma saatleri arasındaki fark 1 saati geçmemelidir. Yatak odasında televizyon ve telefon bulundurmamaya özen gösterin.",
  },
  {
    key: "teen",
    name: "Genç",
    ageLabel: "14–17 yaş",
    age: 15,
    recommended: [8, 10],
    acceptable: [7, 11],
    includesNaps: false,
    nap: {
      needed: "optional",
      title: "İsteğe bağlı, kısa",
      text: "Gerekirse öğleden sonra en fazla 20–30 dakikalık kısa bir şekerleme yapılabilir. Uzun ve geç saatte yapılan şekerlemeler gece uykusunu daha da geciktirir.",
    },
    tip: "Ergenlikte melatonin salgısı biyolojik olarak 1–2 saat gecikir; bu yüzden gençler doğal olarak geç uykulu olur. Akşam ekran ışığını azaltmak ve sabah gün ışığı almak bu kaymayı dengeler. Hafta sonu çok geç kalkmak pazartesi sabahlarını zorlaştırır.",
  },
  {
    key: "adult",
    name: "Yetişkin",
    ageLabel: "18–64 yaş",
    age: 30,
    recommended: [7, 9],
    acceptable: [6, 10],
    includesNaps: false,
    nap: {
      needed: "optional",
      title: "İsteğe bağlı power nap",
      text: "Gün ortasında 10–20 dakikalık bir power nap derin uykuya girmeden uyanıklığı ve performansı artırır. Saat 15:00'ten sonra ve 30 dakikadan uzun şekerlemelerden kaçının.",
    },
    tip: "Yetişkinlerde düzenli olarak 7 saatten az uyumak; obezite, diyabet, yüksek tansiyon ve depresyon riskiyle ilişkilidir. Her gün aynı saatte kalkmak biyolojik saati en etkili şekilde düzenler. Kafeini öğleden sonra 14:00'ten sonra tüketmemeye çalışın.",
  },
  {
    key: "senior",
    name: "Yaşlı",
    ageLabel: "65+ yaş",
    age: 70,
    recommended: [7, 8],
    acceptable: [5, 9],
    includesNaps: false,
    nap: {
      needed: "optional",
      title: "İsteğe bağlı, kısa",
      text: "Öğleden sonra erken saatte yapılan 20–30 dakikalık kısa bir şekerleme faydalı olabilir. Uzun gündüz uykuları gece uykusunu bölebilir.",
    },
    tip: "Yaş ilerledikçe derin uyku oranı azalır ve uyku daha hafif, bölünmüş hale gelir; ancak uyku ihtiyacı belirgin şekilde azalmaz. Gün içinde dışarıda gün ışığı almak ve fiziksel olarak aktif kalmak gece uykusunu derinleştirir. Sık gece uyanmaları ve horlama için bir uzmana danışın.",
  },
];

function groupForAge(age: number): GroupKey {
  if (age < 1) return "infant";
  if (age <= 2) return "toddler";
  if (age <= 5) return "preschool";
  if (age <= 13) return "school";
  if (age <= 17) return "teen";
  if (age <= 64) return "adult";
  return "senior";
}

function range([min, max]: [number, number]) {
  return `${min}–${max}`;
}

const NAP_BADGE = {
  yes: { label: "Gerekli", className: "bg-moon-600/30 text-moon-400 ring-moon-500/40" },
  optional: { label: "İsteğe Bağlı", className: "bg-star-500/20 text-star-300 ring-star-400/40" },
  no: { label: "Gerekmez", className: "bg-white/5 text-slate-300 ring-white/15" },
} as const;

export default function AgeSleepCalculator() {
  const [age, setAge] = useState(30);
  const [groupKey, setGroupKey] = useState<GroupKey>("adult");

  const group = AGE_GROUPS.find((g) => g.key === groupKey)!;
  const napBadge = NAP_BADGE[group.nap.needed];

  function handleAgeChange(value: number) {
    setAge(value);
    // Keep "Yenidoğan" when the slider stays at 0 after picking it.
    setGroupKey((prev) =>
      value === 0 && prev === "newborn" ? prev : groupForAge(value)
    );
  }

  function handleGroupSelect(g: AgeGroup) {
    setGroupKey(g.key);
    setAge(g.age);
  }

  return (
    <section className="py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          <Users className="h-3.5 w-3.5 text-moon-400" />
          AASM ve National Sleep Foundation önerilerine göre
        </div>
        <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Yaşa Göre Uyku İhtiyacı
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-slate-400 sm:text-lg">
          Yaşını gir ya da yaş grubunu seç; kaç saat uyuman gerektiğini,
          gündüz uykusuna ihtiyacın olup olmadığını öğren.
        </p>
      </div>

      {/* Input Card */}
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-2 flex items-center justify-between gap-2">
          <label
            htmlFor="age"
            className="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <Clock className="h-4 w-4 text-star-400" />
            Yaşın
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={age}
              onChange={(e) => {
                const v = Math.round(Number(e.target.value));
                if (!Number.isNaN(v)) handleAgeChange(Math.min(100, Math.max(0, v)));
              }}
              aria-label="Yaş (sayı)"
              className="w-20 rounded-lg border border-white/10 bg-night-800/70 px-3 py-1.5 text-center font-mono text-lg font-bold text-white outline-none transition focus:border-moon-500 focus:ring-2 focus:ring-moon-500/40"
            />
            <span className="text-sm text-slate-400">yaş</span>
          </div>
        </div>
        <input
          id="age"
          type="range"
          min={0}
          max={100}
          step={1}
          value={age}
          onChange={(e) => handleAgeChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-night-700 accent-moon-500"
        />
        <p className="mt-2 text-xs text-slate-500">
          1 yaşından küçükler için aşağıdan Yenidoğan veya Bebek grubunu seç.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
            <Baby className="h-4 w-4 text-moon-400" />
            Hızlı yaş grubu seçimi
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AGE_GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => handleGroupSelect(g)}
                aria-pressed={groupKey === g.key}
                className={`rounded-lg border px-3 py-2 text-left transition ${
                  groupKey === g.key
                    ? "border-moon-500 bg-moon-600/20 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span className="block text-sm font-medium">{g.name}</span>
                <span className="block text-xs text-slate-400">{g.ageLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold text-white">
            {group.name}{" "}
            <span className="text-moon-400">({group.ageLabel})</span>
          </h2>
          <span className="text-xs text-slate-500">
            Kaynak: AASM & National Sleep Foundation
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Recommended sleep */}
          <article className="relative overflow-hidden rounded-2xl border border-moon-500/40 bg-gradient-to-br from-moon-600/15 to-star-500/10 p-5">
            <span className="absolute right-3 top-3 rounded-full bg-moon-600/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-moon-400 ring-1 ring-moon-500/40">
              Önerilen
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Moon className="h-3.5 w-3.5" />
              İdeal uyku süresi
            </div>
            <div className="mt-3 font-mono text-4xl font-bold text-white sm:text-5xl">
              {range(group.recommended)}
              <span className="ml-1 text-2xl text-slate-400">sa</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              {group.includesNaps
                ? "24 saatlik toplam uyku (gündüz uykuları dahil)."
                : "Gecelik uyku süresi."}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Kabul edilebilir aralık: {range(group.acceptable)} saat
            </p>
          </article>

          {/* Nap */}
          <article className="rounded-2xl border border-star-400/30 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Coffee className="h-3.5 w-3.5 text-star-400" />
                Gündüz uykusu
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${napBadge.className}`}
              >
                {napBadge.label}
              </span>
            </div>
            <div className="mt-3 text-xl font-semibold text-white">
              {group.nap.title}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {group.nap.text}
            </p>
          </article>

          {/* Tip */}
          <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lightbulb className="h-3.5 w-3.5 text-moon-400" />
              Özel ipucu & tavsiye
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {group.tip}
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ToolLinkCard
            href="/"
            label="Bu gece kaçta uyuman gerektiğini hesapla"
            icon={AlarmClock}
          />
          <ToolLinkCard
            href="/araclar/uyku-borcu"
            label="Haftalık uyku borcunu hesapla"
            icon={TrendingDown}
          />
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Değerler sağlıklı bireyler için genel önerilerdir; kişisel ihtiyaçlar
          farklılık gösterebilir. Bu araç sağlık tavsiyesi değildir.
        </p>
      </div>
    </section>
  );
}
