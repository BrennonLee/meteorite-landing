import React from 'react';
import './App.css';
import DataTable from './common/DataTable';
import { Grid } from '@material-ui/core';

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
        <Grid
            data-testid="home-container"
            container
            style={{ height: 500, display: 'flex', flex: 1, padding: '2rem' }}
        >
            <DataTable />
        </Grid>
    );
}

export default App;
