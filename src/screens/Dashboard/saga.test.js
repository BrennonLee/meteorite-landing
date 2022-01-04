import { fetchMeteorData, toggleSelectedMeteor } from './sagas';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import dashboardReducer, { initialState } from './reducer';
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
    TOGGLE_SELECTED_METEOR_REQUESTED,
    UPDATE_FAVORITE_METEORS,
} from './actions';
import { getFavoriteMeteorIds } from './selectors';

describe('Dashboard Saga tests', () => {
    it('fetchMeteorData saga handles successful response', async () => {
        return expectSaga(fetchMeteorData)
            .withReducer(dashboardReducer)
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
            .withReducer(dashboardReducer)
            .provide([[matchers.call.fn(requestMeteorData), null]])
            .put({
                type: FETCH_DASHBOARD_REQUEST_FAILED,
                error: 'Something went wrong. Please refresh your browser and try again.',
            })
            .hasFinalState({
                ...initialState,
                loading: false,
                error: 'Something went wrong. Please refresh your browser and try again.',
            })
            .dispatch({ type: FETCH_DASHBOARD_REQUESTED })
            .run();
    });
    it('fetchMeteorData saga handles error response', async () => {
        const mockErrorResponse = new Error('Something worse has happened');

        return expectSaga(fetchMeteorData)
            .withReducer(dashboardReducer)
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
    it('toggleSelectedMeteor handles adding new meteor id', () => {
        const action = {
            type: TOGGLE_SELECTED_METEOR_REQUESTED,
            meteorId: '1',
        };
        return expectSaga(toggleSelectedMeteor, action)
            .withReducer(dashboardReducer)
            .provide([[select(getFavoriteMeteorIds), []]])
            .put({
                type: UPDATE_FAVORITE_METEORS,
                meteorIds: ['1'],
            })
            .hasFinalState({
                ...initialState,
                favoriteMeteorIds: ['1'],
            })
            .dispatch(action)
            .run();
    });
    it('toggleSelectedMeteor handles merge of favorite meteors request', () => {
        const action = {
            type: TOGGLE_SELECTED_METEOR_REQUESTED,
            meteorId: '2',
        };
        return expectSaga(toggleSelectedMeteor, action)
            .withReducer(dashboardReducer, {
                ...initialState,
                favoriteMeteorIds: ['1'],
            })
            .provide([[select(getFavoriteMeteorIds), ['1']]])
            .put({
                type: UPDATE_FAVORITE_METEORS,
                meteorIds: ['1', '2'],
            })
            .hasFinalState({
                ...initialState,
                favoriteMeteorIds: ['1', '2'],
            })
            .dispatch(action)
            .run();
    });
    it('toggleSelectedMeteor handles removal of meteor id', async () => {
        const action = {
            type: TOGGLE_SELECTED_METEOR_REQUESTED,
            meteorId: '2',
        };
        return expectSaga(toggleSelectedMeteor, action)
            .withReducer(dashboardReducer, {
                ...initialState,
                favoriteMeteorIds: ['1', '2'],
            })
            .provide([[select(getFavoriteMeteorIds), ['1', '2']]])
            .put({
                type: UPDATE_FAVORITE_METEORS,
                meteorIds: ['1'],
            })
            .hasFinalState({
                ...initialState,
                favoriteMeteorIds: ['1'],
            })
            .dispatch(action)
            .run();
    });
});
