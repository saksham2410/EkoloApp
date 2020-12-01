import * as React from 'react';
import LocalizedStrings from 'react-native-localization';
export const translations = new LocalizedStrings({
  'en-US': {
    tagline: 'Appointments made easy',
  },
  'en-IN': {
    tagline: 'Appointments made easy',
  },
  en: {
    tagline: 'Appointments made easy',
  },
  hi: {
    tagline: 'नियुक्तियों को आसान बनाया',
  },
  mr: {
    tagline: 'नेमणुका सुलभ केल्या',
  },
});
export const setLocale = (locale) => {
const prevTranslations = { ...translations.getContent() };
const newTranslations = {};
Object.keys(locale).forEach((langCode) => {
  newTranslations[langCode] = {
      ...(prevTranslations && Object.keys(prevTranslations)
        ? prevTranslations[langCode]
        : {}),
      ...locale[langCode],
    };
  });
  translations.setContent(newTranslations);
};
export const TranslationContext = React.createContext(translations);