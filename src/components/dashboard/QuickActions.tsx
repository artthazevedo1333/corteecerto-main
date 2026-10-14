import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CalendarPlus, UserPlus, Scissors, DollarSign } from "lucide-react";
import { translateKey } from "@/lib/i18n";

const actions = [
  {
    label: "Agendar",
    icon: CalendarPlus,
    to: "/dashboard/agenda",
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    label: "Novo cliente",
    icon: UserPlus,
    to: "/dashboard/clients",
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    label: "Novo serviço",
    icon: Scissors,
    to: "/dashboard/services",
    color: "text-violet-600 bg-violet-500/10",
  },
  {
    label: "Nova venda",
    icon: DollarSign,
    to: "/dashboard/finance",
    color: "text-amber-600 bg-amber-500/10",
  },
] as const;

export function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <Link
            key={a.label}
            to={a.to}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30"
          >
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105 ${a.color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold leading-tight">{a.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
