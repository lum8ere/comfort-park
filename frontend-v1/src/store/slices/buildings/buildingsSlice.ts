import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../service/axiosConfig';

export interface Building {
    id: string; // Уникальный идентификатор
    name: string; // Название
    size: string; // Размер
    floors: number; // Количество этажей
    area: number; // Площадь
    description: string; // Описание
    Photos: Photo[];
    bange: string;
    price: number;
    createdAt: string; //
    isActive: boolean; // Активный статус
};

export interface Photo {
    id: string;
    url: string;
    building_id: string;
    is_gallery: boolean;
    created_at: Date;
  }
  

interface BuildingsState {
    buildings: Building[];
    loading: boolean;
    error: string | null;
};

const initialState: BuildingsState = {
    buildings: [],
    loading: false,
    error: null
};

// Асинхронное действие для получения зданий
export const fetchBuildings = createAsyncThunk('buildings/fetch', async () => {
    const response = await axiosInstance.get<Building[]>('/buildings');
    console.log("response.data", response.data)
    return response.data;
});

const buildingsSlice = createSlice({
    name: 'buildings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBuildings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBuildings.fulfilled, (state, action) => {
                state.loading = false;
                state.buildings = action.payload;
            })
            .addCase(fetchBuildings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load buildings';
            });
    }
});

export default buildingsSlice.reducer;
