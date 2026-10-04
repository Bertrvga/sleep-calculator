import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type ToolLinkCardProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  className?: string;
};

export default function ToolLinkCard({
  href,
  label,
  icon: Icon,
  className = "",
}: ToolLinkCardProps) {
  return (
    <Link
      href={href}
      className={`glass-card bg-card-gradient group flex items-center justify-between gap-4 p-5 transition hover:-translate-y-0.5 hover:border-moon-500/40 hover:shadow-glow sm:p-6 ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-moon-600 to-star-500 shadow-glow">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-white sm:text-lg">{label}</span>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-moon-400 transition group-hover:translate-x-1 group-hover:text-white" />
    </Link>
  );
}
