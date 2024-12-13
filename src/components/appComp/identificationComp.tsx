import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks";
import { useAddIdentificationMutation, useGetIdentificationMutation } from "../../services/modules/app";
import Picker from "react-native-picker-select";
import RNPickerSelect from "react-native-picker-select";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import { Icon } from "react-native-elements";
import Button from "../Button/Button";
const IdentificationComp = ({ data, setData, onPress, loading }: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  const [types, setTypes] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expiryshowDatePicker, setExpiryShowDatePicker] = useState(false);
  const [getIdentification, { isLoading }] = useGetIdentificationMutation();

  useEffect(() => {
    getIdentificationType();
  }, []);

  const getIdentificationType = async () => {
    let res: any = await getIdentification();
    if (res) {
      const pickerData =
        res &&
        res.data &&
        res.data.data.map((item: any) => ({
          label: item.identificationType,
          value: item.id.toString(),
        }));
      console.log(pickerData);
      setTypes(pickerData);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set" && selectedDate) {
      if (Platform.OS === "ios") {
        // setFieldValue('licenseExpiryDate', selectedDate);
        setData({ ...data, issue_date: selectedDate });
      } else {
        setShowDatePicker(false);
        setData({ ...data, issue_date: selectedDate });
      }
    } else if (event.type === "dismissed") {
      setShowDatePicker(false);
    }
  };
  const handleExpiryDateChange = (
    event: any,
    selectedDate: Date | undefined
  ) => {
    if (event.type === "set" && selectedDate) {
      if (Platform.OS === "ios") {
        // setFieldValue('licenseExpiryDate', selectedDate);
        setData({ ...data, expired_date: selectedDate });
      } else {
        setData({ ...data, expired_date: selectedDate });
        setExpiryShowDatePicker(false);
      }
    } else if (event.type === "dismissed") {
      setExpiryShowDatePicker(false);
    }
  };

  return (
    <View style={[Layout.fullWidth]}>
      <View style={styles.pickerWrapper}>
        <Text
          style={{
            fontSize: 10,
            color: Colors.textGray200,
            marginTop: 5,
            marginLeft: 10,
            marginBottom: -10,
          }}
        >
          Identification Type
        </Text>
        <RNPickerSelect
          onValueChange={(value) => {
            console.log(value);
            setData({ ...data, type: value });
          }}
          items={types}
          style={pickerSelectStyles}
          placeholder={{
            label: "Select an option...",
            value: null,
          }}
        />
      </View>
      <View style={[Gutters.tinyTMargin]}>
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
              fontSize: 10,
              color: Colors.textGray200,
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            Enter ID No
          </Text>
          <TextInput
            placeholder="Enter ID number"
            value={data.id_no}
            onChangeText={(value: any) => {
              setData({ ...data, id_no: value });
            }}
            style={{
              fontSize: 15,
              color: Colors.black,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: responsiveFontSize(1.3),
            color: Colors.textGray200,
            marginTop: 5,
            marginLeft: 5,
          }}
        >
          XXXXXXXXXX where X is a digit (Variable Length)
        </Text>

        <View
          style={[
            Layout.fullWidth,
            Gutters.tinyTMargin,
            {
              backgroundColor: Colors.textinputColor,
              borderRadius: 10,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 10,
              color: Colors.textGray200,
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            Issue Date
          </Text>
          <TouchableOpacity
            onPress={() => Platform.OS === "android" && setShowDatePicker(true)}
          >
            <Text
              style={[
                Fonts.textSmall,
                Gutters.tinyMargin,
                {
                  color: Colors.black,
                  marginLeft: responsiveWidth(1),
                },
              ]}
            >
              {data?.issue_date
                ? moment(data?.issue_date).format("DD/MM/YY")
                : "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={data?.issue_date || new Date()}
            mode="date"
            display={"spinner"}
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
        <View
          style={[
            Layout.fullWidth,
            Gutters.tinyTMargin,
            {
              backgroundColor: Colors.textinputColor,
              borderRadius: 10,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 10,
              color: Colors.textGray200,
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            Expiry Date
          </Text>
          <TouchableOpacity
            onPress={() =>
              Platform.OS === "android" && setExpiryShowDatePicker(true)
            }
          >
            <Text
              style={[
                Fonts.textSmall,
                Gutters.tinyMargin,
                {
                  color: Colors.black,
                  marginLeft: responsiveWidth(1),
                },
              ]}
            >
              {data?.expired_date
                ? moment(data?.expired_date).format("DD/MM/YY")
                : "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>
        {expiryshowDatePicker && (
          <DateTimePicker
            value={data?.expired_date || new Date()}
            mode="date"
            display={"spinner"}
            minimumDate={new Date()}
            onChange={handleExpiryDateChange}
          />
        )}
        <View
          style={[
            Layout.fullWidth,
            Gutters.tinyTMargin,

            {
              backgroundColor: Colors.textinputColor,
              borderRadius: 10,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 10,
              color: Colors.textGray200,
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            Upload ID Image*
          </Text>
          <TouchableOpacity>
            <View
              style={[
                Layout.row,
                Gutters.tinyPadding,
                Gutters.smallMargin,
                {
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                },
              ]}
            >
              <Icon
                name="upload"
                type="antdesign"
                size={20}
                color={Colors.black}
              />
              <Text
                style={[
                  Fonts.textTiny,
                  {
                    color: Colors.black,
                    marginLeft: responsiveWidth(3),
                    fontWeight: "600",
                  },
                ]}
              >
                Click to upload image
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Button 
        loading={loading}
        title="Add now" onPress={onPress} style={[Gutters.smallTMargin,{
          borderRadius: 12,
        }]}/>
      </View>
    </View>
  );
};

export default IdentificationComp;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    color: "black",
    height: responsiveHeight(5),
    lineHeight: responsiveHeight(4),
  },
  inputAndroid: {
    fontSize: 12,
    color: "black",
    height: responsiveHeight(6),
    lineHeight: responsiveHeight(4),
  },
});
const styles = StyleSheet.create({
  pickerWrapper: {
    overflow: "hidden", // Ensure the borderRadius is respected
    backgroundColor: "#1077C21A",
    borderRadius: 15,
  },
});
