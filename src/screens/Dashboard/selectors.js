import { createSelector } from 'reselect';

const getDashboardState = (state = {}) => state.dashboard;

export const isDashboardLoading = createSelector(
    getDashboardState,
    (state) => state.isLoading,
);

export const getMeteorData = createSelector(getDashboardState, (state) => {
    const { meteorData = [] } = state;
    return meteorData;
});
