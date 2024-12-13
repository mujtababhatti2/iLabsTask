import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
interface currencyProps {
  title: any;
  paymentCard: any;
}

const PaymentMethodComp = ({title, paymentCard}: currencyProps) => {
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
        {backgroundColor: '#F9FAFA', borderRadius: responsiveWidth(3)},
      ]}>
      <View style={[Gutters.tinyVMargin, Gutters.tinyHPadding]}>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Image
          source={Images.card}
          style={{
            height: responsiveWidth(6),
            width: responsiveWidth(6),
          }}
          />
          <View style={[Gutters.tinyLMargin]}>
            <Text style={[{color: 'grey', fontSize: 10, marginBottom: 2}]}>
              {title}
            </Text>
            <Text style={[Fonts.textTiny, Fonts.textSuccess, {color: 'black'}]}>
              {paymentCard}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethodComp;

const styles = StyleSheet.create({});
