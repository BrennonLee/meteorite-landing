import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import DataTable from '../../common/DataTable';
import PropTypes from 'prop-types';
import styles from './styles';
import { fetchDashboardRequested } from './actions';
import { getMeteorData, isDashboardLoading } from './selectors';
import { noop } from '../../utils';
import { METEOR_DATA_COLUMNS } from './constants';

const Dashboard = ({ classes, onLoad, loading, meteorData }) => {
    useEffect(() => {
        onLoad && onLoad();
        // Disable dependency so this hook only runs once when the component mounts
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * TODO:
     * - Add "favorite" functionality (persist on session storage and between tabs)
     * - Initial state -> sort by favorites
     * - Error response UI
     * - Check mobile styling
     */
    return (
        <Grid
            data-testid="dashboard-container"
            container
            className={classes.dashboardContainer}
        >
            <DataTable
                loading={loading}
                columns={METEOR_DATA_COLUMNS}
                rows={meteorData}
            />
        </Grid>
    );
};

Dashboard.propTypes = {
    // Comes from withStyles
    classes: PropTypes.object.isRequired,

    // Function to dispatch when the screen mounts
    onLoad: PropTypes.func,

    // loading prop value that controls the loading indicator
    loading: PropTypes.bool,

    /*
     * Resulting meteor data that will take the shape of the following:
     * [{
     *   name: {string},
     *   id: {string},
     *   nameType: {string}
     *   recclass: {string}
     *   mass: {string}
     *   fall: {string}
     *   year: {string}
     *   reclat: {string}
     *   reclong: {string}
     *   geolocation: {
     *     type: {string}
     *     coordinates: {array}
     *   }
     * }]
     */
    meteorData: PropTypes.array,
};

Dashboard.defaultProps = {
    onLoad: noop,
    loading: false,
    meteorData: [],
};

export const StyledDashboard = withStyles(styles)(Dashboard);

const mapStateToProps = (state) => ({
    loading: isDashboardLoading(state),
    meteorData: getMeteorData(state),
});

const mapDispatchToProps = (dispatch) => ({
    // Dispatch our request to fetch the meteor data
    onLoad: () => dispatch(fetchDashboardRequested()),
});

export const ConnectedDashboard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StyledDashboard);
