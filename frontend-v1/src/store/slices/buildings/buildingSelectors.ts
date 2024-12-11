import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

// Селектор для всех зданий
export const selectBuildings = (state: RootState) => state.buildings.buildings;

// Селектор для зданий, ограниченных до 3 элементов (для футера)
export const selectFooterBuildings = createSelector(
    [selectBuildings],
    (buildings) => buildings.slice(0, 3) // Берем только первые 3 здания
);

export const selectCatalogBuildings = createSelector(
    [selectBuildings],
    (buildings) => {
        return [...buildings].sort((a, b) => a.price - b.price); // Сортируем по возрастанию цены
    }
);