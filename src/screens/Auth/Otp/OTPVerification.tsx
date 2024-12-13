import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import OtpInputs from 'react-native-otp-inputs';
import {useTheme} from '../../../hooks';
import {Brand, Button} from '../../../../src/components';
import {
  useSendNotificationMutation,
  useVerifyOTPMutation,
} from '../../../services/modules/auth';
import {showError, showSuccess} from '../../../utils/HelperFuctions';
import LoadingModal from '../../../components/Loader/LoadingModal';
import {useDispatch} from 'react-redux';
import {setToken} from '../../../store/auth';
import {generalErrorCatch} from '../../../services/api';

const OTPVerification = ({navigation, route}: any) => {
  const {
    Layout,
    Colors,
    Gutters,
    Fonts,
    iosSafeAreaTPadding,
    NavigationColors,
  } = useTheme();
  const [timer, setTimer] = useState(20);
  const [code, setCode] = useState('');
  const [disable, setDisable] = useState(true);

  const [verifyOTP, {data, error, isLoading: load}] = useVerifyOTPMutation();
  const dispatch = useDispatch();
  const [sendNotification] = useSendNotificationMutation();

  // useEffect(() => {
  //   if (otpPayload?.screenName === 'signin') {
  //     handleResendOTP();
  //   }
  // }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleCode = (code: string) => {
    setCode(code);
    if (code.length === 4) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  // const handleResendOTP = () => {
  //   generateOTP(otpPayload)
  //     .unwrap()
  //     .then((data: any) => {
  //       if (data.statusCode === 200) {
  //         showSuccess(data.messages[0], 3000);
  //         // resend ? setTimer(5) : null ;
  //         setTimer(20);
  //       } else {
  //         showError(data.messages[0]);
  //       }
  //     })
  //     .catch((e: any) => {
  //       generalErrorCatch(e);
  //     });
  // };



  return (
    <View style={[Layout.fill, iosSafeAreaTPadding]}>
      {/* <LinearGradient
        colors={['rgb(84, 35, 73)', Colors.gradientRed]}
        locations={[0, 0.3]}
        style={[Layout.fill, iosSafeAreaTPadding]}
      >
        <StatusBar translucent backgroundColor={'transparent'} />
        <Brand height={150} width={250} />
        <Text
          style={[
            Fonts.textCustom,
            Fonts.textCenter,
            Gutters.regularVMargin,
            { color: Colors.white },
          ]}
        >
          Verify OTP
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[Layout.fill]}
        >
          <ScrollView
            style={{
              backgroundColor: NavigationColors.background,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
            contentContainerStyle={[Gutters.regularPadding]}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textCenter,
                Gutters.regularVMargin,
                Fonts.textBold,
              ]}
            >
              Enter the OTP-code sent to your e-mail.
            </Text>

            <OtpInputs
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}
              autoFocus={true}
              numberOfInputs={4}
              autofillFromClipboard={false}
              handleChange={otp => handleCode(otp)}
              inputStyles={{
                borderRadius: 8,
                color: Colors.text,
                backgroundColor: Colors.inputBackground,
                fontSize: 18,
                paddingVertical: Platform.OS === 'ios' ? 20 : 12,
                paddingHorizontal: Platform.OS === 'ios' ? 25 : 15,
                textAlign: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />

            {timer > 0 && (
              <View style={[Gutters.regularVMargin, { alignItems: 'center' }]}>
                <Text style={[Fonts.textTiny, Fonts.textBold]}>
                  Resend OTP in {timer} seconds
                </Text>
              </View>
            )}


            {timer === 0 && (
              <View style={[Gutters.regularVMargin, { alignItems: 'center' }]}>
                {isLoading ? (
                  <Text style={[Fonts.textTiny, Fonts.textBold]}>
                    Resending OTP-code ...
                  </Text>
                ) : (
                  <Text
                    style={[Fonts.textTiny, Fonts.textBold]}
                    onPress={() => handleResendOTP()}
                  >
                    Didn't receive OTP?{' '}
                    <Text
                      style={{
                        color: Colors.blue,
                      }}
                    >
                      Resend again
                    </Text>
                  </Text>
                )}
              </View>
            )}
            <Button
              title="Verify Code"
              disabled={disable}
              onPress={handleVerifyOTP}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient> */}
      {/* <LoadingModal visible={load || isLoading} /> */}
    </View>
  );
};

export default OTPVerification;
