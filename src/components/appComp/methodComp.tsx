import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';

interface compPreps {
  title: string;
  image?: string | any;
  time?: string | any;
  onPress?: any;
}

const MethodComp = ({title, image, time, onPress}: compPreps) => {
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
      style={[Layout.fullWidth, Gutters.smallTMargin]}
      onPress={onPress}>
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          Gutters.tinyPadding,
          {
            backgroundColor:'#1077C21A',
            borderRadius: responsiveWidth(3)
          }
        ]}>
        <View style={styles.imageBackground}>
          <Image
            source={image}
            style={{width: responsiveWidth(7), height: responsiveWidth(7)}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textView}>
          <Text style={[Fonts.textSmall, {color: 'black', fontWeight: '600'}]}>
            {title}
          </Text>
          <Text style={[Fonts.textTiny, {color: 'grey', fontWeight: '600'}]}>
            {time} ⓘ
          </Text>
        </View>
        <Icon
          name="chevron-right"
          type="entypo"
          size={responsiveWidth(5)}
          color={Colors.textGray200}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MethodComp;

const styles = StyleSheet.create({
  imageBackground: {
    backgroundColor: '#fff',
    width: responsiveWidth(12),
    height: responsiveWidth(12),

    borderRadius: responsiveWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    width: '70%',
  },
});
