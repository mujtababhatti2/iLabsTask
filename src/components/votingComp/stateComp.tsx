import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import { responsiveWidth } from "react-native-responsive-dimensions";

const StateComp = ({ heading, data }: any) => {
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
        Gutters.smallVMargin,
        Gutters.tinyHMargin,
        Layout.alignItemsCenter,
      ]}
    >
      <Text style={[Fonts.textTiny, { color: Colors.white }]}>{heading}</Text>
      <View
        style={[
          Layout.alignItemsCenter,
          {
            width: responsiveWidth(29),
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 10,
          },
        ]}
      >
        <Text
          style={[
            Gutters.tinyPadding,
            Fonts.textTiny,
            {
              color: Colors.white,
            },
          ]}
        >
          {data}
        </Text>
      </View>
    </View>
  );
};

export default StateComp;

const styles = StyleSheet.create({});
