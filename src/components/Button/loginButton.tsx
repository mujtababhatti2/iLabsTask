import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';

const LoginButton = ({Icon, text, onPress}: any) => {
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
        Gutters.smallBMargin,
        {
          borderWidth: 2,
          borderColor: '#F4F4F6',
          borderRadius: 10,
        },
      ]}>
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Gutters.smallVMargin,
          Layout.justifyContentCenter,
        ]}>
        {Icon}
        <Text style={[Gutters.tinyLMargin, Fonts.textTiny, Fonts.textBold]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({});
