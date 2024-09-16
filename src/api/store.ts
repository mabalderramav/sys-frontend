import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { systemApi } from './baseQuery';

const rootReducer = combineReducers({
  [systemApi.reducerPath]: systemApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(systemApi.middleware)
});

setupListeners(store.dispatch);
