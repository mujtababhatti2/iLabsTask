import { createSlice } from '@reduxjs/toolkit';
import themes from '../../theme/themes';

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'default',
    darkMode: null,
    isFirstRun: true,
    fcmToken: null,
    deviceId: null,

  } as ThemeState,
  reducers: {
    changeTheme: (state, { payload: { theme = 'default', darkMode } }: ThemePayload) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme;
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode;
      }
    },
    changeFirstRun: (state) => {
      state.isFirstRun = false;
    },
    setFcmToken: (state, { payload: { fcmToken } }: ThemePayload) => {
      if (typeof fcmToken !== 'undefined') {
        state.fcmToken = fcmToken;
      }
    },
    setDeviceId: (state, { payload: { deviceId } }: ThemePayload) => {
      if (typeof deviceId !== 'undefined') {
        console.log("first", deviceId)
        state.deviceId = deviceId;
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode, isFirstRun } }: ThemePayload,
    ) => {
      if (!state.theme) {
        if (typeof theme !== 'undefined') {
          state.theme = theme;
        }
        if (typeof darkMode !== 'undefined') {
          state.darkMode = darkMode;
        }
        if (typeof isFirstRun !== 'undefined') {
          state.isFirstRun = isFirstRun;
        }
      }
    },

  },
});

export const { changeTheme, setFcmToken, setDeviceId, setDefaultTheme, changeFirstRun } = slice.actions;

export default slice.reducer;

type DarkProps<T> = {
  [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never;
}[keyof T];

type PropsWithoutDark<T> = Omit<T, DarkProps<T>>;

export type ThemeState = {
  theme: 'default' | keyof PropsWithoutDark<typeof themes>;
  darkMode: boolean | null;
  isFirstRun: boolean | null;
  fcmToken: string | null;
  deviceId: string | null;
};

type ThemePayload = {
  payload: Partial<ThemeState>;
};
