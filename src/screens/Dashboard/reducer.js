import {
    FETCH_DASHBOARD_REQUEST_FAILED,
    FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    FETCH_DASHBOARD_REQUESTED,
    UPDATE_FAVORITE_METEORS,
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
        case UPDATE_FAVORITE_METEORS: {
            const { meteorIds } = action;
            return {
                ...state,
                favoriteMeteorIds: [...meteorIds],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
