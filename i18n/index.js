import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Localization from "expo-localization";

import ka from "../locales/ka/ka.json";
import en from "../locales/en/en.json";

const LANGUAGE_KEY = "app_language";

export const getStoredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    if (savedLanguage) return savedLanguage;

    const deviceLang = Localization.getLocales()[0].languageCode;

    return ["en", "ka"].includes(deviceLang) ? deviceLang : "en";
  } catch (error) {
    console.error("Error getting language:", error);
    return "en";
  }
};

export const saveLanguage = async (language) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    i18n.changeLanguage(language);
  } catch (error) {
    console.error("Error saving language:", error);
  }
};

const initI18n = async () => {
  const language = await getStoredLanguage();

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en: { translation: en },
      ka: { translation: ka },
    },
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

initI18n();

export default i18n;
