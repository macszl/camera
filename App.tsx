import React from 'react';
import {SettingsContextProvider} from './app/components/SettingsContextProvider/SettingsContextProvider';
import {theme} from './app/styles/theme';
import {RootNavigator} from './app/navigation/RootNavigator';
import {ThemeProvider} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SettingsContextProvider>
          <RootNavigator />
        </SettingsContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
