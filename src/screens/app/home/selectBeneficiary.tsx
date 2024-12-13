import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../hooks";
import { Button, Header, TextInput } from "../../../components";
import { Icon } from "react-native-elements";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import RbsheetComp from "../../../components/appComp/rbsheetComp";
import DeleteRbsheetComp from "../../../components/appComp/deleteRBComp";
import { Colors } from "../../../theme/Variables";
import {
  useCreateBeneficiaryMutation,
  useGetAllCountriesMutation,
  useGetBeneficiariesMutation,
  useGetTransactionsPurposesMutation,
  useInitiateTransactionMutation,
  usePayInitiateTransactionMutation,
} from "../../../services/modules/app";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";
import { showError, showSuccess } from "../../../utils/HelperFuctions";
import RNPickerSelect from "react-native-picker-select";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhoneTextInput from "../../../components/phoneInput";
import WalletCard from "../../../components/appComp/carddesign";

const SelectBeneficiary = ({ navigation, route }: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  const { selectedobj, totalPay, receivingMoney } = route.params;
  const { user }: any = useSelector<any>(
    (state: { auth: AuthState }) => state.auth
  );
  const addBemeficiaries = useRef<any>(null);
  const deleteRb = useRef<any>(null);
  const [search, setSearch] = React.useState("");
  const [beneData, setBeneData] = useState({
    first_name: "",
    last_name: "",
    phoneCode: "",
    phoneNumber: "",
  });
  console.log("params.......", selectedobj, totalPay, receivingMoney);
  const [data, setData] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [purposes, setPurposes] = useState([]);
  const [phoneCountryCode, setPhoneCountryCode] = useState<any>("GH");
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef<any>(null);
  const [callingCode, setCallingCode] = useState<any>("+233");
  const [countries, setCountries] = useState([]);
  const [getAllCountries, { isLoading: Load }] = useGetAllCountriesMutation();
  const [getBeneficiaries, { isLoading }] = useGetBeneficiariesMutation();
  const [createBeneficiary, { isLoading: beneLoad }] =
    useCreateBeneficiaryMutation();
  const [getTransactionsPurposes, { isLoading: transLoad }] =
    useGetTransactionsPurposesMutation();
  const [initiateTransaction, { isLoading: transload }] =
    useInitiateTransactionMutation();
  const [PayInitiateTransaction, { isLoading: payLoad }] =
    usePayInitiateTransactionMutation();
  useEffect(() => {
    getAllBeneficiaries();
  }, []);
  const getAllBeneficiaries = async () => {
    try {
      await getBeneficiaries({ user: user.id })
        .unwrap()
        .then((res: any) => {
          console.log("Beneficiary.......", res);
          if (res.code == 200) {
            const pickerData = res.data.map((item: any) => ({
              label: `${item.firstName} ${item.lastName} (+${item.phoneNumber})`,
              value: item.id,
            }));
            setData(pickerData);
          } else {
            showError(res.message);
          }
          getCountries();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getCountries = async () => {
    try {
      await getAllCountries()
        .unwrap()
        .then((res: any) => {
          setCountries(res.data);
          getTransPurposes();
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getTransPurposes = async () => {
    try {
      await getTransactionsPurposes()
        .unwrap()
        .then((res: any) => {
          console.log(res);
          const pickerData = res.data.map((item: any) => ({
            label: item.purpose,
            value: item.id,
          }));
          setPurposes(pickerData);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({ item, index }: any) => {
    return (
      <>
        <View style={[Layout.fullWidth, Gutters.tinyVMargin]}>
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
            ]}
          >
            <View>
              <Image
                source={Images.logo}
                style={{
                  width: responsiveWidth(10),
                  height: responsiveWidth(10),
                  borderRadius: responsiveWidth(10),
                  borderWidth: 1,
                  borderColor: Colors.primary,
                }}
              />
            </View>
            <View style={{ width: "60%" }}>
              <Text
                style={[Fonts.textBold, Fonts.textSmall, { color: "black" }]}
              >
                {item.name}
              </Text>
              <Text style={[{ color: "grey", fontSize: 12 }]}>
                {item.country}
              </Text>
            </View>
            <View style={[Layout.row, Layout.alignItemsCenter]}>
              <Icon
                name="edit-2"
                type="feather"
                size={20}
                color={Colors.black}
                style={{ marginRight: responsiveWidth(5) }}
              />
              <Icon
                name="trash"
                type="feather"
                size={20}
                color={"red"}
                onPress={() => {
                  deleteRb.current.open();
                }}
              />
            </View>
          </View>
        </View>
        {index < data.length - 1 ? <View style={styles.divider} /> : null}
      </>
    );
  };

  const addBeneficiaryApi = async () => {
    const same: any = countries.find(
      (item: any) => item.dialingCode == callingCode
    );

    //
    try {
      let data = {
        userId: user.id,
        firstName: beneData.first_name,
        middleName: "",
        lastName: beneData.last_name,
        motherMaidenName: "",
        phoneCode: callingCode,
        phoneNumber: beneData.phoneNumber.replace(/^\+/, ""),
        relationship: "",
        countryId: same.id,
        stateId: 1,
        cityId: 1,
      };
      console.log({ data });
      await createBeneficiary(data)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.code == 200) {
            showSuccess(res.message);
            getAllBeneficiaries();
            addBemeficiaries.current?.close();
            setBeneData({
              first_name: "",
              last_name: "",
              phoneCode: "",
              phoneNumber: "",
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleiniatePay = async () => {
    if (selectedValue == null) {
      showError("Please select a beneficiary");
      return;
    }
    if (purpose == null) {
      showError("Please select a purpose");
      return;
    }
    let data = {
      sendAmount: selectedobj.sendingMoney,
      receiveAmount: receivingMoney,
      sendingCountryId: selectedobj.SendingCountry.id,
      receivingCountryId: selectedobj.receiveingCountry.id,
      paymentMethodId: 1,
      senderId: user.id,
      beneficiaryId: selectedValue,
      deliveryMethodId: selectedobj.deliveryMethod.id,
      transactionPurposeId: purpose,
      identificationId: 1,
      processingFee: selectedobj.processingFee,
      totalPay: totalPay,
    };
    try {
      await initiateTransaction(data)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.code == 201) {
            handlePay(res.data.guidId);
          }else{
            showError(res.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async (id: any) => {
    try {
      let data = {
        userId: user.id,
        cartId: id,
      };
      await PayInitiateTransaction(data)
        .unwrap()
        .then((res:any) => {
          console.log(res);
          navigation.navigate("TransactionComplete", {
            data:res.data
          })
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
        title="Beneficiary & Pay"
        goBack
        hideNotificationsicon={true}
        navigation={navigation}
      />
      <View style={[Gutters.smallMargin]}>
        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Layout.alignItemsCenter,
          ]}
        >
          <View style={styles.inputAndroid}>
            <Text
              style={{
                fontSize: 10,
                color: Colors.black,
                marginLeft: 5,
              }}
            >
              Beneficiary
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)}
              items={data}
              placeholder={{ label: "Select a contact", value: null }}
              value={selectedValue}
              useNativeAndroidPickerStyle={false}
              style={{
                // inputIOS: styles.inputIOS,
                // inputAndroid: styles.inputAndroid,
                placeholder: styles.placeholder,
                iconContainer: styles.iconContainer,
              }}
              Icon={() => (
                <Ionicons name="chevron-down" size={20} color="#333" />
              )}
            />
          </View>
          {isLoading ? (
            <View style={styles.addView}>
              <ActivityIndicator size="small" color={Colors.white} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addView}
              onPress={() => {
                addBemeficiaries.current.open();
              }}
            >
              <Icon
                name="plus"
                type="feather"
                size={responsiveFontSize(3)}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Layout.alignItemsCenter,
            Gutters.tinyTMargin,
          ]}
        >
          <View
            style={[
              styles.inputAndroid,
              {
                width: "100%",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 10,
                color: Colors.black,
                marginLeft: 5,
              }}
            >
              Purpose of Transaction
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setPurpose(value)}
              items={purposes}
              placeholder={{ label: "Select a purpose", value: null }}
              value={purpose}
              useNativeAndroidPickerStyle={false}
              style={{
                placeholder: styles.placeholder,
                iconContainer: styles.iconContainer,
              }}
              Icon={() => (
                <Ionicons name="chevron-down" size={20} color="#333" />
              )}
            />
          </View>
        </View>
        <WalletCard onPress={handleiniatePay} />
        {/* <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View> */}
        {/* <Button
        title="Pay Now"
        style={[
          Gutters.regularTMargin
          // Layout.absolute,
          // { width: "90%", alignSelf: "center", bottom: 20 },
        ]}
      /> */}
      </View>
      <RbsheetComp
        height={responsiveHeight(52)}
        ref={addBemeficiaries}
        comp={
          <View style={[Gutters.smallMargin]}>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textBold,
                {
                  color: "black",
                },
              ]}
            >
              Add Beneficiaries
            </Text>
            <ScrollView showsVerticalScrollIndicator={false} style={[Gutters.smallTMargin]}>
              <View
                style={[
                  Layout.fullWidth,
                  Gutters.tinyHPadding,
                  {
                    backgroundColor: Colors.textinputColor,
                    borderRadius: 10,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.textGray200,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  First Name
                </Text>
                <TextInput
                  placeholder="Enter first name"
                  value={beneData.first_name}
                  onChangeText={(value: any) => {
                    setBeneData({ ...beneData, first_name: value });
                  }}
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                  }}
                />
              </View>
              <View
                style={[
                  Layout.fullWidth,
                  Gutters.tinyTMargin,
                  Gutters.tinyHPadding,
                  {
                    backgroundColor: Colors.textinputColor,
                    borderRadius: 10,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.textGray200,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  Last Name
                </Text>
                <TextInput
                  placeholder="Enter last name"
                  value={beneData.last_name}
                  onChangeText={(value: any) => {
                    setBeneData({ ...beneData, last_name: value });
                  }}
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                  }}
                />
              </View>
              <View
                style={[
                  Layout.fullWidth,
                  Gutters.tinyTMargin,
                  Gutters.tinyHPadding,
                  {
                    backgroundColor: Colors.textinputColor,
                    borderRadius: 10,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.textGray200,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  Phone Number
                </Text>
                <PhoneTextInput
                  setPhoneCountryCode={setPhoneCountryCode}
                  setPhoneNumber={setPhoneNumber}
                  setShowPhoneCountryPicker={setShowPhoneCountryPicker}
                  phoneInput={phoneInput}
                  phoneNumber={phoneNumber}
                  phoneCountryCode={phoneCountryCode}
                  showPhoneCountryPicker={showPhoneCountryPicker}
                  value={beneData.phoneNumber}
                  onChangeText={
                    (text: any) => {
                      setBeneData({ ...beneData, phoneNumber: text });
                    }
                    // handleChange("phoneNumber", text)
                  }
                  // onBlur={validateForm} // Real-time validation on blur
                  // errorMessage={errors.phoneNumber}
                  setCallingCode={setCallingCode}
                />
              </View>
            <Button
              title="Add Beneficiary"
              onPress={() => {
                addBeneficiaryApi();
              }}
              style={[Gutters.smallTMargin]}
              loading={beneLoad}
            />
            <View style={{height:  responsiveHeight(10)}} />
            </ScrollView>
          </View>
        }
      />
      {/* <RbsheetComp
        height={550}
        ref={deleteRb}
        comp={
          <View style={[Gutters.smallMargin, Layout.alignItemsCenter]}>
            <Text
              style={[
                Fonts.textBold,
                Fonts.textRegular,
                {textAlign: 'center'},
              ]}>
              Delete beneficiary
            </Text>
            <View style={[Gutters.largeMargin, styles.imageBackground]}>
              <Image
                source={Images.trash}
                style={{
                  width: responsiveWidth(15),
                  height: responsiveWidth(15),
                }}
              />
            </View>
            <View style={[]}>
              <Text
                style={[
                  Fonts.textBold,
                  Fonts.textRegular,
                  {textAlign: 'center', color: 'black'},
                ]}>
                Are you sure you want to Delete this beneficiary?
              </Text>
              <Text
                style={[
                  Gutters.tinyTMargin,
                  {
                    textAlign: 'center',
                    color: 'grey',
                    fontSize: responsiveFontSize(1.8),
                  },
                ]}>
                You can always re-add the beneficiary anytime you feel like
              </Text>
            </View>
            <Button
              title="Delete"
              style={[Gutters.regularTMargin, Layout.fullWidth]}
              bcolor={'#DF0C0C'}
              onPress={() => {
                deleteRb.current.close();
              }}
            />
            <TouchableOpacity
              style={[Gutters.smallMargin]}
              onPress={() => {
                deleteRb.current.close();
              }}>
              <Text
                style={[Fonts.textSmall, {textAlign: 'center', color: 'grey'}]}>
                No, cancel
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <TouchableOpacity style={styles.addView}>
        <Icon name="plus" type="feather" size={responsiveFontSize(4)} color={Colors.white} />
      </TouchableOpacity> */}
    </View>
  );
};

export default SelectBeneficiary;

const styles = StyleSheet.create({
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#F4F4F6",
    alignSelf: "center",
    marginVertical: responsiveHeight(0.5),
  },
  imageBackground: {
    backgroundColor: "#FCE4E4",
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(25),
    justifyContent: "center",
    alignItems: "center",
  },
  addView: {
    backgroundColor: Colors.primary,
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(12),
    justifyContent: "center",
    alignItems: "center",
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: "#333",
    paddingRight: 30,
    backgroundColor: Colors.inputBackground,
    // To ensure the text is not cut off
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: "#333",
    backgroundColor: Colors.inputBackground,
    width: responsiveWidth(80),
    // To ensure the text is not cut off
  },
  placeholder: {
    color: "#999",
    fontSize: 16,
  },
  iconContainer: {
    top: 10, // Adjust position for alignment
    right: 12, // Position the icon on the right
  },
});
