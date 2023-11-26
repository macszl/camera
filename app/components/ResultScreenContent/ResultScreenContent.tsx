import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {WelcomeStackNavigationProp} from '../../types/navigation.types';
import {useTranslation} from 'react-i18next';

export function ResultScreenContent() {
  const theme = useTheme();
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <View style={styles.content}>
      <Text style={styles.text}>Witaj w aplikacji klasyfikującej produkty</Text>
      <Button
        title="Przejdź dalej"
        onPress={() => {
          navigation.navigate('MainMenu');
        }}
        style={styles.button}
      />
    </View>
  );
}
