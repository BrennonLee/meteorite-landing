import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import createStore from './store';
import './App.css';
import theme from './theme';
import Router from './Router';

const { persistor, store, history } = createStore();

function App() {
    /**
     * TODO:
     * - Add redux and create store
     * - Add in basic router and default to home "dashboard"
     * - Create home dashboard component with DataTable within it
     * - Add hooks to dispatch action to fetch JSON data and populate store
     * - Map JSON data to dashboard table (via selectors)
     * - Add / fix unit tests
     * - Add "favorite" functionality (persist on session storage and between tabs)
     * - Check mobile styling
     */
    return (
        <StoreProvider store={store}>
            <PersistGate loading={<CircularProgress />} persistor={persistor}>
                <MuiThemeProvider theme={theme}>
                    <Router history={history} />
                </MuiThemeProvider>
            </PersistGate>
        </StoreProvider>
    );
}

export default App;
