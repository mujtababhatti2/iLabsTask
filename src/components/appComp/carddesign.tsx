import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../hooks";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";
import { AuthState } from "../../store/auth";
import { formatingText } from "../../utils/HelperFuctions";

const WalletCard = ({ onPress }: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();

  const { user }: any = useSelector<any>(
    (state: { auth: AuthState }) => state.auth
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <LinearGradient
        colors={["#46c882", "#3486d3"]}
        style={[
          Layout.fullWidth,
          Gutters.smallTMargin,
          {
            borderRadius: 10,
            padding: 10,
          },
        ]}
        start={{ x: 1, y: 0 }} // Start at the right
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.header}>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Image
              source={Images.icon}
              style={{
                width: responsiveWidth(6),
                height: responsiveWidth(6),
                marginRight: responsiveWidth(3),
              }}
            />
            <Text style={styles.walletText}>PayGiant Wallet</Text>
          </View>
          <Image style={styles.chip} source={Images.chip} />
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            ₵ {formatingText(user.walletAmount)}
          </Text>
          <Text style={styles.subText}>Available Balance</Text>
        </View>

        {/* <TouchableOpacity style={styles.payButton}> */}
        <Text style={styles.payText}>click to pay</Text>
        {/* </TouchableOpacity> */}
        {/* Header Section */}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#46c882", // Fallback for gradient effect
    width: "90%",
    padding: 20,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
    elevation: 5, // For shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, // For shadow on iOS
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  chip: {
    width: responsiveWidth(12),
    height: responsiveWidth(8),
    borderRadius: 5,
  },
  balanceContainer: {
    marginTop: 20,
  },
  balanceText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subText: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 5,
  },
  payButton: {
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
    marginTop: 15,
  },
});

export default WalletCard;
