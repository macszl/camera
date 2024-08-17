import {useTheme} from '@rneui/themed';
import {StyleSheet} from 'react-native';

export function useStyles() {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      width: '80%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    textGroup: {
      marginBottom: '20%', // Adjusts the space between the text group and the button
    },
    heading: {
      fontSize: 24, // Replace with appropriate font size
      fontWeight: '700', // Replace with appropriate font weight
      fontFamily: 'Inter', // Ensure Inter font is linked
      textAlign: 'left',
    },
    description: {
      fontSize: 16, // Replace with appropriate font size
      fontFamily: 'Inter', // Ensure Inter font is linked
      textAlign: 'left',
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    touchableButton: {
      backgroundColor: 'green',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledButton: {
      backgroundColor: 'green',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5,
    },
    buttonText: {
      fontFamily: 'Inter', // Ensure Inter font is linked
      color: 'white', // Assuming a white text color for the button, adjust as needed
      fontSize: 20,
    },
    historyScreenWelcomeMessageStyle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textDarkGrey, // Use theme colors for text
      marginBottom: 20,
    },
    historyListItemStyle: {
      backgroundColor: '#E0E0E0', // Use card color from theme
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      elevation: 3, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      flexDirection: 'row',
    },
    historyListItemTextStyle: {
      color: theme.colors.textDarkGrey, // Use theme colors for text
      fontSize: 16,
      marginBottom: 5,
    },
    imageStyle: {
      width: '30%',
      height: 100,
      resizeMode: 'contain',
      borderRadius: 8, // Optional: rounded corners for images
    },
    camera: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    spinnerText: {
      marginTop: 10,
      color: '#FFFFFF',
      fontSize: 18,
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
}
