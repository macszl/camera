import {MainMenuScreenContent} from '../../components/MainMenuScreenContent/MainMenuScreenContent';
import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';

export default function MainMenuScreen() {
  const styles = useStyles();
  return (
    <View style={styles.homeScreenContainerStyle}>
      <SettingsHeader />
      <MainMenuScreenContent />
    </View>
  );
}
