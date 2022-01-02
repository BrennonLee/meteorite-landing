import {
    FAVORITE_METEORS_UPDATE,
    FETCH_DASHBOARD_REQUEST_FAILED,
    FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    FETCH_DASHBOARD_REQUESTED,
    UN_FAVORITE_METEORS_UPDATE,
} from './actions';

export const initialState = {
    loading: false,
    meteorData: [],
    favoriteMeteorIds: [],
    error: null,
};

export default function (state = initialState, action = {}) {
    const { type } = action;
    switch (type) {
        case FETCH_DASHBOARD_REQUEST_SUCCEEDED: {
            const { meteorData } = action;
            return {
                ...state,
                loading: false,
                error: null,
                meteorData,
            };
        }
        case FETCH_DASHBOARD_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case FETCH_DASHBOARD_REQUEST_FAILED: {
            const { error } = action;
            return {
                ...state,
                loading: false,
                error,
            };
        }
        case FAVORITE_METEORS_UPDATE: {
            const { newFavoriteIds } = action;
            return {
                ...state,
                favoriteMeteorIds: [
                    ...state.favoriteMeteorIds,
                    ...newFavoriteIds,
                ],
            };
        }
        case UN_FAVORITE_METEORS_UPDATE: {
            const { newFavoriteIds } = action;
            return {
                ...state,
                favoriteMeteorIds: [...newFavoriteIds],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
