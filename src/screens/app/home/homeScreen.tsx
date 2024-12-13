import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../hooks";
import HomeHeader from "../../../components/Header/homeHeader";
import HomeCurrency from "../../../components/appComp/homeCurrency";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import PaymentMethodComp from "../../../components/appComp/paymentMethodComp";
import ChoosingDelMethod from "../../../components/appComp/choosingDelMethod";
import { Button, TextInput } from "../../../components";
import SwtichComp from "../../../components/appComp/swtichComp";
import RBSheet from "react-native-raw-bottom-sheet";
import RbsheetComp from "../../../components/appComp/rbsheetComp";
import MethodComp from "../../../components/appComp/methodComp";
import LinearGradient from "react-native-linear-gradient";
import HomeCurrencyNew from "../../../components/appComp/currency";
import {
  useAddIdentificationMutation,
  useGetDeliveryMethodsMutation,
  useGetReceivingCountriesMutation,
  useGetSendingCountriesMutation,
} from "../../../services/modules/app";
import { use } from "i18next";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { countries } from "../../../utils/data";
import SwitchCountries from "../../../components/appComp/switchCountries";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setUser } from "../../../store/auth";
import IdentificationComp from "../../../components/appComp/identificationComp";
import { showError, showSuccess } from "../../../utils/HelperFuctions";

const HomeScreen = ({ navigation, route }: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  const dispatch = useDispatch();
  const [couponFlag, setCouponFlag] = useState(false);
  const deliveryRBSheet = useRef<any>(null);
  const sendingRBSheet = useRef<any>(null);
  const identificationRBSheet = useRef<any>(null);
  const receivingRBSheet = useRef<any>(null);
  const [coupon, setCoupon] = useState("");
  const [identi, setIdenti] = useState({
    type: "",
    id_no: "",
    issue_date: "",
    expired_date: "",
    image: "",
  });

  const { user }: any = useSelector<any>(
    (state: { auth: AuthState }) => state.auth
  );
  const [SendingCountries, setSendingCountries] = useState([]);
  const [ReceivingCountries, setReceivingCountries] = useState([]);
  const [methods, setMethods] = useState([]);

  const [getSendingCountries] = useGetSendingCountriesMutation();
  const [getReceivingCountries] = useGetReceivingCountriesMutation();
  const [getDeliveryMethods] = useGetDeliveryMethodsMutation();
  const [addIdentification, { isLoading: load }] =
    useAddIdentificationMutation();
  const [processingFee, setProcessingFee] = useState(1.0); // Set the fee value dynamically if needed
  const [totalPay, setTotalPay] = useState(0);
  const exchangeRates = {
    GHS_PKR: 18.22,
    PKR_GHS: 0.044,
    GHS_USD: 0.085,
    USD_PKR: 280.0,
  };
  const [selectedobj, setSelectedobj] = useState<any>({
    paymentMethod: "",
    SendingCountry: {
      id: 1,
      name: "Ghana",
      isoCode2: "GH",
      isoCode3: "GHA",
      dialingCode: "+233",
      sendLimit: 5000,
      minLimit: 50,
      maxLimit: 10000,
      disable: false,
      isSendingAllowed: true,
      isReceivingAllowed: true,
      createdOn: "2024-10-11T16:43:37.52",
      updatedOn: "2024-10-11T16:44:21.497",
    },
    receiveingCountry: {
      id: 1,
      name: "Ghana",
      isoCode2: "GH",
      isoCode3: "GHA",
      dialingCode: "+233",
      sendLimit: 5000,
      minLimit: 50,
      maxLimit: 10000,
      disable: false,
      isSendingAllowed: true,
      isReceivingAllowed: true,
      createdOn: "2024-10-11T16:43:37.52",
      updatedOn: "2024-10-11T16:44:21.497",
    },
    sendingMoney: "",
    deliveryMethod: "",
    processingFee: processingFee,
  });
  useEffect(() => {
    if (SendingCountries.length === 0) {
      getSendingCountriesApi();
    }
    console.log("selecteedobj........", selectedobj);

    // getSendingCountriesApi();
    const sendingAmount = parseFloat(selectedobj.sendingMoney) || 0;
    setTotalPay(sendingAmount + processingFee);
  }, [selectedobj.sendingMoney, processingFee]);
  useEffect(() => {
    if (Boolean(user.hasIdentification) == false) {
      setTimeout(() => {
        identificationRBSheet?.current?.open();
      }, 5000);
    }
  }, []);

  const getSendingCountriesApi = async () => {
    try {
      const res: any = await getSendingCountries().unwrap();
      if (res.code === 200) {
        const filteredCountries = res.data.filter((country: any) =>
          countries.includes(country.name)
        );
        console.log("filteredCountries", filteredCountries);
        setSendingCountries(filteredCountries);
        await ReceivingCountriesApi();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ReceivingCountriesApi = async () => {
    try {
      const res: any = await getReceivingCountries().unwrap();
      if (res.code === 200) {
        const filteredCountries = res.data.filter((country: any) =>
          countries.includes(country.name)
        );
        setReceivingCountries(filteredCountries);
        await getDeliveryMethodsApi();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDeliveryMethodsApi = async () => {
    try {
      const res: any = await getDeliveryMethods().unwrap();
      if (res.code === 200) {
        setMethods(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const convertCurrency = (
    amount: any,
    sendingCountryCode: any,
    receivingCountryCode: any
  ) => {
    if (!amount || isNaN(amount)) return 0;

    // Determine exchange rate
    let rate;
    if (sendingCountryCode === "GH" && receivingCountryCode === "PK") {
      rate = exchangeRates.GHS_PKR;
    } else if (sendingCountryCode === "PK" && receivingCountryCode === "GH") {
      rate = exchangeRates.PKR_GHS;
    } else if (sendingCountryCode === receivingCountryCode) {
      // setSelectedobj({
      //   ...selectedobj,
      //   receiveingMoney: amount,
      // });
      return amount; // No conversion if same currency
    } else {
      return 0; // Unsupported currency pair
    }
    return parseFloat((amount * rate).toFixed(2)); // Convert and round
  };

  const AddUserIdentification = async () => {
    try {
      let body = {
        userId: user.id,
        identificationId: identi.type,
        identificationNumber: identi.id_no,
        expiryDate: identi.expired_date,
        issuedDate: identi.issue_date,
        countryId: 1,
        stateId: 1,
        cityId: 1,
        imgUrl: "",
      };
      await addIdentification(body)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.code == 200) {
            dispatch(setUser({ ...user, hasIdentification: true }));
            showSuccess(res.message);
          } else {
            showError(res.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.colorback }]}>
      <StatusBar
        backgroundColor={"transparent"}
        barStyle="light-content"
        translucent={true}
      />
      <KeyboardAvoidingView>
        <ScrollView>
          <LinearGradient
            colors={[Colors.linear1, Colors.linear2]}
            style={[
              Layout.fullWidth,
              {
                height: responsiveHeight(50),
                borderBottomLeftRadius: responsiveWidth(6),
                borderBottomRightRadius: responsiveWidth(6),
              },
            ]}
          >
            <View style={[Gutters.tinyMargin, Gutters.regularTMargin]}>
              <HomeHeader />
              <View>
                <HomeCurrencyNew
                  title={"From"}
                  rightTitle={"You Send:"}
                  countryname={selectedobj?.SendingCountry?.name || "Ghana"}
                  countries={SendingCountries}
                  isoCode={
                    selectedobj?.SendingCountry?.isoCode2?.toLowerCase() || "gh"
                  }
                  country={selectedobj?.SendingCountry?.name || "Ghana"}
                  onPress={() => sendingRBSheet?.current?.open()}
                  value={selectedobj?.sendingMoney}
                  onChangeText={(val: any) =>
                    setSelectedobj({
                      ...selectedobj,
                      sendingMoney: val,
                    })
                  }
                />
                <Image
                  source={Images.line}
                  style={{
                    width: "100%",
                    height: responsiveHeight(6),
                    resizeMode: "contain",
                  }}
                />
                <HomeCurrencyNew
                  title={"To"}
                  countryname={selectedobj?.receiveingCountry?.name || "Ghana"}
                  rightTitle={"Recipient receives:"}
                  countries={ReceivingCountries}
                  isoCode={
                    selectedobj?.receiveingCountry?.isoCode2?.toLowerCase() ||
                    "gh"
                  }
                  country={selectedobj?.receiveingCountry?.name || "Ghana"}
                  onPress={() => receivingRBSheet?.current?.open()}
                  receive={true}
                  receiveamount={convertCurrency(
                    parseFloat(selectedobj?.sendingMoney || 0),
                    selectedobj?.SendingCountry?.isoCode2,
                    selectedobj?.receiveingCountry?.isoCode2
                  )}
                />
              </View>
              <View
                style={[
                  Layout.row,
                  Layout.alignItemsCenter,
                  {
                    alignSelf: "center",
                  },
                ]}
              >
                <View
                  style={[
                    {
                      backgroundColor: Colors.primary,
                      height: responsiveWidth(6),
                      width: responsiveWidth(6),
                      borderRadius: responsiveWidth(5),
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Image
                    source={Images.arrow}
                    style={{
                      height: responsiveWidth(4),
                      width: responsiveWidth(4),
                    }}
                  />
                </View>
                <Text
                  style={[
                    Fonts.textSmall,
                    { color: Colors.white, marginLeft: responsiveWidth(2) },
                  ]}
                >
                  {`1 ${
                    selectedobj?.SendingCountry?.isoCode2 == "PK"
                      ? "PKR"
                      : "GHC"
                  } = ${convertCurrency(
                    parseFloat("1.0"),
                    selectedobj?.SendingCountry?.isoCode2,
                    selectedobj?.receiveingCountry?.isoCode2
                  )} ` +
                    `${
                      selectedobj?.receiveingCountry?.isoCode2 == "PK"
                        ? "PKR"
                        : "GHC"
                    }`}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View style={[Gutters.smallMargin]}>
            {/* <PaymentMethodComp
              title={"Payment Method"}
              paymentCard={"Pay with card"}
            /> */}
            <ChoosingDelMethod
              title={""}
              deliveryMethod={
                selectedobj?.deliveryMethod?.name ?? "Select Delivery Method"
              }
              onPress={() => {
                deliveryRBSheet?.current?.open();
              }}
            />
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Layout.fullWidth,
                Gutters.smallTMargin,
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "black",
                  },
                ]}
              >
                Processing Fee
              </Text>
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "black",
                  },
                ]}
              >
                {processingFee}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Layout.fullWidth,
                Gutters.smallTMargin,
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "black",
                  },
                ]}
              >
                Recipient will get:
              </Text>
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "black",
                  },
                ]}
              >
                {convertCurrency(
                  parseFloat(selectedobj?.sendingMoney || 0),
                  selectedobj?.SendingCountry?.isoCode2,
                  selectedobj?.receiveingCountry?.isoCode2
                ) || 0}
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Layout.fullWidth,
                Gutters.smallTMargin,
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "black",
                  },
                ]}
              >
                Transfer time:
              </Text>
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: "black",
                  },
                ]}
              >
                Same day
              </Text>
            </View>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
                Layout.fullWidth,
                Gutters.smallTMargin,
              ]}
            >
              <Text
                style={[
                  Fonts.textTiny,
                  Fonts.textBold,
                  {
                    color: "black",
                  },
                ]}
              >
                You will pay:
              </Text>
              <Text
                style={[
                  Fonts.textTiny,
                  Fonts.textBold,
                  {
                    color: "black",
                  },
                ]}
              >
                {totalPay}
              </Text>
            </View>
            <View style={[Gutters.smallTMargin, styles.divider]} />
            <SwtichComp
              title="Apply discount coupon"
              flag={couponFlag}
              setFlag={setCouponFlag}
            />
            {couponFlag && (
              <TextInput
                placeholder="Enter coupon code"
                autoCorrect={false}
                onChangeText={(text) => setCoupon(text)}
                value={coupon}
              />
            )}
          </View>
          <Button
            title="Select Beneficiary & Pay"
            style={[
              Gutters.smallMargin,
              {
                width: "90%",
              },
            ]}
            onPress={() => {
              if (Boolean(user?.hasIdentification) == false) {
                identificationRBSheet.current.open();
              } else {
                if (selectedobj.deliveryMethod == "") {
                  showError("Please select delivery method");
                } else {
                  if (selectedobj.sendingMoney != "") {
                    navigation.navigate("SelectBeneficiary", {
                      selectedobj: selectedobj,
                      totalPay: totalPay,
                      receivingMoney:convertCurrency(
                        parseFloat(selectedobj?.sendingMoney || 0),
                        selectedobj?.SendingCountry?.isoCode2,
                        selectedobj?.receiveingCountry?.isoCode2
                      )
                    });
                  } else {
                    showError("Please enter amount");
                  }
                }
              }
            }}
          />
          <View style={{ height: responsiveHeight(10) }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <RbsheetComp
        ref={deliveryRBSheet} // Pass the ref correctly
        comp={
          <View style={[Gutters.smallTMargin, Gutters.smallPadding]}>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textBold,
                {
                  color: "black",
                },
              ]}
            >
              Choose delivery method
            </Text>
            <View>
              <FlatList
                data={methods}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }: any) => {
                  return (
                    <MethodComp
                      image={
                        item.name == "Wallet"
                          ? Images.wallet
                          : item.name[0] == "Bank"
                          ? Images.bank
                          : ""
                      }
                      title={item.name}
                      time={"Same day"}
                      onPress={() => {
                        setSelectedobj((prev: any) => ({
                          ...prev,
                          deliveryMethod: item,
                        }));
                        deliveryRBSheet?.current?.close();
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
        }
      />
      <RbsheetComp
        height={responsiveHeight(50)}
        ref={sendingRBSheet} // Pass the ref correctly
        comp={
          <View style={[Gutters.smallTMargin, Gutters.smallPadding]}>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textBold,
                {
                  color: "black",
                },
              ]}
            >
              Select currency
            </Text>
            <View style={[Gutters.smallTMargin]}>
              <FlatList
                data={SendingCountries}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 15 }}></View>
                )}
                renderItem={({ item, index }: any) => {
                  return (
                    <SwitchCountries
                      item={item}
                      onPress={() => {
                        setSelectedobj((prev: any) => ({
                          ...prev,
                          SendingCountry: item,
                        }));
                        sendingRBSheet?.current?.close();
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
        }
      />
      <RbsheetComp
        height={responsiveHeight(50)}
        ref={receivingRBSheet} // Pass the ref correctly
        comp={
          <View style={[Gutters.smallTMargin, Gutters.smallPadding]}>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textBold,
                {
                  color: "black",
                },
              ]}
            >
              Select currency
            </Text>
            <View style={[Gutters.smallTMargin]}>
              <FlatList
                data={SendingCountries}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 15 }}></View>
                )}
                renderItem={({ item, index }: any) => {
                  return (
                    <SwitchCountries
                      item={item}
                      onPress={() => {
                        setSelectedobj((prev: any) => ({
                          ...prev,
                          receiveingCountry: item,
                        }));
                        receivingRBSheet?.current?.close();
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
        }
      />
      <RbsheetComp
        height={responsiveHeight(68)}
        ref={identificationRBSheet} // Pass the ref correctly
        comp={
          <View style={[Gutters.smallTMargin, Gutters.smallPadding]}>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textBold,
                {
                  color: "black",
                },
              ]}
            >
              Add Identification
            </Text>
            <View style={[Gutters.smallTMargin]}>
              <IdentificationComp
                data={identi}
                setData={setIdenti}
                onPress={() => {
                  AddUserIdentification();
                }}
                loading={load}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#F4F4F6",
  },
});
