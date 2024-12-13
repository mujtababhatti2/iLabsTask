import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import InternetConnectionStatus from './components/NetInfo/InternetConnectivity';
import ApplicationNavigator from './navigators/Application';
import { persistor, store } from './store';
import 'react-native-gesture-handler';
import './translations';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const App = () => (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <InternetConnectionStatus />
          <FlashMessage />
          <ApplicationNavigator />
        </SafeAreaProvider>
      </PersistGate>
      
    </Provider>
);

export default App;
