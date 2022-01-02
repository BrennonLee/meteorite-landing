import {
    favoriteSelectedMeteors,
    fetchMeteorData,
    unFavoriteSelectedMeteors,
} from './sagas';
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
    FAVORITE_METEORS_REQUESTED,
    FAVORITE_METEORS_UPDATE,
    FETCH_DASHBOARD_REQUEST_FAILED,
    FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    FETCH_DASHBOARD_REQUESTED,
    UN_FAVORITE_METEORS_REQUESTED,
    UN_FAVORITE_METEORS_UPDATE,
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
    it('favoriteSelectedMeteors handles favorite meteors request', () => {
        const action = {
            type: FAVORITE_METEORS_REQUESTED,
            meteorIds: ['1'],
        };
        return expectSaga(favoriteSelectedMeteors, action)
            .withReducer(dashboardReducer)
            .provide([[select(getFavoriteMeteorIds), []]])
            .put({
                type: FAVORITE_METEORS_UPDATE,
                newFavoriteIds: ['1'],
            })
            .hasFinalState({
                ...initialState,
                favoriteMeteorIds: ['1'],
            })
            .dispatch(action)
            .run();
    });
    it('favoriteSelectedMeteors handles merge of favorite meteors request', () => {
        const action = {
            type: FAVORITE_METEORS_REQUESTED,
            meteorIds: ['2'],
        };
        return expectSaga(favoriteSelectedMeteors, action)
            .withReducer(dashboardReducer, {
                ...initialState,
                favoriteMeteorIds: ['1'],
            })
            .provide([[select(getFavoriteMeteorIds), ['1']]])
            .put({
                type: FAVORITE_METEORS_UPDATE,
                newFavoriteIds: ['2'],
            })
            .hasFinalState({
                ...initialState,
                favoriteMeteorIds: ['1', '2'],
            })
            .dispatch(action)
            .run();
    });
    it('unFavoriteSelectedMeteors handles removal of meteor', async () => {
        const action = {
            type: UN_FAVORITE_METEORS_REQUESTED,
            meteorIds: ['2'],
        };
        return expectSaga(unFavoriteSelectedMeteors, action)
            .withReducer(dashboardReducer, {
                ...initialState,
                favoriteMeteorIds: ['1', '2'],
            })
            .provide([[select(getFavoriteMeteorIds), ['1', '2']]])
            .put({
                type: UN_FAVORITE_METEORS_UPDATE,
                newFavoriteIds: ['1'],
            })
            .hasFinalState({
                ...initialState,
                favoriteMeteorIds: ['1'],
            })
            .dispatch(action)
            .run();
    });
});
