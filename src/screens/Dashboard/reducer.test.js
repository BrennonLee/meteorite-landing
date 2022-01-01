import reducer, { initialState } from './reducer';
import {
    FETCH_DASHBOARD_REQUEST_FAILED,
    FETCH_DASHBOARD_REQUEST_SUCCEEDED,
    FETCH_DASHBOARD_REQUESTED,
} from './actions';
import { SAMPLE_METEOR_DATA_RESPONSE } from './constants';

describe('Dashboard reducer tests', () => {
    it('Should return initial state', () => {
        // eslint-disable-next-line no-undefined
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it(`Should handle ${FETCH_DASHBOARD_REQUESTED}`, () => {
        expect(
            reducer(initialState, { type: FETCH_DASHBOARD_REQUESTED }),
        ).toEqual({
            ...initialState,
            loading: true,
        });
    });
    it(`Should handle ${FETCH_DASHBOARD_REQUEST_FAILED}`, () => {
        expect(
            reducer(initialState, {
                type: FETCH_DASHBOARD_REQUEST_FAILED,
                error: 'Something went wrong',
            }),
        ).toEqual({
            ...initialState,
            loading: false,
            error: 'Something went wrong',
        });
    });
    it(`Should handle ${FETCH_DASHBOARD_REQUEST_SUCCEEDED}`, () => {
        expect(
            reducer(initialState, {
                type: FETCH_DASHBOARD_REQUEST_SUCCEEDED,
                meteorData: SAMPLE_METEOR_DATA_RESPONSE,
            }),
        ).toEqual({
            ...initialState,
            meteorData: SAMPLE_METEOR_DATA_RESPONSE,
        });
    });
});
