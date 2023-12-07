import React, {useContext, useRef} from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../SettingsContextProvider/SettingsContextProvider';
import {useStyles} from '../WelcomeScreenContent/WelcomeScreenContent.styles';

export function CameraScreenContent() {
  const styles = useStyles();
  const {t} = useTranslation();
  const settingsContext = useContext(SettingsContext);
  //Load classifications from the settingsContext
  if (settingsContext === null) {
    console.log('SettingsContext in CameraScreenContent not loading');
    throw new Error('Something went wrong with SettingsContext');
  }

  // const cameraRef = useRef<Camera>(null);
  // const devices = useCameraDevices();
  // const device = devices[0]; // Using the first available device

  const savePhoto = async (uri: string) => {
    console.log('save photo button pressed');
    // try {
    //   await CameraRoll.save(uri, {type: 'photo'});
    //   Alert.alert('Photo saved', 'Photo has been saved to your camera roll.');
    // } catch (error) {
    //   console.error('Error saving photo:', error);
    //   Alert.alert('Error', 'Failed to save photo.');
    // }
    console.log('save photo button press went through');
  };

  const takePhoto = async () => {
    console.log('take photo button pressed');
    // if (cameraRef.current && device) {
    //   try {
    //     const photo = await cameraRef.current.takePhoto({
    //       flash: 'on',
    //     });
    //     await savePhoto(photo.uri);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    console.log('take photo button press went through');
  };

  // if (!device) {
  //   return <Text>Loading Camera...</Text>;
  // }

  return (
    <View style={styles.container}>
      {/* <Camera
        ref={cameraRef}
        style={{width: '80%'}}
        device={device}
        isActive={true}
      /> */}
      <TouchableOpacity style={styles.touchableButton} onPress={takePhoto}>
        <Text style={styles.buttonText}> {t('camera.takePhotoButton')} </Text>
      </TouchableOpacity>
    </View>
  );
}
