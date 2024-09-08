import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios, {CancelTokenSource} from 'axios';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useTranslation} from 'react-i18next';
import {useStyles} from '../WelcomeScreenContent/WelcomeScreenContent.styles';
import {QueryStackNavigationProp} from '../../types/navigation.types';
import {useNavigation} from '@react-navigation/native';
import mime from 'mime';
import {ClassificationResult} from '../../types/classifiedCategory.types';
import {SettingsContext} from '../SettingsContextProvider/SettingsContextProvider';

export function QueryScreenContent() {
  const [selectedPickerResponse, setSelectedPickerResponse] =
    useState<DocumentPickerResponse | null>(null);
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation('components');
  const navigation = useNavigation<QueryStackNavigationProp>();
  const debugMode = false;
  const classificationContext = useContext(SettingsContext);

  const cancelTokenRef = useRef<CancelTokenSource | null>(null); // Use useRef for the cancel token

  if (!classificationContext) {
    throw new Error('Something went wrong with SettingsContext');
  }

  const {addClassification} = classificationContext;

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
    const url =
      'http://food-backend-macszl.francecentral.azurecontainer.io/api/recognize';

    try {
      setLoading(true);

      cancelTokenRef.current = axios.CancelToken.source(); // Initialize the cancel token

      const response = await axios.post<ClassificationResult>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        cancelToken: cancelTokenRef.current.token,
      });

      if (response.data.classifiedCategory) {
        const classifiedCategory = response.data.classifiedCategory;
        addClassification({
          image: photoUri,
          result: classifiedCategory,
        });

        const dataResult = response.data.classifiedCategory;
        Alert.alert('Success', `Classification result: ${dataResult}`);
      }

      return response.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message); // Handle request cancellation
      } else {
        if (debugMode) {
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
        }
        Alert.alert('Error', 'Error sending photo to API');
      }
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  };

  const validate = () => {
    if (!selectedPickerResponse) {
      Alert.alert('Error', 'Please select a file');
      return false;
    }

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
        if (!DocumentPicker.isCancel(err)) {
          if (debugMode) {
            console.error('Error picking document:', err);
          }
          Alert.alert('Error', 'Error picking document');
        }
      });
  }, []);

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  const closeModal = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('User closed the modal, request canceled'); // Cancel the request
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (validate()) {
      sendPhoto().catch(err => {
        if (debugMode) {
          console.error('Error sending photo to API:', err);
        }
        Alert.alert('Error', 'Error sending photo to API');
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

      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#00FF00" />
          <Text style={styles.spinnerText}>Loading...</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
