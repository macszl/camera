import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStyles} from '../../components/WelcomeScreenContent/WelcomeScreenContent.styles';
import {useTranslation} from 'react-i18next';
import {MainMenuStackNavigationProp} from '../../types/navigation.types';
import {TouchableOpacity} from 'react-native';

export function MainMenuScreenContent() {
  const navigation = useNavigation<MainMenuStackNavigationProp>();
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {/* Use styles for the buttons */}
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {
          return navigation.navigate('Result');
        }}>
        <Text style={styles.buttonText}>{t('mainMenu.resultButton')}</Text>
      </TouchableOpacity>
      <View style={{width: '100%', height: '10%'}}></View>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {
          return navigation.navigate('Query');
        }}>
        <Text style={styles.buttonText}>{t('mainMenu.queryButton')}</Text>
      </TouchableOpacity>
    </View>
  );
}
