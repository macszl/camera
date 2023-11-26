import React, {createContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MMKV} from 'react-native-mmkv';
import RNFS from 'react-native-fs';
import {
  Classification,
  ClassificationList,
  SettingsContextProps,
  SettingsContextProviderProps,
} from './SettingsContextProvider.types';

export const SettingsContext = createContext<SettingsContextProps | null>(null);

export const defaultLanguage = 'eng';
export const appStorage = new MMKV({id: 'my-app-storage'});

const getInitialClassifications = async (): Promise<ClassificationList> => {
  const externalDir = `${RNFS.ExternalStorageDirectoryPath}/FoodDetect`;

  const folderExists = await RNFS.exists(externalDir);
  if (!folderExists) {
    await RNFS.mkdir(externalDir);
  }

  return [
    {image: `${externalDir}/image1.jpeg`, result: 'Egg'},
    {image: `${externalDir}/image2.jpg`, result: 'Rice'},
    {image: `${externalDir}/image3.jpg`, result: 'Egg'},
  ];
};

export function SettingsContextProvider({
  children,
}: SettingsContextProviderProps) {
  const [language, setLanguage] = useState<string>(
    appStorage.getString('language') || defaultLanguage,
  );
  const [classifications, setClassifications] = useState<ClassificationList>(
    [],
  );
  const {i18n} = useTranslation();

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        // Synchronize language changes with i18n and storage
        await i18n.changeLanguage(language);
        appStorage.set('language', language);

        // Fetch initial classifications
        const initialClassifications = await getInitialClassifications();
        setClassifications(initialClassifications);
      } catch (error) {
        console.error('Error initializing settings:', error);
      }
    };

    void initializeSettings();
  }, [language, i18n]);

  const addClassification = (newClassification: Classification) => {
    const updatedClassifications = [...classifications, newClassification];
    setClassifications(updatedClassifications);
    appStorage.set('classifications', JSON.stringify(updatedClassifications));
  };

  const clearClassifications = () => {
    setClassifications([]);
    appStorage.delete('classifications');
  };

  const value = {
    language,
    setLanguage,
    classifications,
    addClassification,
    clearClassifications,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
