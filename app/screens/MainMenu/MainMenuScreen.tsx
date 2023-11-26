import {useNavigation} from '@react-navigation/native';

import {MainMenuStackNavigationProp} from '../../types/navigation.types';
import {MainMenuScreenContent} from '../../components/MainMenuScreenContent/MainMenuScreenContent';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';

export default function MainMenuScreen() {
  const {theme} = useTheme();
  const navigation = useNavigation<MainMenuStackNavigationProp>();
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.homeScreenContainerStyle}>
        <SettingsHeader />
        <MainMenuScreenContent />
      </View>
    </ThemeProvider>
  );
}
