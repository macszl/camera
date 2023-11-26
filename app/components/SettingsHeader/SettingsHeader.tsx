import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome

import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../SettingsContextProvider/SettingsContextProvider';
import LanguageMenu from '../LanguageMenu/LanguageMenu';
import {useStyles} from './SettingsHeader.styles';

export function SettingsHeader() {
  const styles = useStyles();
  const {t} = useTranslation();
  const context = useContext(SettingsContext);
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);

  if (!context) {
    throw new Error('Something went wrong with SettingsContext');
  }

  const handleLanguageChange = (lang: string) => {
    context.setLanguage(lang);
    setIsLanguageMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('settingsHeader.settings')}</Text>
      <TouchableOpacity
        style={styles.iconContainer}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        onPress={() => {
          return setIsLanguageMenuVisible(!isLanguageMenuVisible);
        }}>
        <Icon name="language" size={styles.text.fontSize} color="#000" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageMenuVisible}
        onRequestClose={() => {
          setIsLanguageMenuVisible(!isLanguageMenuVisible);
        }}>
        <View style={styles.modalView}>
          <LanguageMenu onLanguageChange={handleLanguageChange} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              return setIsLanguageMenuVisible(false);
            }}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
