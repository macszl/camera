import {useTheme} from '@rneui/themed';
import {StyleSheet} from 'react-native';

export function useStyles() {
  const {theme} = useTheme();

  return StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background, // Example background color
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.textDarkGrey, // Example text color
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.colors.primary, // Example button background color
      borderRadius: 5,
    },
  });
}
