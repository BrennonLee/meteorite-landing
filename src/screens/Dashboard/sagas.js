import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import {
    FAVORITE_METEORS_REQUESTED,
    UN_FAVORITE_METEORS_REQUESTED,
    FETCH_DASHBOARD_REQUESTED,
    favoriteMeteorsUpdate,
    fetchDashboardRequestFailed,
    fetchDashboardRequestSucceeded,
    unFavoriteMeteorUpdate,
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
 * Will retrieve the currently favorited meteor IDs and any selected meteors
 * that haven't already been selected will be added to the list.
 * @param {array} meteorIds Array of string meteor Ids to favorite
 * @returns SimpleEffect
 */
export function* favoriteSelectedMeteors({ meteorIds = [] }) {
    const favoriteMeteorIds = yield select(getFavoriteMeteorIds);
    const newFavoriteIds = [];
    meteorIds.forEach((id) => {
        if (!favoriteMeteorIds.includes(id)) {
            newFavoriteIds.push(id);
        }
    });
    yield put(favoriteMeteorsUpdate(newFavoriteIds));
}

/**
 * Will retrieve the currently favorited meteor IDs and filter out any that match the selected to be removed.
 * @param {array} meteorIds Array of selected meteor ids to remove
 * @returns SimpleEffect
 */
export function* unFavoriteSelectedMeteors({ meteorIds = [] }) {
    const favoriteMeteorIds = yield select(getFavoriteMeteorIds);
    const newFavoriteIds = favoriteMeteorIds.filter(
        (id) => !meteorIds.includes(id),
    );
    yield put(unFavoriteMeteorUpdate(newFavoriteIds));
}

export default function* () {
    yield all([
        takeLatest(FETCH_DASHBOARD_REQUESTED, fetchMeteorData),
        takeLatest(FAVORITE_METEORS_REQUESTED, favoriteSelectedMeteors),
        takeLatest(UN_FAVORITE_METEORS_REQUESTED, unFavoriteSelectedMeteors),
    ]);
}
