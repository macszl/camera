import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  MainMenu: undefined;
  Query: undefined;
  Result: undefined;
  // Camera: undefined;
};

export type WelcomeStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;
export type MainMenuStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainMenu'
>;
export type QueryStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Query'
>;
export type ResultStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Result'
>;

// export type CameraStackNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Camera'
// >;
