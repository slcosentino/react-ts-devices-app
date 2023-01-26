import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import deviceReducer from '../reducers/deviceReducer';
import uiReducer from '../reducers/uiReducer';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;