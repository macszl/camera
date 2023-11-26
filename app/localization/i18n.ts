import * as mainMenuEn from './en/mainmenu.json';
import * as mainMenuPl from './pl/mainmenu.json';
import * as queryPl from './pl/query.json';
import * as queryEn from './en/query.json';
import * as resultEn from './en/result.json';
import * as resultPl from './pl/result.json';
import * as welcomePl from './pl/welcome.json';
import * as welcomeEn from './en/welcome.json';
import * as settingsHeaderPl from './pl/settingsHeader.json';
import * as settingsHeaderEn from './en/settingsHeader.json';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    components: {
      mainMenu: mainMenuEn,
      query: queryEn,
      result: resultEn,
      welcome: welcomeEn,
      settingsHeader: settingsHeaderEn,
    },
  },
  pl: {
    components: {
      mainMenu: mainMenuPl,
      query: queryPl,
      result: resultPl,
      welcome: welcomePl,
      settingsHeader: settingsHeaderPl,
    },
  },
};
void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
  defaultNS: 'components',
  resources: resources,
  lng: 'en', // default language to use.
  fallbackLng: 'en',
  interpolation: {
    escapeValue: true,
  },
});

export default i18n;
