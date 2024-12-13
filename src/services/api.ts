import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import NavigationService from '../navigators/NavigationService';
import { Logout } from '../store/auth';
import { showCustomAlert, showError } from '../utils/HelperFuctions';


const baseQuery = fetchBaseQuery({
  // baseUrl: "http://192.168.0.107:28748/api/",
  // baseUrl: "https://asifghafoor-001-site8.ntempurl.com/api/",
  baseUrl:'http://asifghafoor-001-site8.ntempurl.com/api/',
  // Set timeout to 10 seconds (10*1000 = 10,000 milliseconds)
  timeout: 30000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.idToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  // baseUrl:process.env.API_URL,
});

console.log('>>>>>>>>', baseQuery)

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);
  // console.log(result.error, "h on tp")
  if (result.error && (result.error.status === 401 || result.error.status === 440)) {
    if (result.error.status === 401) {
      showCustomAlert('Session Expired', "Please log in again as your session has expired.")
    } else if (result.error.status === 440) {
      showCustomAlert('Session Timeout', "You've been logged in from another device.")
    }
    api.dispatch(Logout())
    NavigationService.reset('Auth')
  }
  else if (result.error && result.error.status === "TIMEOUT_ERROR") {
    showError('The request took too much time. Please try again later. Also, please check your internet connection and try again.', 6000);
  }
  else if (result.error && result.error.status === "FETCH_ERROR") {
    showError('Please check your internet connection and try again.');
  }
  return result;
};


export const generalErrorCatch = (error: any) => {
  console.log(error, "hehehh")
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      if (error.status === 'FETCH_ERROR') {
        showError('Please check your internet connection and try again.');
        return
      }
      if (error.status === 401 || error.status === 440) {
        return
      };
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      showError(errMsg)
    } else {
      // you can access all properties of `SerializedError` here
      // if not timeout error then show error message timeout error handles from top lvl.
      if (error.name !== 'AbortError') {
        showError(error.message);
      }
    }
  };
}


export const api = createApi({
  tagTypes: ['Drivers'],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
