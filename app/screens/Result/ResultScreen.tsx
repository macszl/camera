import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';
import {ResultScreenContent} from '../../components/ResultScreenContent/ResultScreenContent';

export default function ResultScreen() {
  const styles = useStyles();
  return (
    <View style={styles.homeScreenContainerStyle}>
      <SettingsHeader />
      <ResultScreenContent />
      {/* <ResultScreenNavigationFooter /> */}
    </View>
  );
}
