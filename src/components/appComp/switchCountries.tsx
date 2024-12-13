import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import CountryFlag from "react-native-country-flag";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";

const SwitchCountries = ({ item,onPress }: any) => {
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
    <TouchableOpacity onPress={onPress} style={[Layout.fullWidth,Gutters.tinyPadding,{
        borderRadius:  responsiveWidth(2),
        backgroundColor: "#1077C21A",
    }]}>
      <View
        style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          {
            
          },
        ]}
      >
        <View style={styles.CountryFlag}>
          <CountryFlag
            isoCode={item?.isoCode2?.toLowerCase()}
            size={responsiveFontSize(4.5)}
          />
        </View>
        <Text style={[
            Fonts.textSmall,
            {
                color: Colors.text,
                width:'70%'
            }
        ]}>{item.name}</Text>
        <Icon
        name="chevron-right"
        type="entypo"
        color={Colors.text}
        size={responsiveFontSize(3)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SwitchCountries;

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
