import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import { selectBuildings } from './slices/buildings/buildingSelectors';
import { fetchBuildings } from './slices/buildings/buildingsSlice';
import { selectProjects } from './slices/projects/projectSelectors';
import { fetchProjects } from './slices/projects/projectsSlice';
import { selectServices } from './slices/services/serviceSelectors';
import { fetchServices } from './slices/services/servicesSlice';

// Типизированный `dispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;
// Типизированный `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBuildingsData() {
    const dispatch = useAppDispatch();
    const buildings = useSelector(selectBuildings);
    const { loading, error } = useSelector((state: RootState) => state.buildings);

    useEffect(() => {
        dispatch(fetchBuildings());
    }, [dispatch]);

    const refetch = () => {
        dispatch(fetchBuildings());
    };

    return { buildings, loading, error, refetch };
}

export function useProjectsData() {
    const dispatch = useAppDispatch();
    const projects = useSelector(selectProjects);
    const { loading, error } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const refetch = () => {
        dispatch(fetchProjects());
    };

    return { projects, loading, error, refetch };
}

export function useServicesData() {
    const dispatch = useAppDispatch();
    const services = useSelector(selectServices);
    const { loading, error } = useSelector((state: RootState) => state.services);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const refetch = () => {
        dispatch(fetchServices());
    };

    return { services, loading, error, refetch };
}
