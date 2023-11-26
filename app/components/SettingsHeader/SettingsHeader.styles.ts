import { useTheme } from '@rneui/themed';
import { StyleSheet, TextStyle, ViewStyle, useWindowDimensions } from 'react-native';
import { DeviceSize, deviceSize } from '../../utils/breakpoints';

type CustomStyleSheet = {
  container: ViewStyle;
  text: TextStyle;
}

export function useStyles() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = deviceSize(width) === DeviceSize.Small;
  const mobilePadding = 0;
  const nonMobilePadding = 50;

  return StyleSheet.create<CustomStyleSheet>({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 30,
      fontFamily: 'Inter', // Ensure 'Inter' font is linked in your project
      color: theme.colors.primaryFont, // Ensure this color is defined in your theme
      paddingRight: isMobile ? mobilePadding : nonMobilePadding,
      paddingLeft: isMobile ? mobilePadding : nonMobilePadding,
      paddingTop: isMobile ? mobilePadding : nonMobilePadding,
      paddingBottom: isMobile ? mobilePadding : nonMobilePadding,
      textAlign: 'center',
    },
  });
}
