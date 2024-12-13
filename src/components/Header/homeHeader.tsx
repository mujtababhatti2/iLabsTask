import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {Icon} from 'react-native-elements';
import {Image} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const HomeHeader = ({}: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  return (
    <View style={[Layout.fullWidth]}>
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          Gutters.smallMargin,
        ]}>
        <Icon
          name="menu-outline"
          type="ionicon"
          color={Colors.white}
          size={25}
        />
        <Image
          source={Images.logo_white}
          style={{
            height: responsiveWidth(10),
            width: responsiveWidth(40),
          }}
          resizeMode="contain"
        />
        {/* <Icon
          name="menu-outline"
          type="ionicon"
          color={Colors.linear1}
          size={25}
        /> */}
        <View style={{height:1, width:25}} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
