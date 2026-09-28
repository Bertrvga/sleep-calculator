import { Megaphone } from "lucide-react";
import { ADS_ENABLED } from "@/lib/ads";

type Props = {
  id: string;
  label?: string;
  className?: string;
};

export default function AdPlaceholder({
  id,
  label = "Reklam Alanı",
  className = "",
}: Props) {
  if (!ADS_ENABLED) return null;

  return (
    <div
      id={id}
      role="complementary"
      aria-label={label}
      className={`flex w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-slate-400 ${className}`}
    >
      <div className="flex flex-col items-center gap-1 text-xs">
        <Megaphone className="h-4 w-4 opacity-60" />
        <span>{label}</span>
        <span className="text-[10px] opacity-50">#{id}</span>
      </div>
    </div>
  );
}
