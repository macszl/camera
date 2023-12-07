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
import * as cameraPl from './pl/camera.json';
import * as cameraEn from './en/camera.json';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const resources = {
  en: {
    components: {
      mainMenu: mainMenuEn,
      query: queryEn,
      result: resultEn,
      welcome: welcomeEn,
      settingsHeader: settingsHeaderEn,
      camera: cameraEn,
    },
  },
  pl: {
    components: {
      mainMenu: mainMenuPl,
      query: queryPl,
      result: resultPl,
      welcome: welcomePl,
      settingsHeader: settingsHeaderPl,
      camera: cameraPl,
    },
  },
};
export const defaultNS = 'components';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    defaultNS: defaultNS,
    resources: resources,
    lng: 'en', // default language to use.
    fallbackLng: 'en',
    interpolation: {
      escapeValue: true,
    },
  })
  .catch(error => {
    console.error('Unhandled error in i18n:', error);
  });

export default i18n;
