import {NavigationContainer} from '@react-navigation/native';
import MainMenuScreen from '../screens/MainMenu/MainMenuScreen';
import ResultScreen from '..//screens/Result/ResultScreen';
import QueryScreen from '../screens/Query/QueryScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation.types';
import CameraScreen from '../screens/Camera/CameraScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Query" component={QueryScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
