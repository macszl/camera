import {QueryScreenContent} from '../../components/QueryScreenContent/QueryScreenContent';
import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';

export default function QueryScreen() {
  const styles = useStyles();
  return (
    <View style={styles.homeScreenContainerStyle}>
      <SettingsHeader />
      <QueryScreenContent />
      {/* <QueryScreenNavigationFooter /> */}
    </View>
  );
}
