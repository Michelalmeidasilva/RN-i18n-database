import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

import { TerminologiesDAO } from "../database/daos/terminologies-dao";
import { getLanguage, setLanguage } from "../utils";
import pt from "./translations/pt.json";

const i18nextConfig = {
  lng: "en",
  resources: { pt: pt },
  debug: true,
  fallbackLng: "en",
  react: {
    bindI18nStore: "added",
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback: any) => {
    const storedLanguage = await getLanguage();
    if (storedLanguage) {
      return callback(storedLanguage);
    }

    let phoneLanguage = null;
    if (Platform.OS === "android") {
      phoneLanguage = NativeModules.I18nManager.localeIdentifier;
    } else {
      phoneLanguage = NativeModules.SettingsManager.settings.AppleLocale;
    }

    phoneLanguage = phoneLanguage?.replace("_", "-");

    return callback(phoneLanguage);
  },
  init: () => {},
  cacheUserLanguage: (language: string) => setLanguage(language),
};

i18n.use(languageDetector).use(initReactI18next).init(i18nextConfig);

export default i18n;
