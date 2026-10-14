import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  setLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n";
import type { LocalePreferences } from "@/lib/locale-format";
import { getCountryDefaults } from "@/lib/locale-format";

const STORAGE_KEY = "app_locale_prefs_v1";

const FALLBACK: Required<LocalePreferences> = {
  language: "pt",
  country: "BR",
  currency: "BRL",
  timezone: "America/Sao_Paulo",
  date_format: "dd/MM/yyyy",
  time_format: "24h",
};

function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(nav)
    ? (nav as SupportedLanguage)
    : DEFAULT_LANGUAGE;
}

/**
 * Sincroniza preferências regionais do perfil do usuário com o i18n
 * e expõe helpers para leitura/atualização.
 */
export function useLocale() {
  const [prefs, setPrefs] = useState<Required<LocalePreferences>>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = window.localStorage.getItem(STORAGE_KEY);
        if (cached) return { ...FALLBACK, ...JSON.parse(cached) };
      } catch {
        /* noop */
      }
    }
    return { ...FALLBACK, language: detectBrowserLanguage() };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLanguage(prefs.language);
  }, [prefs.language]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        // Sem sessão: aplica detecção do navegador
        setLanguage(detectBrowserLanguage());
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("language, country, currency, timezone, date_format, time_format")
        .eq("id", userData.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        const merged: Required<LocalePreferences> = {
          language: data.language ?? FALLBACK.language,
          country: data.country ?? FALLBACK.country,
          currency: data.currency ?? FALLBACK.currency,
          timezone: data.timezone ?? FALLBACK.timezone,
          date_format: data.date_format ?? FALLBACK.date_format,
          time_format: data.time_format ?? FALLBACK.time_format,
        };
        setPrefs(merged);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
          /* noop */
        }
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback(
    async (patch: Partial<LocalePreferences>) => {
      const next = { ...prefs, ...patch } as Required<LocalePreferences>;
      // Se o país mudou, aplicar defaults do país para campos não definidos manualmente
      if (patch.country && patch.country !== prefs.country) {
        const defs = getCountryDefaults(patch.country);
        if (!patch.currency) next.currency = defs.currency;
        if (!patch.timezone) next.timezone = defs.timezone;
        if (!patch.date_format) next.date_format = defs.date_format;
        if (!patch.time_format) next.time_format = defs.time_format;
      }
      setPrefs(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from("profiles").update(next).eq("id", userData.user.id);
      }
      return next;
    },
    [prefs],
  );

  return { prefs, loading, update };
}
