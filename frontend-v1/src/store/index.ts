import { configureStore } from '@reduxjs/toolkit';
import buildingsReducer from './slices/buildings/buildingsSlice';
import buildingReducer from './slices/buildings/buildingItem';
import servicesSlice from './slices/services/servicesSlice';
import projectsSlice from './slices/projects/projectsSlice';
import projectSlice from './slices/projects/projectSlice'; 
import authReducer from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    buildings: buildingsReducer,
    building: buildingReducer,
    services: servicesSlice,
    projects: projectsSlice,
    project: projectSlice,
    auth: authReducer,
  },
});

// Типизация
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
