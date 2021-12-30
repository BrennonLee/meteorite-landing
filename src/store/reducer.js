import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dashboard from '../screens/Dashboard/reducer';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        dashboard,
    });
}
