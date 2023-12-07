import React, {createContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MMKV} from 'react-native-mmkv';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import {
  Classification,
  ClassificationList,
  SettingsContextProps,
  SettingsContextProviderProps,
} from './SettingsContextProvider.types';
import {Camera} from 'react-native-vision-camera';

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

  const requestAppPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.INTERNET,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ];

      for (const permission of permissions) {
        const granted = await PermissionsAndroid.request(permission);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`Permission denied: ${permission}`);
        }
      }
    } catch (err) {
      console.warn('Error requesting permissions', err);
    }
  };

  const addClassification = (newClassification: Classification) => {
    const updatedClassifications = [...classifications, newClassification];
    setClassifications(updatedClassifications);
    appStorage.set('classifications', JSON.stringify(updatedClassifications));
  };

  const clearClassifications = () => {
    setClassifications([]);
    appStorage.delete('classifications');
  };

  useEffect(() => {
    console.log('Initializing settings useEffect triggered');
    const initializeSettings = async () => {
      try {
        // Request app permissions
        await requestAppPermissions();

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

    initializeSettings().catch(error => {
      console.error('Unhandled error in initializeSettings:', error);
    });
    console.log('Initializing settings useEffect ended');
  }, [language, i18n]);

  useEffect(() => {
    console.log('Requesting camera permission useEffect triggered');
    const requestCameraPermission = async () => {
      try {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log(`Camera Permission Status: ${newCameraPermission}`);
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };

    requestCameraPermission().catch(error => {
      console.error('Unhandled error in requestCameraPermission:', error);
    });
    console.log('Camera permission useEffect ended');
  }, []);

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
