import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {WelcomeStackNavigationProp} from '../../types/navigation.types';
import {useStyles} from './WelcomeScreenContent.styles';

export function WelcomeScreenContent() {
  const {t} = useTranslation();
  const navigation = useNavigation<WelcomeStackNavigationProp>();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.heading}>{t('welcome.welcomeMessageHeading')}</Text>
        <Text style={styles.description}>
          {t('welcome.welcomeMessageDescription')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => {
          return navigation.navigate('MainMenu');
        }}>
        <Text style={styles.buttonText}>{t('welcome.continueButton')}</Text>
      </TouchableOpacity>
    </View>
  );
}
