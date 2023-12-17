import React, {useCallback, useState} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import axios from 'axios';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useTranslation} from 'react-i18next';
import {useStyles} from '../WelcomeScreenContent/WelcomeScreenContent.styles';
import {QueryStackNavigationProp} from '../../types/navigation.types';
import {useNavigation} from '@react-navigation/native';
import mime from 'mime';

export function QueryScreenContent() {
  const [selectedPickerResponse, setSelectedPickerResponse] =
    useState<DocumentPickerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const styles = useStyles();
  const {t} = useTranslation('components');
  const navigation = useNavigation<QueryStackNavigationProp>();

  const sendPhoto = async () => {
    if (
      !selectedPickerResponse ||
      selectedPickerResponse.fileCopyUri === null ||
      selectedPickerResponse.fileCopyUri === undefined
    ) {
      throw new Error('No file selected');
    }

    const formData = new FormData();
    const photoUri =
      Platform.OS === 'android'
        ? `${selectedPickerResponse?.fileCopyUri}`
        : selectedPickerResponse?.fileCopyUri?.replace('file://', '');

    const formDataType = mime.getType(photoUri) || 'image/jpeg';
    console.log('SelectedPickerResponse: ', selectedPickerResponse);
    console.log(photoUri);

    formData.append('photos', {
      uri: photoUri,
      name: 'image.jpg',
      type: formDataType,
    });

    console.log('FormData: ', formData);
    const url = 'https://foodbackend-gno3.onrender.com/api/recognize';

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Photo classification response:', response);
      return response;
    } catch (err) {
      console.error('Error sending photo to API:', err);
      if (axios.isAxiosError(err)) {
        console.error('AxiosError Details:');
        console.error('Message:', err.message);
        console.error('Code:', err.code);
        console.error('Config:', err.config);
        console.error('Request:', err.request);
        console.error('Response:', err.response);
        console.error('Is Axios Error:', err.isAxiosError);
        console.error('Status:', err.status);
        console.error('To JSON:', err.toJSON());
        console.error('Cause:', err.cause);
      }
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

  const pickDocument = useCallback(() => {
    DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      type: [DocumentPicker.types.images],
      copyTo: 'documentDirectory',
    })
      .then(result => {
        console.log('Picked document:', result);
        if (result.length === 1) {
          setSelectedPickerResponse(result[0]);
        } else {
          throw new Error('The result is not a single file.');
        }
      })
      .catch(err => {
        if (DocumentPicker.isCancel(err)) {
          setError(null);
        } else {
          console.error('Error picking document:', err);
          setError('Error picking document');
        }
      });
  }, []);

  const openCamera = () => {
    navigation.navigate('Camera');
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
          console.log('Picking a file');
          return pickDocument();
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
    </View>
  );
}
