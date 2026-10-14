import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/hooks/use-locale";
import { Globe } from "lucide-react";

const COUNTRIES = [
  { code: "BR", labelKey: "countries.BR" },
  { code: "US", labelKey: "countries.US" },
  { code: "ES", labelKey: "countries.ES" },
];

const LANGUAGES = [
  { code: "pt", labelKey: "languages.pt" },
  { code: "en", labelKey: "languages.en" },
  { code: "es", labelKey: "languages.es" },
];

const CURRENCIES = ["BRL", "USD", "EUR"];
const TIMEZONES = [
  "America/Sao_Paulo",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/Madrid",
  "Europe/London",
  "UTC",
];
const DATE_FORMATS = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"];
const TIME_FORMATS = ["24h", "12h"];

export function RegionSettings() {
  const { t } = useTranslation();
  const { prefs, update } = useLocale();

  const handleChange = async (patch: Parameters<typeof update>[0]) => {
    try {
      await update(patch);
      toast.success("Preferências salvas");
    } catch {
      toast.error("Erro ao salvar região");
    }
  };

  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Região e Formatos</CardTitle>
            <CardDescription>Idioma, moeda e fuso horário para exibição dos dados.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="País">
          <Select value={prefs.country} onValueChange={(v) => handleChange({ country: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code === "BR" ? "Brasil" : c.code === "US" ? "Estados Unidos" : "Espanha"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Idioma">
          <Select value={prefs.language} onValueChange={(v) => handleChange({ language: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.code} value={l.code}>
                  {l.code === "pt" ? "Português" : l.code === "en" ? "Inglês" : "Espanhol"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Moeda">
          <Select value={prefs.currency} onValueChange={(v) => handleChange({ currency: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Fuso Horário">
          <Select value={prefs.timezone} onValueChange={(v) => handleChange({ timezone: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Formato de Data">
          <Select value={prefs.date_format} onValueChange={(v) => handleChange({ date_format: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_FORMATS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Formato de Hora">
          <Select value={prefs.time_format} onValueChange={(v) => handleChange({ time_format: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_FORMATS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f === "24h" ? "24h" : "12h (AM/PM)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
