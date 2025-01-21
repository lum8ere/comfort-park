import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../service/axiosConfig';

export interface Service {
    id: string; // Уникальный идентификатор
    name: string;
    description: string;
    price: number;
    image_url: string; //
    is_active: boolean; // Активный статус
};

interface ServicesState {
    services: Service[];
    loading: boolean;
    error: string | null;
};

const initialState: ServicesState = {
    services: [],
    loading: false,
    error: null
};

// Асинхронное действие для получения зданий
export const fetchServices = createAsyncThunk('services/fetch', async () => {
    const response = await axiosInstance.get<Service[]>('/services');
    return response.data;
});

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load services';
            });
    }
});

export default servicesSlice.reducer;
