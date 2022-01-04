const PREFIX = 'dashboard/';

export const FETCH_DASHBOARD_REQUESTED = `${PREFIX}FETCH_DASHBOARD_REQUESTED`;
export const FETCH_DASHBOARD_REQUEST_FAILED = `${PREFIX}FETCH_DASHBOARD_REQUEST_FAILED`;
export const FETCH_DASHBOARD_REQUEST_SUCCEEDED = `${PREFIX}FETCH_DASHBOARD_REQUEST_SUCCEEDED`;

export const fetchDashboardRequested = () => ({
    type: FETCH_DASHBOARD_REQUESTED,
});

export const fetchDashboardRequestFailed = (error) => ({
    type: FETCH_DASHBOARD_REQUEST_FAILED,
    error,
});

export const fetchDashboardRequestSucceeded = (meteorData) => ({
    type: FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    meteorData,
});

export const TOGGLE_SELECTED_METEOR_REQUESTED = `${PREFIX}TOGGLE_SELECTED_METEOR_REQUESTED`;
export const UPDATE_FAVORITE_METEORS = `${PREFIX}UPDATE_FAVORITE_METEORS`;

export const toggleSelectedMeteor = (meteorId) => ({
    type: TOGGLE_SELECTED_METEOR_REQUESTED,
    meteorId,
});

export const updateFavoriteMeteors = (meteorIds) => ({
    type: UPDATE_FAVORITE_METEORS,
    meteorIds,
});
