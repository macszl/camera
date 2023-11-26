import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './app/types/navigation.types';
import {SettingsContextProvider} from './app/components/SettingsContextProvider/SettingsContextProvider';
import MainMenuScreen from './app/screens/MainMenu/MainMenuScreen';
import ResultScreen from './app/screens/Result/ResultScreen';
import QueryScreen from './app/screens/Query/QueryScreen';
import WelcomeScreen from './app/screens/Welcome/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SettingsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Query" component={QueryScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsContextProvider>
  );
}
