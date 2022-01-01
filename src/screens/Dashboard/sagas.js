import { all, takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_DASHBOARD_REQUESTED,
    fetchDashboardRequestFailed,
    fetchDashboardRequestSucceeded,
} from './actions';
import { HTTP_STATUS_OK, requestMeteorData } from '../../utils';

/**
 * Saga that handles requesting the meteor data and parsing the response.
 * Either a successful or failure effect will result which will either include the response data or the received error.
 */
export function* fetchMeteorData() {
    try {
        const response = yield call(requestMeteorData);
        if (response && response.status === HTTP_STATUS_OK) {
            const meteorLandings = yield call([response, 'json']);
            yield put(fetchDashboardRequestSucceeded(meteorLandings));
        } else {
            yield put(fetchDashboardRequestFailed('Something went wrong'));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        yield put(fetchDashboardRequestFailed(error));
    }
}

export default function* () {
    yield all([takeLatest(FETCH_DASHBOARD_REQUESTED, fetchMeteorData)]);
}
