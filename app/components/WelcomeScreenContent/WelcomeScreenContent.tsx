import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {WelcomeStackNavigationProp} from '../../types/navigation.types';
import {useTranslation} from 'react-i18next';
import {useStyles} from './WelcomeScreenContent.styles';
import {Button} from '@rneui/themed';

export function WelcomeScreenContent() {
  const styles = useStyles();
  const {t} = useTranslation();
  const navigation = useNavigation<WelcomeStackNavigationProp>();
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
