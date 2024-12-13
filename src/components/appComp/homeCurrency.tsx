import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';

interface currencyProps {
  image?: any;
  title?: any;
  country?: any;
  rightTitle: any;
}

const HomeCurrency = ({image, country, title, rightTitle}: currencyProps) => {
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
    <View
      style={[
        Layout.fullWidth,
        Gutters.smallHPadding,
        {borderRadius: responsiveWidth(3)},
      ]}>
      <View>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
            Gutters.smallHMargin
          ]}>
          <Text style={[Fonts.textTiny, {color: Colors.black}]}>{title}</Text>
          <Text style={[Fonts.textTiny, {color: Colors.black}]}>
            {rightTitle}
          </Text>
        </View>
        <View
          style={[
            Layout.fullWidth,
            {backgroundColor: '#F9FAFA', borderRadius: responsiveWidth(3)},
          ]}>
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              // Gutters.smallVPadding,
              Layout.justifyContentBetween,
            ]}>
            <Text
              style={[
                Fonts.textBold,
                Fonts.textSmall,
                Gutters.smallLPadding,
                {color: 'black'},
              ]}>
              30.0
            </Text>
            <TouchableOpacity
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentCenter,
                Gutters.smallVPadding,
                {
                  backgroundColor: Colors.primary,
                  borderTopRightRadius: responsiveWidth(3),
                  borderBottomRightRadius: responsiveWidth(3),
                  width: '35%',
                },
              ]}>
              <View style={[Layout.row, Layout.alignItemsCenter]}>
                <Image
                  source={image}
                  style={{
                    width: responsiveWidth(8),
                    height: responsiveWidth(8),
                    borderRadius: responsiveWidth(8),
                    backgroundColor: 'red',
                  }}
                />
                <Text
                  style={[
                    Fonts.textBold,
                    Fonts.textSmall,
                    Gutters.tinyHPadding,
                    {color: Colors.white},
                  ]}>
                  Can
                </Text>
                <Icon
                  name="chevron-down"
                  type="entypo"
                  size={responsiveFontSize(2.5)}
                  color={Colors.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            Fonts.textTiny,
            {color: Colors.black, textAlign: 'right'},
            Gutters.tinyTMargin,
            Gutters.smallRMargin,
          ]}>
          {country}
        </Text>
      </View>
    </View>
  );
};

export default HomeCurrency;

const styles = StyleSheet.create({});
