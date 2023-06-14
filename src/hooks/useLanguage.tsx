import { useRouter } from "next/router";
import en from "../locales/en.json"
import ar from "../locales/ar.json";

export const useLanguage = () => {
  const { locale } = useRouter();
  const t = locale === "ae-en" || locale === "sa-en"  ? en : ar;
  return { t, locale };
};