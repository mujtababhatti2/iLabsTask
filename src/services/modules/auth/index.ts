import NavigationService from '../../../navigators/NavigationService';
import { setToken } from '../../../store/auth';
import { setLoading } from '../../../store/loader';
import { showCustomAlert, showError } from '../../../utils/HelperFuctions';
import { api } from '../../api';

export type LoginBody = {
  email: string;
  password: string;
};
export interface GetApiResponse {
  messages: string[];
  result: Sector[];
  statusCode: number;
  version: string;
}

interface PostApiResponse {
  messages: string[];
  result: any;
  statusCode: number;
  version: string;
}

export interface Sector {
  key: number;
  label: string;
  value: string;
}

export type SignupBody = {
  phoneNumber: string;
  createPassword: string;
  confirmPassword: string;
  email: string;
  firstName: string
  middleName: string
  lastName: string
  phoneCode: string
  countryId: string
 
};

// Define the type for the form data values
export interface ImageUploadFormData {
  image: string;
}

// interface notificationBody{
//     deviceId: string;
//     title: string
//     body: string;
//     priority:string;
//     userId: string|number;
//     typeId: string|number;
//     senderId: string|number
// }
interface notificationBody {
  USERID: number;
  ISANDROIODDEVICE: Boolean;
  TITLE: string;
  BODY: string;
  PRIORITY: string;
  DEVICEID: string;
  TYPEID: number;
  SENDERID: number;
}

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    signup: build.mutation<PostApiResponse, SignupBody>({
      query: body => ({
        url: 'User/UserRegistration', 
        method: 'POST',
        body,
      }),
    }),
    verifyOTP: build.mutation<
      PostApiResponse,
      { otp: string; email: string; OTPTypeId: number }
    >({
      query: ({ otp, email, OTPTypeId }) => ({
        url: `/User/VerifyOTP?otp=${otp}&email=${email}&OTPTypeId=${OTPTypeId}`,
        method: 'POST',
      }),
    }),
    changePassword: build.mutation<
      PostApiResponse,
      { password1: string; password2: string }
    >({
      query: ({ password1, password2 }) => ({
        url: `User/ChangePassword?password1=${password1}&password2=${password2}`,
        method: 'POST',
      }),
    }),
    forgetPassword: build.mutation<
      PostApiResponse,
      { password: string; confirmPassword: string; token: string }
    >({
      query: body => ({
        url: `User/ForgetPassword`,
        method: 'POST',
        body: body,
      }),
    }),
    login: build.mutation<PostApiResponse, LoginBody>({
      query: body => ({
        url: 'User/UserLogin', // Adjust the endpoint URL as needed
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<PostApiResponse, void>({
      query: () => ({
        url: 'User/Logout',
        method: 'POST',
      }),
    }),
    uploadImage: build.mutation<PostApiResponse, ImageUploadFormData>({
      query: formData => ({
        url: 'User/uploadimage/', // Adjust the endpoint URL as needed
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    deleteacc: build.mutation<PostApiResponse, void>({
      query: () => ({
        url: '/User/AccountDelete', // Adjust the endpoint URL as needed
        method: 'POST',
      }),
    }),
    deactivateeacc: build.mutation<PostApiResponse, void>({
      query: () => ({
        url: '/User/AccountDeactive', // Adjust the endpoint URL as needed
        method: 'POST',
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useDeactivateeaccMutation,
  useDeleteaccMutation,
  useLoginMutation,
  useSignupMutation,
  useUploadImageMutation,
  useVerifyOTPMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
} = authApi;
