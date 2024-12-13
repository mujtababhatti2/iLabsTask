import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import CountryFlag from "react-native-country-flag";

interface currencyProps {
  image?: any;
  title?: any;
  country?: any;
  rightTitle: any;
  countryname: any;
  countries: Array<object>;
  onPress: () => void;
  value?: any;
  onChangeText?: any;
  receive?: any;
  receiveamount?: any;
  isoCode?: any;
}

const HomeCurrencyNew = ({
  image,
  country,
  title,
  rightTitle,
  countryname,
  countries,
  onPress,
  value,
  receiveamount,
  receive = false,
  onChangeText,
  isoCode,
}: currencyProps) => {
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
    <View style={[Layout.fullWidth, Gutters.smallHPadding]}>
      <View>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
            Gutters.tinyTMargin,
          ]}
        >
          <Text style={[Fonts.textTiny, { color: Colors.text }]}>{title}</Text>
          <Text style={[Fonts.textTiny, { color: Colors.text }]}>
            {rightTitle}
          </Text>
        </View>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
            // Gutters.smallTMargin,
          ]}
        >
          <TouchableOpacity
            onPress={onPress}
            style={[Layout.row, Layout.alignItemsCenter]}
          >
            <View style={styles.CountryFlag}>
              <CountryFlag
                isoCode={isoCode ?? "gh"}
                size={responsiveFontSize(4.5)}
                i18nIsDynamicList={true}
              />
            </View>
            <Text
              style={[
                Fonts.textRegular,
                {
                  color: Colors.white,
                  marginLeft: responsiveWidth(1.5),
                },
              ]}
            >
              {country.toUpperCase()}
            </Text>
            <Icon
              name="chevron-down"
              type="entypo"
              color={Colors.white}
              size={responsiveFontSize(3)}
              style={{ marginLeft: responsiveWidth(3) }}
            />
          </TouchableOpacity>
          {receive ? (
            <Text
              style={{
                fontSize: responsiveFontSize(4.5),
                color: Colors.black,
                marginRight: responsiveWidth(1.5),
                height: responsiveWidth(13),
                fontWeight: "600",
              }}
            >
              {receiveamount ?? "0.00"}
            </Text>
          ) : (
            <TextInput
              keyboardType="numeric"
              placeholder="0.00"
              style={{
                fontSize: responsiveFontSize(4.5),
                color: Colors.black,
                fontWeight: "600",
              }}
              value={value}
              onChangeText={onChangeText}
            />
          )}
        </View>
        <Text
          style={[
            {
              fontSize: responsiveFontSize(1.8),
              color: Colors.white,
              marginTop: responsiveWidth(1.5),
              marginLeft: responsiveWidth(1.5),
              alignSelf: "flex-end",
            },
          ]}
        >
          {countryname}
        </Text>

        {/* <View
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
          </Text> */}
      </View>
    </View>
  );
};

export default HomeCurrencyNew;
const styles = StyleSheet.create({
  CountryFlag: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(9),
    backgroundColor: "white",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
