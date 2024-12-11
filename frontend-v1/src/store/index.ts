import { configureStore } from '@reduxjs/toolkit';
import buildingsReducer from './slices/buildings/buildingsSlice';
import buildingReducer from './slices/buildings/buildingItem';

export const store = configureStore({
  reducer: {
    buildings: buildingsReducer,
    building: buildingReducer,
  },
});

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
