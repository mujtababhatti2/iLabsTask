import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../hooks';
import {isValidPassword} from '../../../utils/HelperFuctions';
import {Button, TextInput} from '../../../components';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ResetPassword = ({navigation, route}: any) => {
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
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: any, value: any) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: {[key: string]: string} = {};
    if (!isValidPassword(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters, including a number or symbol.';
      valid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  return (
    <View style={[Layout.fill, iosSafeAreaTPadding]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[Layout.fill]}>
        <ScrollView
          contentContainerStyle={[Gutters.smallMargin]}
          showsVerticalScrollIndicator={false}>
          <FontAwesome6
            name={'arrow-left'}
            size={responsiveFontSize(3)}
            color={'black'}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={[Gutters.largeBMargin]}>
            <Text
              style={[
                Fonts.textBold,
                Fonts.textRegular,
                Gutters.smallTMargin,
                {color: Colors.black},
              ]}>
              Reset password
            </Text>
          </View>
          <TextInput
            placeholder="New Password"
            secureTextEntry={flag}
            autoCapitalize="none"
            autoCorrect={false}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
            onBlur={validateForm}
            errorMessage={errors.password}
            rightIcon={
              <Feather
                name={flag ? 'eye-off' : 'eye'}
                size={responsiveFontSize(2.5)}
                color={'black'}
                style={{transform: [{rotate: '180deg'}]}}
                onPress={() => setFlag(!flag)}
              />
            }
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={cflag}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={
              <Feather
                name={cflag ? 'eye-off' : 'eye'}
                size={responsiveFontSize(2.5)}
                color={'black'}
                style={{transform: [{rotate: '180deg'}]}}
                onPress={() => setCFlag(!cflag)}
              />
            }
            value={form.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
            onBlur={validateForm}
            errorMessage={errors.confirmPassword}
          />
          <Button
            title="Reset Password"
            style={[
              Layout.fullWidth,
              Gutters.largeTMargin,
              Gutters.tinyBMargin,
            ]}
            onPress={() => {
              navigation.navigate('Signin');
            }}
            // onPress={handleSubmit}
            // loading={load}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
