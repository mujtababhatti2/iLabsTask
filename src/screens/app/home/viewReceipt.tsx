import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../../hooks";
import { Header } from "../../../components";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import { useGetDetailsbyReferenceNumberMutation } from "../../../services/modules/app";
import { showError } from "../../../utils/HelperFuctions";
import moment from "moment";

const ViewReceipt = ({ navigation, route }: any) => {
  const { data } = route.params;
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  const [details, setDetails] = useState<any>({});
  const [getDetailsbyReferenceNumber, { isLoading }] =
    useGetDetailsbyReferenceNumberMutation();

  useEffect(() => {
    getDetails();
  }, []);

  const exchangeRates = {
    GHS_PKR: 18.22,
    PKR_GHS: 0.044,
    GHS_USD: 0.085,
    USD_PKR: 280.0,
  };

  const getDetails = async () => {
    try {
      await getDetailsbyReferenceNumber({ rf: data.referenceNumber })
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.code == 200) {
            setDetails(res.data);
          } else {
            showError(res.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={[
        Layout.fill,
        iosSafeAreaTPadding,
        { backgroundColor: Colors.colorback },
      ]}
    >
      <Header
        title="Transaction details"
        goBack
        hideNotificationsicon={true}
        navigation={navigation}
      />
      <View style={[Gutters.smallMargin]}>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Gutters.smallTMargin,
            Gutters.tinyPadding,
            Layout.justifyContentCenter,
            {
              borderWidth: 1,
              borderColor: Colors.linear2,
              borderRadius: responsiveWidth(2),
              backgroundColor: "#169BD721",
            },
          ]}
        >
          <Icon
            name="alert-triangle"
            type="feather"
            size={responsiveFontSize(2.5)}
            color={Colors.linear2}
          />
          <Text
            style={[
              Fonts.textSmall,
              {
                color: Colors.linear2,
                marginLeft: responsiveWidth(4),
                fontWeight: "normal",
              },
            ]}
          >
            Reference number:{" "}
            <Text style={{ fontWeight: "bold" }}>{data?.referenceNumber}</Text>
          </Text>
        </View>
        <View
          style={[
            Gutters.smallTMargin,
            Layout.fullWidth,
            {
              borderWidth: 1,
              borderColor: Colors.linear2,
              borderRadius: responsiveWidth(3),
              backgroundColor: "#169BD721",
            },
          ]}
        >
          <View style={[Gutters.tinyMargin]}>
            <Text
              style={[
                Fonts.textSmall,
                Gutters.tinyBMargin,
                {
                  color: Colors.black,
                  fontWeight: "bold",
                },
              ]}
            >
              Sender's Information
            </Text>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Send date & time
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {moment(details.sendDateTime).format("MMM DD, YYYY hh:mm A")}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Sender name
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.senderName}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Sender phone
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.senderPhone}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Address
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.senderAddress ? details?.senderAddress : "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            Gutters.smallTMargin,
            Layout.fullWidth,
            {
              borderWidth: 1,
              borderColor: Colors.linear2,
              borderRadius: responsiveWidth(3),
              backgroundColor: "#169BD721",
            },
          ]}
        >
          <View style={[Gutters.tinyMargin]}>
            <Text
              style={[
                Fonts.textSmall,
                Gutters.tinyBMargin,
                {
                  color: Colors.black,
                  fontWeight: "bold",
                },
              ]}
            >
              Beneficiary information
            </Text>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Receiver name
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.receiverName}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Receive phone
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.receiverPhone}
              </Text>
            </View>
            <View style={styles.line} />
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Receiving Country
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.receiverCountry}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Delivery method
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.deliveryMethod}
              </Text>
            </View>
            <View style={styles.line} />
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Exchange Rate
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                1 GHS = 1 GHS
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Receiver to Receive
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
              ₵ {details?.transferAmount}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Bank name
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.bankName}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Account number
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                {details?.accountNumber}
              </Text>
            </View>
            <View style={styles.line} />
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Transfer amount
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                ₵ {details?.transferAmount?.toFixed(2)}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Processing Fee
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                ₵ {'1.00'}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Gutters.tinyTMargin,
                {},
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "#828489",
                  },
                ]}
              >
                Total You Paid
              </Text>
              <Text
                style={[
                  Fonts.textSmall,
                  {
                    color: "black",
                  },
                ]}
              >
                ₵ {Number(details?.transferAmount) + 1}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewReceipt;

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginTop: 15,
  },
});
