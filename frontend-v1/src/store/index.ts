import { configureStore } from '@reduxjs/toolkit';
import buildingsReducer from './slices/buildings/buildingsSlice';
import buildingReducer from './slices/buildings/buildingItem';
import servicesSlice from './slices/services/servicesSlice';
import projectsSlice from './slices/projects/projectsSlice'; 

export const store = configureStore({
  reducer: {
    buildings: buildingsReducer,
    building: buildingReducer,
    services: servicesSlice,
    projects: projectsSlice
  },
});

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
