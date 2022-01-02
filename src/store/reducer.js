import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dashboardReducer from '../screens/Dashboard/reducer';
import storageSession from 'redux-persist/lib/storage/session';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { persistReducer } from 'redux-persist';

// Prefix key will allow us to test persist behavior on different environments
const PERSIST_KEY_PREFIX = `meteor_landing_${
    process.env.REACT_APP_ENV || 'production'
}`;

const dashboardPersistConfig = {
    key: `${PERSIST_KEY_PREFIX}_dashboard`,
    storage: storageSession,
    stateReconciler: hardSet,
    // The specific keys within the store to persist
    whitelist: ['favoriteMeteorIds'],
};

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        dashboard: persistReducer(dashboardPersistConfig, dashboardReducer),
    });
}
