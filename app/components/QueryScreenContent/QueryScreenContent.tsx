import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import axios from 'axios';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
} from 'react-native-vision-camera';
import {useTranslation} from 'react-i18next';
import {useStyles} from '../WelcomeScreenContent/WelcomeScreenContent.styles';

export function QueryScreenContent() {
  const [selectedPickerResponse, setSelectedPickerResponse] =
    useState<DocumentPickerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const styles = useStyles();

  const [showCamera, setShowCamera] = useState(false);
  const {t} = useTranslation('components');

  // useEffect(() => {
  //   const requestCameraPermission = async () => {
  //     try {
  //       const newCameraPermission = await Camera.requestCameraPermission();
  //       console.log(newCameraPermission);
  //     } catch (e) {
  //       console.error('Error requesting camera permission:', e);
  //     }
  //   };

  //   requestCameraPermission().catch(e => {
  //     console.error('Error in requestCameraPermission:', e);
  //   });
  // }, []);

  const sendPhoto = async () => {
    if (!selectedPickerResponse) {
      throw new Error('No file selected');
    }
    const formData = new FormData();
    const photoUri =
      Platform.OS === 'android'
        ? selectedPickerResponse.uri
        : selectedPickerResponse.uri.replace('file://', '');

    formData.append('image', {
      uri: photoUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(
        'http://localhost:8080/api/recognize',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      console.log('Photo classification response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error sending photo to API:', err);
      setError('Error sending photo to API');
    }
  };

  const validate = () => {
    if (!selectedPickerResponse) {
      setError('Please select a file');
      return false;
    }

    setError(null);
    return true;
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      if (result.length === 1) {
        setSelectedPickerResponse(result[0]);
      } else {
        throw new Error('The result is not a single file.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setError(null);
      } else {
        console.error('Error picking document:', err);
        setError('Error picking document');
      }
    }
  };

  const openCamera = () => {
    setShowCamera(true);
  };

  const handleSubmit = () => {
    if (validate()) {
      sendPhoto().catch(err => {
        console.error('Error sending photo to API:', err);
        setError('Error sending photo to API');
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {
          return pickDocument;
        }}>
        <Text style={styles.buttonText}> {t('query.selectFileButton')} </Text>
      </TouchableOpacity>
      <View style={{width: '100%', height: '10%'}}></View>
      <TouchableOpacity style={styles.touchableButton} onPress={openCamera}>
        <Text style={styles.buttonText}>{t('query.openCameraButton')}</Text>
      </TouchableOpacity>
      <View style={{width: '100%', height: '10%'}}></View>
      {selectedPickerResponse && selectedPickerResponse.name && (
        <Text>
          {`${t('query.selectedFileLabel')}: ${selectedPickerResponse.name}`}
        </Text>
      )}
      <TouchableOpacity
        disabled={!selectedPickerResponse}
        style={
          !selectedPickerResponse
            ? styles.disabledButton
            : styles.touchableButton
        }
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t('query.sendFileButton')}</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
      {showCamera && device && (
        <Camera ref={camera} device={device} isActive={showCamera} />
      )}
    </View>
  );
}
