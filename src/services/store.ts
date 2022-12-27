import {configureStore} from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import {rootReducer as reducer} from './state-slices';

export const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})