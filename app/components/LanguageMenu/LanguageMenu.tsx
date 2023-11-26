import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '@rneui/themed';

type LanguageMenuProps = {
  onLanguageChange: (language: string) => void;
};

const LanguageMenu = ({onLanguageChange}: LanguageMenuProps) => {
  const {theme} = useTheme();

  // Use StyleSheet for better performance, as it creates the styles only once.
  const styles = StyleSheet.create({
    container: {
      flex: 0.4,
      width: '50%',
      backgroundColor: theme.colors.modalBackground,
      borderRadius: 10,
      shadowColor: theme.colors.imageShadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5, // for Android shadow
      alignItems: 'center', // Center items horizontally
      justifyContent: 'space-evenly', // Center items vertically
    },
    button: {
      backgroundColor: theme.colors.lightGrey,
      paddingHorizontal: 20, // Increase horizontal padding
      paddingVertical: 15, // Increase vertical padding for larger touch area
      borderRadius: 5,
      marginBottom: 10, // Increased spacing between buttons
      width: '80%', // Set width to make buttons look more uniform
      shadowColor: theme.colors.buttonActiveShadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3, // for Android shadow
      alignItems: 'center', // Center text horizontally
    },
    buttonText: {
      color: theme.colors.textDarkGrey,
      textAlign: 'center',
      fontFamily: 'Inter', // Specify the Inter font family
      fontWeight: 'bold', // Make text bold
      fontSize: 18, // Increased font size for better legibility
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          return onLanguageChange('eng');
        }}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          return onLanguageChange('pl');
        }}>
        <Text style={styles.buttonText}>Polski</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageMenu;
