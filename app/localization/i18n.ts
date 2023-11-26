import * as mainMenuEn from './en/mainmenu.json';
import * as mainMenuPl from './pl/mainmenu.json';
import * as queryPl from './pl/query.json';
import * as queryEn from './en/query.json';
import * as resultEn from './en/result.json';
import * as resultPl from './pl/result.json';
import * as welcomePl from './pl/welcome.json';
import * as welcomeEn from './en/welcome.json';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    components: {
      mainMenu: mainMenuEn,
      query: queryEn,
      result: resultEn,
      welcome: welcomeEn,
    },
  },
  pl: {
    components: {
      mainMenu: mainMenuPl,
      query: queryPl,
      result: resultPl,
      welcome: welcomePl,
    },
  },
};
void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
  resources: resources,
  lng: 'en', // default language to use.
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
