import React from 'react';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useStyles} from '../../components/Common/Common.styles'; // Importing the useStyles
import {useTheme} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {Button} from '@rneui/themed';
import { MainMenuStackNavigationProp } from '../../types/navigation.types';

export function MainMenuScreenContent() {
  const navigation = useNavigation<MainMenuStackNavigationProp>(); // Use navigation hook
  const styles = useStyles(); // Use styles from useStyles
  const {theme} = useTheme();
  const {t} = useTranslation(); // Assuming you are using i18next for translations

  return (
    <View style={styles.homeScreenContainerStyle}>
      {/* Use styles for the buttons */}
      <Button
        title={t('navigate_to_result')} // Assuming you use t function for translations
        onPress={() => navigation.navigate('Result')}
        style={styles.buttonStyle}
      />
      <Button
        title={t('navigate_to_query')} // Translation function for the button title
        onPress={() => navigation.navigate('Query')}
        style={styles.buttonStyle}
      />
    </View>
  );
}
