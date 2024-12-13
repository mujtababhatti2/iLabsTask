import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ForgetPassword, ResetPassword, Signin, Signup } from '../screens/Auth';


const Stack = createStackNavigator();

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      {/* <Stack.Screen name="Usertypes" component={Usertypes} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="ResetScreen" component={ResetScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="NotVerified" component={NotVerified} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
