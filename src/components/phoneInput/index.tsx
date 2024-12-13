import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import {Layout} from '../../theme';
import {useTheme} from '../../hooks';
import { ErrorMessage } from 'formik';
interface Compprops {
  setPhoneCountryCode?: any;
  setPhoneNumber?: any;
  setShowPhoneCountryPicker?: any;
  phoneInput?: any;
  phoneNumber?: string;
  phoneCountryCode?: any;
  showPhoneCountryPicker?: any;
  errorMessage?: any;
  onChangeText?: any;
  onBlur?: any;
  value?: any;
  setCallingCode?: any;
}

const PhoneTextInput = ({
  setPhoneCountryCode,
  setPhoneNumber,
  setShowPhoneCountryPicker,
  phoneInput,
  phoneNumber,
  phoneCountryCode,
  showPhoneCountryPicker,
  errorMessage,
  onChangeText,
  value,
  onBlur,
  setCallingCode
}: Compprops) => {
  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,

  } = useTheme();
  const handleCountrySelect = (country: any) => {
    console.log('Selected country:', country);
    setPhoneCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    const newPhoneNumber = `+${country.callingCode[0]}`;
    setPhoneNumber(newPhoneNumber);
    if (phoneInput.current) {
      phoneInput.current.selectCountry(country.cca2.toLowerCase());
      phoneInput.current.setValue(newPhoneNumber);
    }
    setShowPhoneCountryPicker(false);
  };
  return (
    <>
      <View
        style={[
          Layout.fullWidth,
          Gutters.tinyVMargin,
          {
            backgroundColor: '#F9FAFA',
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
          },
        ]}>
        <View style={[Gutters.tinyMargin]}>
          <PhoneInput
            ref={phoneInput}
            style={styles.input}
            initialValue={value}
            initialCountry={phoneCountryCode.toLowerCase()}
            onPressFlag={() => setShowPhoneCountryPicker(true)}
            onChangePhoneNumber={onChangeText}
            autoFormat
            textProps={{
              maxLength: 15,
              onBlur: onBlur,
            }}
          />

          <CountryPicker
            countryCode={phoneCountryCode}
            visible={showPhoneCountryPicker}
            onSelect={handleCountrySelect}
            onClose={() => setShowPhoneCountryPicker(false)}
            withFlagButton={false}
            withFlag={true}
            withFilter
            withCloseButton
            withModal={true}
          />
        </View>
      </View>
      {errorMessage && (
        <Text style={{
          fontSize:12,
          color: 'red',
        }}>{errorMessage}</Text>
      )}
    </>
  );
};

export default PhoneTextInput;

const styles = StyleSheet.create({
  input: {},
});
