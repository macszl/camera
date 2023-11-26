import {useNavigation} from '@react-navigation/native';
import {QueryScreenContent} from '../../components/QueryScreenContent/QueryScreenContent';
import {QueryStackNavigationProp} from '../../types/navigation.types';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {View} from 'react-native';
import {useStyles} from '../../components/Common/Common.styles';
import {SettingsHeader} from '../../components/SettingsHeader/SettingsHeader';
import { ResultScreenContent } from '../../components/ResultScreenContent/ResultScreenContent';

export default function ResultScreen() {
  const {theme} = useTheme();
  const navigation = useNavigation<QueryStackNavigationProp>();
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.homeScreenContainerStyle}>
        <SettingsHeader />
        <ResultScreenContent/>
        {/* <ResultScreenNavigationFooter /> */}
      </View>
    </ThemeProvider>
  );
}
