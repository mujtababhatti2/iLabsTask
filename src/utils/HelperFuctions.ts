import {Alert, PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {showMessage} from 'react-native-flash-message';
// import Geolocation from 'react-native-geolocation-service';

interface Coordinates {
  latitude: number;
  longitude: number;
  heading?: number | null;
}

const getCurrentLocation = (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const coords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position.coords.heading,
        };
        resolve(coords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

const locationPermission = (): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });

const showError = (message: any, duration?: number): void => {
  showMessage({
    message: message || 'Something went wrong',
    type: 'danger',
    icon: 'danger',
    titleStyle: {fontFamily: 'Poppins-SemiBold'},
    style: {paddingTop: StatusBar.currentHeight},
    autoHide: true,
    duration: duration || 1850,
  });
};

const showSuccess = (message: string, duration?: number): void => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
    titleStyle: {fontFamily: 'Poppins-SemiBold'},
    style: {paddingTop: StatusBar.currentHeight},
    autoHide: true,
    duration: duration || 1850,
  });
};

const showCustomAlert = (
  title: string,
  message: string,
  okAction?: () => void,
  cancelAction?: () => void,
  okText?: string | 'OK',
): void => {
  const buttons = [{text: okText || 'OK', onPress: okAction}];

  if (cancelAction) {
    buttons.push({text: 'Cancel', onPress: cancelAction});
  }

  Alert.alert(title, message, buttons);
};

const formatingText = (number: any) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const isValidEmail = (email: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: any) => {
  // Check for at least 8 characters, a number or symbol
  const passwordRegex = /^(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export {
  // getCurrentLocation,
  // locationPermission,
  showCustomAlert,
  showError,
  showSuccess,
  formatingText,
  isValidEmail,
  isValidPassword
};
