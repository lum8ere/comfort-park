import { configureStore } from '@reduxjs/toolkit';
import buildingsReducer from './slices/buildingsSlice';

export const store = configureStore({
  reducer: {
    buildings: buildingsReducer,
  },
});

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
