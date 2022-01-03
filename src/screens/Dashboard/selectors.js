import { createSelector } from 'reselect';
import { addFavoriteMeteorsToRawData } from './transforms';

const getDashboardState = (state = {}) => state.dashboard;

export const isDashboardLoading = createSelector(
    getDashboardState,
    (state) => state.isLoading,
);

export const getFavoriteMeteorIds = createSelector(
    getDashboardState,
    (state) => {
        return state.favoriteMeteorIds || [];
    },
);

export const getMeteorData = createSelector(getDashboardState, (state) => {
    const { meteorData = [] } = state;
    return meteorData || [];
});

export const getMeteorDataForDashboard = createSelector(
    getFavoriteMeteorIds,
    getMeteorData,
    (favoriteIds = [], meteorData = []) => {
        return addFavoriteMeteorsToRawData(favoriteIds, meteorData);
    },
);

export const getErrorForDashboard = createSelector(
    getDashboardState,
    (state) => state.error,
);
