import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '@rneui/themed';

type LanguageMenuProps = {
  onLanguageChange: (language: string) => void;
};

const LanguageMenu = (props: LanguageMenuProps) => {
  const {onLanguageChange} = props;
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.modalBackground,
      padding: 10,
      borderRadius: 10,
      shadowColor: theme.colors.imageShadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5, // for Android shadow
    },
    button: {
      backgroundColor: theme.colors.lightGrey,
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
      shadowColor: theme.colors.buttonActiveShadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3, // for Android shadow
    },
    buttonText: {
      color: theme.colors.textDarkGrey,
      textAlign: 'center',
      fontFamily: theme.colors.settingsButtonFont,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onLanguageChange('eng')}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onLanguageChange('pl')}>
        <Text style={styles.buttonText}>Polski</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageMenu;
