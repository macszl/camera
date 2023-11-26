import {useTheme} from '@rneui/themed';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CustomStyleSheet = {
  container: ViewStyle;
  text: TextStyle;
  iconContainer: ViewStyle;
  modalView: ViewStyle;
  closeButton: ViewStyle;
  closeButtonText: TextStyle;
};

export function useStyles() {
  const {theme} = useTheme();

  return StyleSheet.create<CustomStyleSheet>({
    container: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: '10%',
      marginTop: '3%',
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Inter', // Ensure 'Inter' font is linked in your project
      color: theme.colors.textDarkGrey, // Ensure this color is defined in your theme
    },
    modalView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', // Align LanguageMenu to the top
      alignItems: 'center', // Center LanguageMenu horizontally
      paddingTop: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: 10,
      backgroundColor: 'lightgrey', // Background color for the close button
      borderRadius: 15, // Rounded corners for the close button
      padding: 8, // Padding inside the close button
    },
    closeButtonText: {
      fontSize: 16, // Smaller font size for the 'X'
      fontWeight: 'bold',
      color: 'black', // Color of the 'X' text
    },
    iconContainer: {
      paddingHorizontal: 5,
    },
  });
}
