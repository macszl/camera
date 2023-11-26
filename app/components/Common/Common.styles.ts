import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from '@rneui/themed';
import {DeviceSize, deviceSize} from '../../utils/breakpoints';

type CustomStyleSheet = {
  imageStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonPressedStyle: ViewStyle;
  loadingAnimationStyle: TextStyle;
  cameraButtonStyle: ViewStyle;
  galleryButtonStyle: ViewStyle;
  uploadButtonStyle: ViewStyle;
  captureFrameStyle: ViewStyle;
  imagePreviewStyle: ViewStyle;
  progressIndicatorStyle: TextStyle;
  classificationResultStyle: TextStyle;
  errorMessageBoxStyle: TextStyle;
  retryButtonStyle: ViewStyle;
  homeScreenContainerStyle: ViewStyle;
  footerNavigationStyle: ViewStyle;
  searchBarStyle: ViewStyle;
  filterButtonStyle: ViewStyle;
  categoryListStyle: ViewStyle;
  categoryItemStyle: ViewStyle;
  detailedInfoModalStyle: ViewStyle;
  favoritesButtonStyle: TextStyle;
  shareButtonStyle: ViewStyle;
  historyScreenContainerStyle: ViewStyle;
  historyListItemStyle: ViewStyle;
  clearHistoryButtonStyle: ViewStyle;
  notificationBellStyle: TextStyle;
  userProfileIconStyle: ViewStyle;
  logoutButtonStyle: ViewStyle;
  welcomeBannerStyle: TextStyle;
  historyScreenWelcomeMessageStyle: TextStyle;
  historyListItemTextStyle: TextStyle;
};

export function useStyles() {
  const {theme} = useTheme();
  const {width} = useWindowDimensions();
  const isMobile = deviceSize(width) === DeviceSize.Small;
  const mobilePadding = 0;
  const nonMobilePadding = 20;

  return StyleSheet.create<CustomStyleSheet>({
    imageStyle: {
      resizeMode: 'cover',
      backgroundColor: theme.colors.lightGrey,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    buttonStyle: {
      backgroundColor: theme.colors.green,
      padding: isMobile ? mobilePadding : 10,
      borderRadius: 5,
    },
    buttonPressedStyle: {
      backgroundColor: theme.colors.green,
      padding: isMobile ? mobilePadding : 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    loadingAnimationStyle: {
      color: theme.colors.loadingAnimationColor,
    },
    cameraButtonStyle: {
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
    },
    galleryButtonStyle: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 30,
    },
    uploadButtonStyle: {
      backgroundColor: theme.colors.green,
      padding: isMobile ? mobilePadding : 10,
    },
    captureFrameStyle: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
      borderRadius: 5,
    },
    imagePreviewStyle: {
      borderColor: theme.colors.lightGrey,
      borderWidth: 1,
      borderRadius: 10,
    },
    progressIndicatorStyle: {
      color: theme.colors.primary,
    },
    classificationResultStyle: {
      color: theme.colors.primaryFont, // Replaced textColor with color
      backgroundColor: theme.colors.background,
      padding: isMobile ? mobilePadding : 15,
    },
    errorMessageBoxStyle: {
      color: theme.colors.errorText, // Replaced textColor with color
      backgroundColor: theme.colors.errorBackground,
      padding: isMobile ? mobilePadding : 10,
    },
    retryButtonStyle: {
      backgroundColor: theme.colors.warning,
      borderRadius: 5,
    },
    homeScreenContainerStyle: {
      backgroundColor: theme.colors.background,
      padding: isMobile ? mobilePadding : 20,
    },
    footerNavigationStyle: {
      backgroundColor: theme.colors.footerBackground,
      borderTopColor: theme.colors.lightGrey,
      borderTopWidth: 1,
    },
    searchBarStyle: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.lightGrey,
      borderRadius: 15,
      borderWidth: 1,
    },
    filterButtonStyle: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 20,
    },
    categoryListStyle: {
      backgroundColor: theme.colors.background,
      padding: isMobile ? mobilePadding : 10,
    },
    categoryItemStyle: {
      backgroundColor: theme.colors.white,
      padding: isMobile ? mobilePadding : 10,
      borderRadius: 5,
    },
    detailedInfoModalStyle: {
      backgroundColor: theme.colors.modalBackground,
      padding: isMobile ? mobilePadding : 20,
      borderRadius: 10,
    },
    favoritesButtonStyle: {
      color: theme.colors.favorite, // Assuming it represents the color of the icon
    },
    shareButtonStyle: {
      backgroundColor: theme.colors.shareBackground,
      borderRadius: 20,
    },
    historyScreenContainerStyle: {
      backgroundColor: theme.colors.background,
    },
    historyListItemStyle: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.lightGrey,
      borderRadius: 5,
      borderWidth: 1,
      padding: isMobile ? mobilePadding : 10,
    },
    clearHistoryButtonStyle: {
      backgroundColor: theme.colors.error,
      borderRadius: 5,
    },
    notificationBellStyle: {
      color: theme.colors.notification, // Assuming it represents the color of the icon
    },
    userProfileIconStyle: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
      borderRadius: 30,
    },
    logoutButtonStyle: {
      backgroundColor: theme.colors.danger,
      borderRadius: 5,
    },
    welcomeBannerStyle: {
      color: theme.colors.bannerText, // Replaced textColor with color
      backgroundColor: theme.colors.bannerBackground,
      padding: isMobile ? mobilePadding : 20,
      textAlign: 'center',
    },
    historyScreenWelcomeMessageStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primaryFont,
      padding: 10,
      // Add other styling as needed
    },
    historyListItemTextStyle: {
      fontSize: 16,
      color: theme.colors.secondaryFont,
      padding: 5,
      // Add other styling as needed
    },
  });
}
