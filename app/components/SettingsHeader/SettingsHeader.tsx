import React, {useState, useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../SettingsContextProvider/SettingsContextProvider';
import LanguageMenu from '../LanguageMenu/LanguageMenu'; // Import your language menu component
import {useStyles} from './SettingsHeader.styles';

export function SettingsHeader() {
  const styles = useStyles();
  const {t} = useTranslation();
  const context = useContext(SettingsContext);
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);

  if (!context) {
    throw new Error('Something went wrong with AuthenticationModalContext');
  }

  const handleLanguageChange = (lang: string) => {
    context.setLanguage(lang);
    setIsLanguageMenuVisible(false); // Close menu after selection
  };

  return (
    <View>
      <Text style={styles.text}>{t('settings')}</Text>
      <TouchableOpacity
        onPress={() => setIsLanguageMenuVisible(!isLanguageMenuVisible)}>
        <Text>{t('change_language')}</Text>
      </TouchableOpacity>
      {isLanguageMenuVisible && (
        <LanguageMenu onLanguageChange={handleLanguageChange} />
      )}
    </View>
  );
}
