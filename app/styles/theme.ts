import {createTheme} from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    // Existing colors
    lightGrey: '#F5F5F5',
    beige: '#FFF8E1',
    textDarkGrey: '#333333',
    green: '#4CAF50',
    amber: '#FFC107',
    primaryFont: 'Roboto',
    secondaryFont: 'Open Sans',
    buttonFont: 'Lato',
    settingsButtonFont: 'Montserrat',
    imageBackground: 'rgba(245, 245, 245, 0.5)',
    imageShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fadeInDuration: '0.3s',
    buttonActiveShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    loadingAnimationColor: '#4CAF50',

    // New colors
    primary: '#007bff', // Example primary color
    secondary: '#6c757d', // Example secondary color
    errorBackground: '#f8d7da',
    errorText: '#721c24',
    warning: '#ffc107',
    footerBackground: '#f7f7f7',
    modalBackground: '#ffffff',
    favorite: '#ff4757',
    shareBackground: '#34b7f1',
    danger: '#dc3545',
    notification: '#ff851b',
    bannerBackground: '#f8f9fa',
    bannerText: '#343a40',
  },
  darkColors: {
    // Existing colors
    lightGrey: '#F5F5F5',
    beige: '#FFF8E1',
    textDarkGrey: '#333333',
    green: '#4CAF50',
    amber: '#FFC107',
    primaryFont: 'Roboto',
    secondaryFont: 'Open Sans',
    buttonFont: 'Lato',
    settingsButtonFont: 'Montserrat',
    imageBackground: 'rgba(245, 245, 245, 0.5)',
    imageShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fadeInDuration: '0.3s',
    buttonActiveShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    loadingAnimationColor: '#4CAF50',

    // New colors for dark theme (can be adjusted as needed)
    primary: '#007bff',
    secondary: '#6c757d',
    errorBackground: '#f8d7da',
    errorText: '#721c24',
    warning: '#ffc107',
    footerBackground: '#f7f7f7',
    modalBackground: '#ffffff',
    favorite: '#ff4757',
    shareBackground: '#34b7f1',
    danger: '#dc3545',
    notification: '#ff851b',
    bannerBackground: '#f8f9fa',
    bannerText: '#343a40',
  },
  mode: 'light', // or 'dark'
});
console.log('Created Theme:', theme);
