import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

// Селектор для всех зданий
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProject = (state: RootState) => state.project.project;

// Селектор для зданий, ограниченных до 3 элементов (для футера)
export const selectProjectsOnPage = createSelector(
    [selectProjects],
    (buildings) => buildings // Берем только первые 3 здания
);

export const selectProjectById = createSelector([selectProject], (project) => {
    if (!project) return null;
    return project;
});
