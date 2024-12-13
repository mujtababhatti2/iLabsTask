import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../hooks";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Button, TextInput } from "../../../components";
import Feather from "react-native-vector-icons/Feather";
import PhoneTextInput from "../../../components/phoneInput";
import {
  isValidEmail,
  isValidPassword,
  showError,
  showSuccess,
} from "../../../utils/HelperFuctions";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useSignupMutation } from "../../../services/modules/auth";
import { useGetAllCountriesMutation } from "../../../services/modules/app";

const SignupScreen = ({ navigation, route }: any) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  const [flag, setFlag] = useState(true);
  const [cflag, setCFlag] = useState(true);
  const [phoneCountryCode, setPhoneCountryCode] = useState<any>("GH");
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef<any>(null);
  const [callingCode, setCallingCode] = useState<any>("+233");
  const [countries, setCountries] = useState([]);
  const [getAllCountries, { isLoading }] = useGetAllCountriesMutation();
  const [signup, { isLoading: load }] = useSignupMutation();

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      await getAllCountries()
        .unwrap()
        .then((res: any) => {
          setCountries(res.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name: any, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
      valid = false;
    }
    if (!form.firstName) {
      newErrors.firstName = "First name is required.";
      valid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = "Last name is required.";
      valid = false;
    }
    if (!isValidPassword(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters, including a number or symbol.";
      valid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async () => {
    const same:any= countries.find((item: any) => item.dialingCode == callingCode);
    if (validateForm()) {
      let data = {
        email: form.email,
        phoneCode: callingCode,
        phoneNumber: form.phoneNumber.replace(/^\+/, ''),
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        createPassword: form.password,
        confirmPassword: form.confirmPassword,
        countryId: same.id,
      };
      console.log(data);
      await signup(data)
        .unwrap()
        .then((res: any) => {
          console.log(">>>>>>", res);
          if (res.code == 201) {
            showSuccess(res.message);
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log({ err });
          if (err.status == 409) {
            showError(err.data.message);
          } else {
            showError(err.data.message);
          }
        });
    } else {
      showError("All fields are required!");
    }
  };
  return (
    <View
      style={[Layout.fill, iosSafeAreaTPadding, { backgroundColor: "white" }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[Layout.fill]}
      >
        <ScrollView
          contentContainerStyle={[Gutters.smallMargin]}
          showsVerticalScrollIndicator={false}
        >
          <FontAwesome6
            name={"arrow-left"}
            size={responsiveFontSize(3)}
            color={"black"}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View>
            <Text
              style={[
                Fonts.textBold,
                Fonts.textRegular,
                Gutters.smallTMargin,
                { color: Colors.black },
              ]}
            >
              Register
            </Text>
            <Text
              style={[
                Fonts.textTiny,
                Gutters.tinyVMargin,
                // Fonts.textRegular,
                { color: "grey" },
              ]}
            >
              Kindly note that we require you to input your name as it appears
              on your valid ID
            </Text>
          </View>
          <TextInput
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            onBlur={validateForm} // Real-time validation on blur
            errorMessage={errors.email}
          />
          <PhoneTextInput
            setPhoneCountryCode={setPhoneCountryCode}
            setPhoneNumber={setPhoneNumber}
            setShowPhoneCountryPicker={setShowPhoneCountryPicker}
            phoneInput={phoneInput}
            phoneNumber={phoneNumber}
            phoneCountryCode={phoneCountryCode}
            showPhoneCountryPicker={showPhoneCountryPicker}
            value={form.email}
            onChangeText={(text: any) => handleChange("phoneNumber", text)}
            onBlur={validateForm} // Real-time validation on blur
            errorMessage={errors.phoneNumber}
            setCallingCode={setCallingCode}
          />
          <TextInput
            placeholder="First name"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.firstName}
            onChangeText={(text: any) => handleChange("firstName", text)}
            onBlur={validateForm}
            errorMessage={errors.firstName}
          />
          <TextInput
            placeholder="Middle name (Optional)"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.middleName}
            onChangeText={(text: any) => handleChange("middleName", text)}
            onBlur={validateForm}
            errorMessage={errors.middleName}
          />
          <TextInput
            placeholder="Last name"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.lastName}
            onChangeText={(text: any) => handleChange("lastName", text)}
            onBlur={validateForm}
            errorMessage={errors.lastName}
          />
          <TextInput
            placeholder="Create Password"
            secureTextEntry={flag}
            autoCapitalize="none"
            autoCorrect={false}
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            onBlur={validateForm}
            errorMessage={errors.password}
            rightIcon={
              <Feather
                name={flag ? "eye-off" : "eye"}
                size={responsiveFontSize(2.5)}
                color={"black"}
                style={{ transform: [{ rotate: "180deg" }] }}
                onPress={() => setFlag(!flag)}
              />
            }
          />
          <Text style={[Gutters.tinyVMargin, { fontSize: 11 }]}>
            Minimum of 8 characters, with upper or lower case, and a number, or
            a symbol
          </Text>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={cflag}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={
              <Feather
                name={cflag ? "eye-off" : "eye"}
                size={responsiveFontSize(2.5)}
                color={"black"}
                style={{ transform: [{ rotate: "180deg" }] }}
                onPress={() => setCFlag(!cflag)}
              />
            }
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            onBlur={validateForm}
            errorMessage={errors.confirmPassword}
          />
          <Button
            title="Sign Up"
            style={[Layout.fullWidth, Gutters.largeTMargin]}
            onPress={handleSubmit}
            loading={load}
          />
          <Text
            style={[
              Gutters.smallTMargin,
              Fonts.textTiny,
              { textAlign: "center" },
            ]}
          >
            Already have an account?{" "}
            <Text
              style={[Fonts.textBold, { color: Colors.textColor }]}
              onPress={() => navigation.navigate("Signin")}
            >
              Log In
            </Text>
          </Text>
          <View style={{ height: responsiveHeight(5) }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
