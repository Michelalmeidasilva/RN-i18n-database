import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";
import { getLanguage, setLanguage } from "../utils";

import pt from "./translations/pt.json";

const supportedLanguages = ["en", "pt", "es"];

const defaultLang = "pt";

const i18nextConfig = {
  resources: {
    pt,
  },
  fallbackLng: "pt",
  react: {
    bindI18nStore: "added",
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use({
    type: "languageDetector",
    async: true,
    cacheUserLanguage: () => {},
    detect: async (callback) => {
      const storedLanguage = await getLanguage();

      if (storedLanguage) {
        return callback(storedLanguage);
      }

      const locale =
        Platform.OS === "ios"
          ? NativeModules.SettingsManager?.settings?.AppleLocale ||
            NativeModules.SettingsManager?.settings?.AppleLanguages[0] ||
            ""
          : NativeModules.I18nManager?.localeIdentifier || "";

      const [lowerCaseLocale] = locale.split("_");

      if (supportedLanguages.includes(lowerCaseLocale)) {
        setLanguage(lowerCaseLocale);
        callback(lowerCaseLocale);
      }

      console.warn(
        `locale ${lowerCaseLocale} from ${locale} is not supported, defaulting to ${defaultLang}`
      );
      return defaultLang;
    },
    init: () => {},
  })
  .use(initReactI18next)
  .init(i18nextConfig);

console.log(JSON.stringify(i18n, null, 4));

export default i18n;
