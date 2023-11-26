import React, {useContext} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
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

  return (
    <View style={styles.historyScreenContainerStyle}>
      <Text style={styles.historyScreenWelcomeMessageStyle}>
        {t('result.resultWelcomeMessage')}
      </Text>
      <FlatList
        data={classifications}
        renderItem={({item}) => {
          return (
            <View
              style={[
                styles.historyListItemStyle,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Image
                source={{uri: item.image}}
                style={{width: '30%', height: 100, resizeMode: 'contain'}}
              />
              <View style={{width: '5%'}} /> {/* Divider */}
              <View style={{width: '65%'}}>
                <Text
                  style={[
                    styles.historyListItemTextStyle,
                    {fontWeight: 'bold'},
                  ]}>
                  {t('result.classificationResult')}
                </Text>
                <Text style={styles.historyListItemTextStyle}>
                  {item.result}
                </Text>
                <Text style={styles.historyListItemTextStyle}>
                  {item.image.split('/').pop()}{' '}
                  {/* Extracting filename from the path */}
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
