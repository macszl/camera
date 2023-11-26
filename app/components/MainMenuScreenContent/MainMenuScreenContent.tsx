import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStyles} from '../../components/Common/Common.styles';
import {useTheme} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {MainMenuStackNavigationProp} from '../../types/navigation.types';
import {CustomButton} from '../CustomButton/CustomButton';

export function MainMenuScreenContent() {
  const navigation = useNavigation<MainMenuStackNavigationProp>();
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <View style={styles.homeScreenContainerStyle}>
      {/* Use styles for the buttons */}
      <CustomButton
        title={t('mainMenu.resultButton')} // Assuming you use t function for translations
        onPress={() => {
          return navigation.navigate('Result');
        }}
      />
      <CustomButton
        title={t('mainMenu.queryButton')} // Translation function for the button title
        onPress={() => {
          return navigation.navigate('Query');
        }}
      />
    </View>
  );
}
