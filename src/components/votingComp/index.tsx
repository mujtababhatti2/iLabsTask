import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Image } from "react-native";

const LiveVotingComp = ({ voting }: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();

  const formatVoting =() =>{

  }
  return (
    <View style={{ marginTop: responsiveHeight(2) }}>
      <View
        style={[
          Layout.fullWidth,
          Gutters.smallVPadding,
          Gutters.smallHPadding,
          {
            backgroundColor: Colors.primary,
            borderRadius: responsiveWidth(2),
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text
          style={[Fonts.textBold, Fonts.textRegular, { color: Colors.white }]}
        >
          Live Voting:
        </Text>
        <Text
          style={[Fonts.textBold, Fonts.textRegular, { color: Colors.white }]}
        >
          {voting.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <Image
        source={Images.voteIcon}
        style={{
          width: responsiveWidth(10),
          height: responsiveWidth(10),
          resizeMode: "contain",
          position: "absolute",
          top: -30,
          right: 10,
        }}
      />
    </View>
  );
};

export default LiveVotingComp;

const styles = StyleSheet.create({});
