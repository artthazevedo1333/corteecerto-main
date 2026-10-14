/**
 * Formatação regional (moeda, data, hora) baseada nas preferências do usuário.
 * Fallback: Brasil (pt-BR / BRL / 24h).
 */

export interface LocalePreferences {
  language?: string;
  country?: string;
  currency?: string;
  timezone?: string;
  date_format?: string;
  time_format?: string;
}

const COUNTRY_TO_LOCALE: Record<string, string> = {
  BR: "pt-BR",
  US: "en-US",
  ES: "es-ES",
};

const COUNTRY_DEFAULTS: Record<
  string,
  { currency: string; timezone: string; date_format: string; time_format: "12h" | "24h" }
> = {
  BR: {
    currency: "BRL",
    timezone: "America/Sao_Paulo",
    date_format: "dd/MM/yyyy",
    time_format: "24h",
  },
  US: {
    currency: "USD",
    timezone: "America/New_York",
    date_format: "MM/dd/yyyy",
    time_format: "12h",
  },
  ES: { currency: "EUR", timezone: "Europe/Madrid", date_format: "dd/MM/yyyy", time_format: "24h" },
};

export function getCountryDefaults(country: string) {
  return COUNTRY_DEFAULTS[country] ?? COUNTRY_DEFAULTS.BR;
}

export function resolveLocale(prefs?: LocalePreferences | null): string {
  const country = prefs?.country ?? "BR";
  return COUNTRY_TO_LOCALE[country] ?? "pt-BR";
}

export function formatCurrency(
  value: number,
  prefs?: LocalePreferences | null,
  opts: Intl.NumberFormatOptions = {},
): string {
  const locale = resolveLocale(prefs);
  const currency = prefs?.currency ?? getCountryDefaults(prefs?.country ?? "BR").currency;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    ...opts,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatDate(
  input: Date | string | number,
  prefs?: LocalePreferences | null,
): string {
  const locale = resolveLocale(prefs);
  const d = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: prefs?.timezone ?? undefined,
  }).format(d);
}

export function formatTime(
  input: Date | string | number,
  prefs?: LocalePreferences | null,
): string {
  const locale = resolveLocale(prefs);
  const d = input instanceof Date ? input : new Date(input);
  const timeFormat = prefs?.time_format ?? getCountryDefaults(prefs?.country ?? "BR").time_format;
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: timeFormat === "12h",
    timeZone: prefs?.timezone ?? undefined,
  }).format(d);
}

export function formatDateTime(
  input: Date | string | number,
  prefs?: LocalePreferences | null,
): string {
  return `${formatDate(input, prefs)} ${formatTime(input, prefs)}`;
}
