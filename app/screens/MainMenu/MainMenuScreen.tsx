import {MainMenuScreenContent} from '../../components/MainMenuScreenContent/MainMenuScreenContent';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';

export default function MainMenuScreen() {
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.homeScreenContainerStyle}>
        <SettingsHeader />
        <MainMenuScreenContent />
      </View>
    </ThemeProvider>
  );
}
