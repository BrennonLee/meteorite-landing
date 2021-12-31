import { all, call } from 'redux-saga/effects';
import dashboardSaga from '../screens/Dashboard/sagas';

export default function* rootSaga() {
    yield all([call(dashboardSaga)]);
}
