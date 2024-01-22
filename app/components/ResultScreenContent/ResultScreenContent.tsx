import React, {useContext} from 'react';
import {View, Text, FlatList, Image, Platform} from 'react-native';
import {useStyles} from '../../components/WelcomeScreenContent/WelcomeScreenContent.styles';
import {SettingsContext} from '../SettingsContextProvider/SettingsContextProvider';
import {useTranslation} from 'react-i18next';

export function ResultScreenContent() {
  const styles = useStyles();
  const {t} = useTranslation();
  const settingsContext = useContext(SettingsContext);
  //Load classifications from the settingsContext
  if (settingsContext === null) {
    throw new Error('Something went wrong with SettingsContext');
  }

  const {classifications} = settingsContext;

  const reversedClassifications = [...classifications].reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('result.resultWelcomeMessage')}</Text>
      <FlatList
        data={reversedClassifications}
        renderItem={({item}) => {
          return (
            <View style={styles.historyListItemStyle}>
              <Image
                source={{
                  uri: `${Platform.OS === 'android' ? 'file://' : ''}${
                    item.image
                  }`,
                }}
                style={{width: '30%', height: 100, resizeMode: 'contain'}}
              />
              <View style={{width: '20%'}} />
              <View
                style={{
                  width: '50%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.historyListItemTextStyle,
                    {fontWeight: 'bold'},
                  ]}>
                  {t('result.classificationResult')}:
                </Text>
                <Text style={styles.historyListItemTextStyle}>
                  {item.result}
                </Text>

                <Text
                  style={[
                    styles.historyListItemTextStyle,
                    {fontWeight: 'bold'},
                  ]}>
                  {t('result.filename')}:
                </Text>

                <Text style={styles.historyListItemTextStyle}>
                  {item.image.split('/').pop()}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </View>
  );
}
