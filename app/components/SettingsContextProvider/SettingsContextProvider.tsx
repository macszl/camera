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
  console.log('Getting initial classifications');
  const externalDir = `${RNFS.ExternalStorageDirectoryPath}/FoodDetect`;

  console.log('Checking if external dir exists');
  const folderExists = await RNFS.exists(externalDir);
  if (!folderExists) {
    console.log('External dir does not exist, making one');
    await RNFS.mkdir(externalDir);
    console.log('Made external dir');
  } else {
    console.log('External dir does exist, skipping creation');
  }

  console.log('Returning initial classifications');
  return [];
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
    console.log('Requesting app permissions');
    try {
      const permissions = [
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO, ---- those permissions should be requested for android 13+ versions
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, ---- those permissions should be requested for android 13+ versions
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ];

      for (const permission of permissions) {
        console.log(`Checkign permissions for: ${permission}`);
        const currentStatus = await PermissionsAndroid.check(permission);
        if (currentStatus) {
          console.log(`Permission already granted: ${permission}`);
          continue;
        }

        console.log(`Requesting permission for ${permission}`);
        const granted = await PermissionsAndroid.request(permission);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`Permission denied: ${permission}`);
        } else {
          console.log(`Permission approved: ${permission}`);
        }
      }
    } catch (err) {
      console.warn('Error requesting permissions', err);
    }
    console.log('Finished requesting app permissions');
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
        console.log('Awaiting for requestAppPermissions');
        await requestAppPermissions();
        console.log('Await requestAppPermissions finished');
        // Synchronize language changes with i18n and storage
        console.log('Awaiting changing language with i18n');
        await i18n.changeLanguage(language);
        console.log('Await changing language with i18n finished');

        console.log('Setting appStorage');
        appStorage.set('language', language);
        console.log('Setting appStorage finished');

        // Fetch initial classifications
        console.log('Awaiting getting inital classifications');
        const initialClassifications = await getInitialClassifications();
        console.log('Await getting inital classifications finished');

        console.log('Setting inital classifications');
        setClassifications(initialClassifications);
        console.log('Setting inital classifications finished');
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
        console.log(`Awaiting Camera Permission Status`);
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
