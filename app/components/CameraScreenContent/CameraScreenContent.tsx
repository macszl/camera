import React, {useCallback, useContext, useRef, useState} from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {
  useCameraDevices,
  Camera,
  CameraRuntimeError,
  PhotoFile,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../SettingsContextProvider/SettingsContextProvider';
import {useStyles} from '../WelcomeScreenContent/WelcomeScreenContent.styles';

export function CameraScreenContent() {
  const styles = useStyles();
  const {t} = useTranslation();
  const settingsContext = useContext(SettingsContext);
  const [initialising, setInitialising] = useState<boolean>(true);
  const debugMode = false;

  //Load classifications from the settingsContext
  if (settingsContext === null) {
    console.log('SettingsContext in CameraScreenContent not loading');
    throw new Error('Something went wrong with SettingsContext');
  }

  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices[0]; // Using the first available device

  const savePhoto = async (uri: string) => {
    console.log('save photo button pressed');
    console.log('uri: ', uri);
    try {
      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert('Photo saved', 'Photo has been saved to your camera roll.');
    } catch (error) {
      if (debugMode) {
        console.error('Error saving photo:', error);
      }
      Alert.alert('Error', 'Failed to save photo.');
    }
    console.log('save photo button press went through');
  };

  const takePhoto = useCallback(() => {
    console.log('Taking photo');
    if (cameraRef.current) {
      console.log('Camera ref has current');
      if (!initialising) {
        console.log('Camera is initialised');
        cameraRef?.current
          ?.takePhoto({
            flash: 'on',
            enableAutoStabilization: true,
          })
          .then(async (file: PhotoFile) => {
            console.log('taken photo');
            console.log('file ', file);
            const uri = `file://${file.path}`;
            await savePhoto(uri);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        Alert.alert(
          'Camera Error',
          'Camera not initialised. Please try again.',
          [
            {
              text: 'Close',
              onPress: () => {
                return console.log('Cancel Pressed');
              },
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    } else {
      Alert.alert(
        'Camera Error',
        'Camera reference pending. Please try again.',
        [
          {
            text: 'Close',
            onPress: () => {
              return console.log('Cancel Pressed');
            },
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }, [initialising]);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.log('Camera error!');
    if (debugMode) {
      console.error(error);
    }
  }, []);

  const onCameraInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setInitialising(false);
  }, []);

  if (!device) {
    return <Text>Loading Camera...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '5%'}}></View>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        onError={onError}
        onInitialized={onCameraInitialized}
      />
      <View style={{width: '100%', height: '5%'}}></View>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {
          takePhoto();
        }}>
        <Text style={styles.buttonText}> {t('camera.takePhotoButton')} </Text>
      </TouchableOpacity>
      <View style={{width: '100%', height: '5%'}}></View>
    </View>
  );
}
