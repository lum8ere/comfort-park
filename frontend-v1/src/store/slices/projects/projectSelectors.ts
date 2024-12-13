import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

// Селектор для всех зданий
export const selectProjects = (state: RootState) => state.projects.projects;
// export const selectBuilding = (state: RootState) => state.building.building;

// Селектор для зданий, ограниченных до 3 элементов (для футера)
export const selectProjectsOnPage = createSelector(
    [selectProjects],
    (buildings) => buildings // Берем только первые 3 здания
);

// export const selectCatalogBuildings = createSelector([selectBuildings], (buildings) => {
//     return [...buildings].sort((a, b) => a.price - b.price); // Сортируем по возрастанию цены
// });

// export const selectBuildingItem = createSelector([selectBuilding], (building) => {
//     if (!building) return null;

//     console.log(building)

//     return building;
// });
