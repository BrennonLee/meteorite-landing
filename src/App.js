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
