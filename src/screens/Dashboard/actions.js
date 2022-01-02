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

export const FAVORITE_METEORS_REQUESTED = `${PREFIX}FAVORITE_METEORS_REQUESTED`;
export const UN_FAVORITE_METEORS_REQUESTED = `${PREFIX}UN_FAVORITE_METEORS_REQUESTED`;
export const FAVORITE_METEORS_UPDATE = `${PREFIX}FAVORITE_METEORS_UPDATE`;
export const UN_FAVORITE_METEORS_UPDATE = `${PREFIX}UN_FAVORITE_METEORS_UPDATE`;

export const favoriteSelectedMeteors = (meteorIds) => ({
    type: FAVORITE_METEORS_REQUESTED,
    meteorIds,
});

export const unFavoriteSelectedMeteors = (meteorIds) => ({
    type: UN_FAVORITE_METEORS_REQUESTED,
    meteorIds,
});

export const favoriteMeteorsUpdate = (newFavoriteIds) => ({
    type: FAVORITE_METEORS_UPDATE,
    newFavoriteIds,
});

export const unFavoriteMeteorUpdate = (newFavoriteIds) => ({
    type: UN_FAVORITE_METEORS_UPDATE,
    newFavoriteIds,
});
