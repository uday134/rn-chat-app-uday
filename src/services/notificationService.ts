import * as Notifications from 'expo-notifications';

// Request permission
export const requestPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// Get push token
export const getToken = async () => {
  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
};