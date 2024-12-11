import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Building } from './buildingsSlice';
import axiosInstance from 'service/axiosConfig';

interface BuildingsState {
    building: Building | null;
    loading: boolean;
    error: string | null;
};

const initialState: BuildingsState = {
    building: null,
    loading: false,
    error: null
};

export const fetchBuilding = createAsyncThunk('building/buildingsItem', async (id: string) => {
    console.log("id: " + id);
    const response = await axiosInstance.get(`/buildings/${id}`);
    console.log("response: ", response)
    // console.log(response.data)
    return response.data;
});

const buildingSlice = createSlice({
    name: 'building',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBuilding.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBuilding.fulfilled, (state, action) => {
                state.loading = false;
                state.building = action.payload;
            })
            .addCase(fetchBuilding.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load buildings';
            });
    }
});

export default buildingSlice.reducer;
