import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NavigationService from '../../navigators/NavigationService';
import { userInfo } from '../../services/modules/users';
import { EXTERNAL_USERS, INTERNAL_USERS, USER_TYPES } from '../../theme/Variables';

export interface AuthState {
  idToken: string | null;
  user: userInfo | null;
  userType: string | null; // Added userType to the state
  isInternalUser: boolean | null; // Added isInternalUser to the state
}

const initialState: AuthState = {
  idToken: null,
  user: null,
  userType: null, // Initialized userType to null
  isInternalUser: null, // Initialized isInternalUser to null
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = { ...action.payload };
      const { userType, isInternalUser } = getUserType(action.payload.userSubTypeIdFk); 
      state.userType = userType;
      state.isInternalUser = isInternalUser;
    },
    clearToken: (state) => {
      state.idToken = null;
    },
    Logout: (state) => {
      state.idToken = null;
      state.user = null;
      state.userType = null;
      state.isInternalUser = null;
    },
  },
});

export const { setToken, setUser, clearToken, Logout } = authSlice.actions;

export default authSlice.reducer;

function getUserType(userSubTypeIdFk: number): { userType: string | null; isInternalUser: boolean | null; } {
  for (const userType in USER_TYPES) {
    if (EXTERNAL_USERS[userType].userId === userSubTypeIdFk) {
      return { userType, isInternalUser: false }; // External user
    }
    if (INTERNAL_USERS[userType].userId === userSubTypeIdFk) {
      return { userType, isInternalUser: true }; // Internal user
    }
  }
  return { userType: null, isInternalUser: null }; // Return null if no matching userType found
}
