import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ApplicationScreenProps} from '../../../@types/navigation';
import {useTheme} from '../../hooks';
import {ThemeState} from '../../store/theme';
import {AuthState} from '../../store/auth';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Startup = ({navigation}: ApplicationScreenProps) => {
  // Get current theme from the store
  const isFirstRun = useSelector(
    (state: {theme: ThemeState}) => state.theme.isFirstRun,
  );
  const {idToken} = useSelector((state: {auth: AuthState}) => state.auth);
  const {Layout, Gutters, Images, Colors} = useTheme();

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );

    // if (isFirstRun) {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Onboard" }],
    // });
    // }
    if (idToken) {
      navigation.reset({
        index: 0,
        routes: [{name: 'AppStack'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View
      style={[Layout.fill, Layout.colCenter, {backgroundColor: Colors.white}]}>
      {/* <StatusBar backgroundColor="transparent" translucent /> */}
      <View
        style={[
          Layout.fill,
          Layout.fullWidth,
          Layout.alignItemsCenter,
          Layout.justifyContentCenter,
        ]}>
        <Image
          source={Images.logo}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>

      <View
        style={[
          Layout.fill,
          Layout.justifyContentEnd,
          Layout.alignItemsCenter,
          Gutters.regularBMargin,
          {position: 'absolute', bottom: responsiveHeight(3)},
        ]}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    </View>
  );
};

export default Startup;
