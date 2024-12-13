import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../service/axiosConfig';

export interface ProjectPhoto {
    id: string;
    rootId: string;
    url: string;
    created_at: string;
}

export interface ProjectReview {
    id: string;
    rootId: string;
    first_name: string;
    last_name: string;
    comment: string;
    photos: string;
    created_at: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    created_at: string;
    ProjectPhoto: ProjectPhoto[];
    ProjectReview: ProjectReview[];
};

interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
};

const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null
};

// Асинхронное действие для получения зданий
export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
    const response = await axiosInstance.get<Project[]>('/projects');
    return response.data;
});

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load projects';
            });
    }
});

export default projectsSlice.reducer;
