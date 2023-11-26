import {createContext, useEffect, useState} from 'react';
import {
  SettingsContextProps,
  SettingsContextProviderProps,
} from './SettingsContextProvider.types';
import {useTranslation} from 'react-i18next';
import {MMKV} from 'react-native-mmkv';

export const SettingsContext = createContext<SettingsContextProps | null>(null);

export const appStorage = new MMKV({
  id: 'my-app-storage',
});

export function SettingsContextProvider({
  children,
}: SettingsContextProviderProps) {
  const [language, setLanguage] = useState(
    appStorage.getString('language') || 'eng',
  ); // Load language from storage
  const {i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    appStorage.set('language', language); // Save language in MMKV
  }, [language, i18n]);

  const value = {
    language,
    setLanguage, // function to change language
  } as SettingsContextProps;

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
