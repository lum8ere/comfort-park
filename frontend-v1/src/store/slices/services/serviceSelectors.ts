import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

// Селектор для всех зданий
export const selectServices = (state: RootState) => state.services.services;

// Селектор для зданий, ограниченных до 3 элементов (для футера)
export const selectServises = createSelector([selectServices], (services) => {
    return [...services].sort((a, b) => a.price - b.price); // Сортируем по возрастанию цены
});