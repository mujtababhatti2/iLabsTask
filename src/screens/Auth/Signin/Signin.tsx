import {LoginBody, useLoginMutation} from '../../../services/modules/auth';
import {LoaderState} from '../../../store/loader';
import {ThemeState} from '../../../store/theme';
import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {Brand, Button, TextInput} from '../../../components';
import {Form, FormField, SubmitButton} from '../../../components/Form';
import {useTheme} from '../../../hooks';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginButton from '../../../components/Button/loginButton';
import Antdesign from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  isValidEmail,
  isValidPassword,
  showError,
} from '../../../utils/HelperFuctions';
import {setToken, setUser} from '../../../store/auth';


const Signin = ({navigation, route}: any) => {
  const {width, height} = Dimensions.get('window');
  const [flag, setFlag] = useState(true);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  // const { fcmToken, deviceId } = useSelector(
  //     (state: { theme: ThemeState }) => state.theme,
  // );

  const {
    Layout,
    Colors,
    Images,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  // const [securePass, setSecurePass] = useState(true);

  const validateForm = () => {
    let valid = true;
    const newErrors: {[key: string]: string} = {};

    if (!isValidEmail(data?.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!isValidPassword(data.password)) {
      newErrors.password =
        'Password must be at least 8 characters, including a number or symbol.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      const values = {
        email: data.email,
        password: data.password,
      };
      await login(values)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          if (res.code == 401) {
            showError(res.message);
          } else if (res.code == 200) {
            dispatch(setToken(res.data.token));
            dispatch(setUser(res.data.userDetails));
            navigation.navigate('AppStack')
          }else{
            showError(res.message);
          }
        })
        .catch(error => {
          console.log({error});
          showError(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (values: LoginBody, { resetForm }: any) => {
  //     try {
  //
  //     } catch (error) {
  //         console.log('Login failed:', error);
  //     }

  // };

  return (
    <View style={[Layout.fill, iosSafeAreaTPadding]}>
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
          {/* <Image
            source={Images.logo}
            resizeMode="contain"
            style={[
              {
                alignSelf: 'center',
                width: responsiveWidth(60),
                height: responsiveWidth(30),
              },
            ]}
          /> */}
          <View>
            <Text
              style={[
                Fonts.textBold,
                Fonts.textRegular,
                Gutters.smallTMargin,
                {color: Colors.black},
              ]}>
              Welcome back
            </Text>
            <Text
              style={[
                Fonts.textTiny,
                Gutters.tinyVMargin,
                // Fonts.textRegular,
                {color: 'grey'},
              ]}>
              <Text style={[Gutters.smallTMargin, Fonts.textTiny]}>
                New to PayGiant?{' '}
                <Text
                  style={[{color: Colors.textColor}]}
                  onPress={() => navigation.navigate('Signup')}>
                  Create an account
                </Text>
              </Text>
            </Text>
          </View>
          <View style={{height: responsiveHeight(5)}} />
          <TextInput
            textFieldName="Email address"
            placeholder="Email address"
            width={Layout.fullWidth}
            onChangeText={text => {
              setData({...data, email: text});
            }}
            onBlur={validateForm}
            errorMessage={errors.email}
            keyboardType="email-address"
          />
          <TextInput
            textFieldName="Enter Password"
            placeholder="Password"
            secureTextEntry={flag}
            rightIcon={
              <Feather
                name={flag ? 'eye-off' : 'eye'}
                size={responsiveFontSize(2.5)}
                color={'black'}
                style={{transform: [{rotate: '180deg'}]}}
              />
            }
            onChangeText={text => {
              setData({...data, password: text});
            }}
            handleIcon={() => setFlag(!flag)}
            onBlur={validateForm}
            errorMessage={errors.password}
          />
          <View
            style={[
              Gutters.tinyVMargin,
              Layout.justifyContentCenter,
              Layout.fullWidth,
            ]}>
            <Text style={[{color: Colors.black}]}>
              Forgot your password?{' '}
              <Text
                style={[{color: Colors.textColor}]}
                onPress={() => navigation.navigate('ForgetPassword')}>
                Resent it here
              </Text>
            </Text>
          </View>
          <Button
            title="Log In"
            style={[Layout.fullWidth, Gutters.largeTMargin]}
            onPress={() => {
              handleSubmit();
            }}
            loading={isLoading}
          />
          <View
            style={[
              Layout.fullWidth,
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
              Gutters.largeVMargin,
            ]}>
            <View
              style={[
                {backgroundColor: 'lightgrey', height: 0.5, width: '40%'},
              ]}
            />
            <Text
              style={[
                Fonts.textTiny,
                // Fonts.textRegular,
                {color: Colors.primary},
              ]}>
              OR
            </Text>
            <View
              style={[
                {width: '40%', backgroundColor: 'lightgrey', height: 0.5},
              ]}
            />
          </View>
          <LoginButton
            onPress={() => {}}
            Icon={
              <Antdesign
                name="scan1"
                size={responsiveFontSize(2)}
                color={Colors.primary}
              />
            }
            text={'Login with Face ID'}
          />
          <LoginButton
            Icon={
              <FontAwesome
                name="keyboard-o"
                size={responsiveFontSize(2)}
                color={Colors.primary}
              />
            }
            text={'Login with Pin'}
            onPress={() => {}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({});
