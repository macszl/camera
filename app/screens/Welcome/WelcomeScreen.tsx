import {useNavigation} from '@react-navigation/native';
import {WelcomeStackNavigationProp} from '../../types/navigation.types';
import {WelcomeScreenContent} from '../../components/WelcomeScreenContent/WelcomeScreenContent';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';
import {useStyles} from '../../components/Common/Common.styles';
import {View} from 'react-native';

export default function WelcomeScreen() {
  const {theme} = useTheme();
  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.homeScreenContainerStyle}>
        <SettingsHeader />
        <WelcomeScreenContent />
      </View>
    </ThemeProvider>
  );
}
