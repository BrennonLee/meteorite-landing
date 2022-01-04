import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import {
    TOGGLE_SELECTED_METEOR_REQUESTED,
    FETCH_DASHBOARD_REQUESTED,
    fetchDashboardRequestFailed,
    fetchDashboardRequestSucceeded,
    updateFavoriteMeteors,
} from './actions';
import { HTTP_STATUS_OK, requestMeteorData } from '../../utils';
import { getFavoriteMeteorIds } from './selectors';

/**
 * Saga that handles requesting the meteor data and parsing the response.
 * Either a successful or failure effect will result which will either include the response data or the received error.
 * @returns SimpleEffect
 */
export function* fetchMeteorData() {
    try {
        const response = yield call(requestMeteorData);
        if (response && response.status === HTTP_STATUS_OK) {
            const meteorLandings = yield call([response, 'json']);
            yield put(fetchDashboardRequestSucceeded(meteorLandings));
        } else {
            yield put(
                fetchDashboardRequestFailed(
                    'Something went wrong. Please refresh your browser and try again.',
                ),
            );
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        yield put(fetchDashboardRequestFailed(error));
    }
}

/**
 * Function will examine the current store for what meteors are already marked as a favorite and will either
 * add or remove the given meteor ID from the store.
 * @param {String} meteorId The ID of the meteor to be either favorited or removed from the list of favorites
 * @returns SimpleEffect
 */
export function* toggleSelectedMeteor({ meteorId }) {
    const favoriteMeteorIds = yield select(getFavoriteMeteorIds);
    let newFavoriteIds = [];
    /*
     * If the given meteor id already exists, remove it from the list of favorites.
     * Otherwise, add it to the array.
     */
    if (favoriteMeteorIds.includes(meteorId)) {
        newFavoriteIds = favoriteMeteorIds.filter((id) => id !== meteorId);
    } else {
        newFavoriteIds = [...favoriteMeteorIds, meteorId];
    }
    yield put(updateFavoriteMeteors(newFavoriteIds));
}

export default function* () {
    yield all([
        takeLatest(FETCH_DASHBOARD_REQUESTED, fetchMeteorData),
        takeLatest(TOGGLE_SELECTED_METEOR_REQUESTED, toggleSelectedMeteor),
    ]);
}
