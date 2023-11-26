import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import axios from 'axios';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
  useCameraDevice,
} from 'react-native-vision-camera';
import {useTranslation} from 'react-i18next';

export function QueryScreenContent() {
  const [selectedPickerResponse, setSelectedPickerResponse] =
    useState<DocumentPickerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    void (async () => {
      const newCameraPermission: CameraPermissionStatus =
        await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    })();
  }, []);

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
    <View>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <Button title="Select file" onPress={pickDocument} />
      <Button title="Open camera" onPress={openCamera} />
      {selectedPickerResponse && (
        <Text>Selected File: {selectedPickerResponse.name}</Text>
      )}
      <Button
        disabled={!selectedPickerResponse}
        onPress={handleSubmit}
        title="Wyślij zdjęcie"
      />
      {error && <Text>Error: {error}</Text>}
      {showCamera && device && (
        <Camera
          ref={camera}
          style={{flex: 1}}
          device={device}
          isActive={showCamera}
        />
      )}
    </View>
  );
}
