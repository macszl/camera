import {WelcomeScreenContent} from '../../components/WelcomeScreenContent/WelcomeScreenContent';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';
import {useStyles} from '../../components/Common/Common.styles';
import {View} from 'react-native';

export default function WelcomeScreen() {
  const styles = useStyles();

  return (
    <View style={styles.homeScreenContainerStyle}>
      <SettingsHeader />
      <WelcomeScreenContent />
    </View>
  );
}
