import { configureStore } from '@reduxjs/toolkit';
import buildingsReducer from './slices/buildings/buildingsSlice';
import buildingReducer from './slices/buildings/buildingItem';
import servicesReducer from './slices/services/servicesSlice';

export const store = configureStore({
  reducer: {
    buildings: buildingsReducer,
    building: buildingReducer,
    services: servicesReducer,
  },
});

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
