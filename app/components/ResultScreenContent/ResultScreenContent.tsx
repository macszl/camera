import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useStyles} from '../../components/Common/Common.styles';
import {
  SettingsContext,
  appStorage,
} from '../SettingsContextProvider/SettingsContextProvider'; // Import SettingsContext
import {useTranslation} from 'react-i18next';
import {ResultStackNavigationProp} from '../../types/navigation.types';
import {Button} from '@rneui/themed';

export function ResultScreenContent() {
  const styles = useStyles();
  const navigation = useNavigation<ResultStackNavigationProp>();
  const {t} = useTranslation();
  const settingsContext = useContext(SettingsContext);
  const [classifications, setClassifications] = useState([]);

  useEffect(() => {
    // Load classifications from MMKV storage
    const storedClassifications = appStorage.getString('classifications');
    if (storedClassifications) {
      setClassifications(JSON.parse(storedClassifications));
    }
  }, []);

  return (
    <View style={styles.historyScreenContainerStyle}>
      <Text style={styles.historyScreenWelcomeMessageStyle}>{t('welcome_message')}</Text>
      <Button
        title={t('navigate_to_main_menu')}
        onPress={() => navigation.navigate('MainMenu')}
        style={styles.buttonStyle}
      />
      <FlatList
        data={classifications}
        renderItem={({item}) => (
          <View style={styles.historyListItemStyle}>
            <Text style={styles.historyListItemTextStyle}>{item.result}</Text>{' '}
            {/* Example property */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
