import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import DataTable from '../../common/DataTable';
import PropTypes from 'prop-types';
import styles from './styles';
import { fetchDashboardRequested } from './actions';
import { getMeteorData, isDashboardLoading } from './selectors';
import { noop } from '../../utils';
import { CircularProgress } from '@mui/material';
import { METEOR_DATA_COLUMNS } from './constants';

const Dashboard = ({ classes, onLoad, loading, meteorData }) => {
    useEffect(() => {
        onLoad && onLoad();
        // Disable dependency so this hook only runs once when the component mounts
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid
            data-testid="home-container"
            container
            style={{ height: 700, display: 'flex', flex: 1, padding: '2rem' }}
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <DataTable
                    columns={METEOR_DATA_COLUMNS}
                    rows={meteorData}
                    pageSize={25}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            )}
        </Grid>
    );
};

Dashboard.propTypes = {
    // Comes from withStyles
    classes: PropTypes.object.isRequired,

    onLoad: PropTypes.func,
    loading: PropTypes.bool,
    meteorData: PropTypes.array,
};

Dashboard.defaultProps = {
    onLoad: noop,
    loading: false,
    meteorData: [],
};

const StyledDashboard = withStyles(styles)(Dashboard);

const mapStateToProps = (state) => ({
    loading: isDashboardLoading(state),
    meteorData: getMeteorData(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(fetchDashboardRequested()),
});

export const ConnectedDashboard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StyledDashboard);
