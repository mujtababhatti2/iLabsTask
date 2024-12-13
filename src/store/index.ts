import { Middleware, MiddlewareAPI, combineReducers, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { MMKV } from 'react-native-mmkv';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { api } from '../services/api';
import auth from './auth';
import theme from './theme';
import loader from './loader';
import { showError } from '../utils/HelperFuctions';

const reducers = combineReducers({
  theme,
  auth,
  loader,
  [api.reducerPath]: api.reducer,
});

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);


export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    // if (isRejectedWithValue(action)) {
    //   console.log(action,"from store rtk err logger")
    //   console.warn('We got a rejected action!')
    //   const errMsg = 'data' in action.error
    //     ? (action.error.data as { message: string }).message
    //     : action.error.message
    //   showError(errMsg)
    // }
    return next(action)
  }

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, rtkQueryErrorLogger);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { persistor, store };

