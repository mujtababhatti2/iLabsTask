import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useTheme} from '../../../hooks';
  import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
  import {
    responsiveFontSize,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';
  import {Button, TextInput} from '../../../components';
  import {isValidEmail} from '../../../utils/HelperFuctions';
  
  const ForgotPassword = ({navigation, route}: any) => {
    const {
      Layout,
      Colors,
      Images,
      Gutters,
      Fonts,
      iosSafeAreaTPadding,
      NavigationColors,
    } = useTheme();
  
    const [errors, setErrors] = useState<any>({});
    const [form, setForm] = useState({
      email: '',
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
  
      if (!isValidEmail(form.email)) {
        newErrors.email = 'Please enter a valid email address.';
        valid = false;
      }
      setErrors(newErrors);
      return valid;
    };
  
    return (
      <View style={[Layout.fill, iosSafeAreaTPadding, {backgroundColor: 'white'}]}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
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
            <View>
              <Text
                style={[
                  Fonts.textBold,
                  Fonts.textRegular,
                  Gutters.smallTMargin,
                  Gutters.largeBMargin,
                  {color: Colors.black},
                ]}>
                Forget password
              </Text>
            </View>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={form.email}
              onChangeText={text => handleChange('email', text)}
              onBlur={validateForm} // Real-time validation on blur
              errorMessage={errors.email}
            />
  
            <Button
              title="Send reset instructions"
              style={[Layout.fullWidth, Gutters.largeTMargin, Gutters.tinyBMargin]}
              onPress={()=>{
                navigation.navigate('ResetPassword')
              }}
              // onPress={handleSubmit}
              // loading={load}
            />
            <Text
              style={[
                Gutters.smallTMargin,
                Fonts.textTiny,
                {textAlign: 'center'},
              ]}>
              Remember Password?{' '}
              <Text
                style={[Fonts.textBold, {color: Colors.textColor}]}
                onPress={() => navigation.navigate('Signin')}>
                Log In
              </Text>
            </Text>
            <View style={{height: responsiveHeight(5)}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  export default ForgotPassword;
  
  const styles = StyleSheet.create({});
  