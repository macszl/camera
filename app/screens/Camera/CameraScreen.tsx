import {CameraScreenContent} from '../../components/CameraScreenContent/CameraScreenContent';
import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';

export default function CameraScreen() {
  const styles = useStyles();
  return (
    <View style={styles.homeScreenContainerStyle}>
      <SettingsHeader />
      <CameraScreenContent />
    </View>
  );
}
