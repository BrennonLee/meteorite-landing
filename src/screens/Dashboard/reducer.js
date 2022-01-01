import {
    FETCH_DASHBOARD_REQUEST_FAILED,
    FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    FETCH_DASHBOARD_REQUESTED,
} from './actions';

export const initialState = {
    loading: false,
    meteorData: [],
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
        default: {
            return {
                ...state,
            };
        }
    }
}
