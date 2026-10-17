import i18n from "./i18n";

// Mapeia o idioma do sistema para o código de localização correto do navegador
const getLocale = () => {
  const lang = i18n.language;
  if (lang === "pt") return "pt-BR"; // ou pt-PT dependendo do seu público maior
  if (lang === "en") return "en-US";
  if (lang === "es") return "es-ES";
  return "pt-BR";
};

export function formatCurrency(amount: number, currency: 'BRL' | 'EUR' | 'USD' = 'BRL') {
  return new Intl.NumberFormat(getLocale(), {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date, showTime: boolean = false) {
  const d = new Date(date);
  
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(showTime && { hour: "2-digit", minute: "2-digit" })
  };

  return new Intl.DateTimeFormat(getLocale(), options).format(d);
}