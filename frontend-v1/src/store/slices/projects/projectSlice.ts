import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../service/axiosConfig';
import { Project } from './projectsSlice';

interface ProjectState {
    project: Project | null;
    loading: boolean;
    error: string | null;
};

const initialState: ProjectState = {
    project: null,
    loading: false,
    error: null
};

// Асинхронное действие для получения зданий
export const fetchProject = createAsyncThunk('project/fetch', async (id: string) => {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data;
});

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load buildings';
            });
    }
});

export default projectSlice.reducer;
