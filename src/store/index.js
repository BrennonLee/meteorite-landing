import { applyMiddleware, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducer';
import rootSaga from './saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * Create redux store.
 *
 * @param {object} preloadedState
 * @returns {{store: *, history: {createHref, goBack, length, replace, go, action, location, goForward, block, push, listen}}}
 */
export default function createStore(preloadedState) {
    // Create browser history object for tracking browser state
    const history = createBrowserHistory();

    // Create saga middleware for connecting the store to our root saga
    const sagaMiddleware = createSagaMiddleware();

    // Create the root reducer
    const rootReducer = createRootReducer(history);

    const persistConfig = {
        key: 'root',
        storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // Gather a list of our middleware
    const middleware = [
        // Connects our app's store state to the router state
        routerMiddleware(history),
        // Connect our app's store to the root saga
        sagaMiddleware,
    ];

    // Create our store with our enhanced root reducer, all of our middleware, and dev tools
    const store = createReduxStore(
        persistedReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );

    // Run the root saga
    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store);

    // Return our store and history
    return { persistor, store, history };
}
