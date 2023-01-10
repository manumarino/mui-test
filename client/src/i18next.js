
import i18next from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from "./lang/en.json";
import translationES from "./lang/es.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

//i18N Initialization

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng:"es", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });



export default i18next;