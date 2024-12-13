import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';

interface currencyProps {
  title?: any;
  deliveryMethod: any;
  onPress: any;
}

const ChoosingDelMethod = ({title, deliveryMethod, onPress}: currencyProps) => {
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
    <TouchableOpacity
      onPress={onPress}
      style={[
        Layout.fullWidth,
        Gutters.tinyTMargin,
        {backgroundColor: '#F9FAFA', borderRadius: responsiveWidth(3)},
      ]}>
      <View
        style={[
          Gutters.tinyVMargin,
          Gutters.tinyHPadding,
          {paddingVertical: responsiveWidth(1)},
        ]}>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          {/* <Icon
            name="credit-card"
            type="material-icon"
            size={responsiveFontSize(3)}
            color={Colors.primary}
          /> */}
          <Image
          source={Images.wallet}
          style={{
            height: responsiveWidth(6),
            width: responsiveWidth(6),
          }}
          />
          <View style={[Gutters.tinyLMargin]}>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                {
                  width: '95%',
                },
              ]}>
              <Text
                style={[Fonts.textTiny, Fonts.textSuccess, {color: 'black'}]}>
                {deliveryMethod}
              </Text>
              <Icon
                name="chevron-down"
                type="entypo"
                size={responsiveFontSize(3)}
                color={Colors.black}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChoosingDelMethod;

const styles = StyleSheet.create({});
