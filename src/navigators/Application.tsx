import notifee, { EventType } from '@notifee/react-native';
// import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationStackParamList } from '../../@types/navigation';
import { useTheme } from '../hooks';
import { Startup } from '../screens';
import { ThemeState, changeTheme, setDeviceId } from '../store/theme';
import App from './app';
import AuthNavigator from './Auth';
import NavigationService from './NavigationService';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  const {Layout, darkMode, NavigationTheme} = useTheme();
  const isDeviceId = useSelector(
    (state: {theme: ThemeState}) => state.theme.deviceId,
  );

  const {colors} = NavigationTheme;

  // useFlipper(navigationRef);

  useEffect(() => {
    if (!colorScheme) {
      dispatch(changeTheme({darkMode: false}));
      return;
    }

    if (colorScheme === 'dark') {
      dispatch(changeTheme({darkMode: true}));
    } else {
      dispatch(changeTheme({darkMode: false}));
    }
    // SplashScreen.hide();
  }, [colorScheme]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // requestUserPermission();
      // NotificationListener();
    }
    if (!isDeviceId) {
      getDeviceId();
    }
  }, []);

  notifee.onForegroundEvent(({type, detail}: any) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log(
        'User pressed an action with the id: ',
        detail.pressAction.id,
      );
    }
  });

  notifee.onBackgroundEvent(async ({type, detail}: any) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log(
        'User pressed an action with the id: ',
        detail.pressAction.id,
      );

      // await updateChat(detail.notification.data.chatId, detail.input);
      // await notifee.cancelNotification(detail.notification.id);
    }
  });

  const getDeviceId = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      dispatch(setDeviceId({deviceId}));
    } catch (error) {
      console.log('Error retrieving device ID:', error);
    }
  };

  return (
    <NavigationContainer
      theme={NavigationTheme}
      ref={ref => [NavigationService.setTopLevelNavigator(ref), navigationRef]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />  
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="AppStack" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
