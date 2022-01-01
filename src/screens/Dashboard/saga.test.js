import { fetchMeteorData } from './sagas';
import { expectSaga } from 'redux-saga-test-plan';
import DashboardReducer, { initialState } from './reducer';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { requestMeteorData } from '../../utils';
import {
    SAMPLE_METEOR_DATA_RESPONSE,
    SUCCESSFUL_METEOR_RESPONSE,
} from './constants';
import {
    FETCH_DASHBOARD_REQUEST_FAILED,
    FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    FETCH_DASHBOARD_REQUESTED,
} from './actions';

describe('Dashboard Saga tests', () => {
    it('fetchMeteorData saga handles successful response', async () => {
        return expectSaga(fetchMeteorData)
            .withReducer(DashboardReducer)
            .provide([
                [
                    matchers.call.fn(requestMeteorData),
                    SUCCESSFUL_METEOR_RESPONSE,
                ],
            ])
            .put({
                type: FETCH_DASHBOARD_REQUEST_SUCCEEDED,
                meteorData: SAMPLE_METEOR_DATA_RESPONSE,
            })
            .hasFinalState({
                ...initialState,
                loading: false,
                meteorData: SAMPLE_METEOR_DATA_RESPONSE,
            })
            .dispatch({ type: FETCH_DASHBOARD_REQUESTED })
            .run();
    });
    it('fetchMeteorData saga handles non HTTP_STATUS_OK response', async () => {
        return expectSaga(fetchMeteorData)
            .withReducer(DashboardReducer)
            .provide([[matchers.call.fn(requestMeteorData), null]])
            .put({
                type: FETCH_DASHBOARD_REQUEST_FAILED,
                error: 'Something went wrong',
            })
            .hasFinalState({
                ...initialState,
                loading: false,
                error: 'Something went wrong',
            })
            .dispatch({ type: FETCH_DASHBOARD_REQUESTED })
            .run();
    });
    it('fetchMeteorData saga handles error response', async () => {
        const mockErrorResponse = new Error('Something worse has happened');

        return expectSaga(fetchMeteorData)
            .withReducer(DashboardReducer)
            .provide([
                [
                    matchers.call.fn(requestMeteorData),
                    throwError(mockErrorResponse),
                ],
            ])
            .put({
                type: FETCH_DASHBOARD_REQUEST_FAILED,
                error: mockErrorResponse,
            })
            .hasFinalState({
                ...initialState,
                loading: false,
                error: mockErrorResponse,
            })
            .dispatch({ type: FETCH_DASHBOARD_REQUESTED })
            .run();
    });
});
