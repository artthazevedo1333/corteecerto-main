import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

export const SUPPORTED_LANGUAGES = ["pt", "en", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "pt";

function readStoredLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const raw = window.localStorage.getItem("app_language");
    const normalized = raw?.slice(0, 2).toLowerCase();
    if (normalized && (SUPPORTED_LANGUAGES as readonly string[]).includes(normalized)) {
      return normalized as SupportedLanguage;
    }
  } catch {
    /* noop */
  }
  return DEFAULT_LANGUAGE;
}

if (!i18n.isInitialized) {
  // Inicialização SÍNCRONA — sem LanguageDetector, sem Suspense.
  // O hook useLocale ajusta o idioma depois com base em perfil/navegador.
  i18n.use(initReactI18next).init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    lng: readStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false,
    react: {
      useSuspense: false,
    },
  });
}

export function setLanguage(lang: string) {
  const normalized = lang?.slice(0, 2).toLowerCase();
  const target = (SUPPORTED_LANGUAGES as readonly string[]).includes(normalized)
    ? (normalized as SupportedLanguage)
    : DEFAULT_LANGUAGE;
  if (i18n.language !== target) {
    i18n.changeLanguage(target);
  }
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("app_language", target);
    }
  } catch {
    /* noop */
  }
}

export function normalizeI18nKey(key: string) {
  return key
    .split(".")
    .map((part) => part.toLowerCase())
    .join(".");
}

export function translateKey(
  t: (key: string, options?: Record<string, unknown>) => unknown,
  key: string,
  options?: Record<string, unknown>,
) {
  const normalized = normalizeI18nKey(key);
  const translated = t(normalized, options);

  if (
    typeof translated === "string" &&
    translated.trim() &&
    translated !== normalized &&
    translated !== key
  ) {
    return translated;
  }

  if (normalized !== key) {
    const fallback = t(key, options);
    if (typeof fallback === "string" && fallback.trim() && fallback !== key) {
      return fallback;
    }
  }

  return "";
}

export default i18n;
