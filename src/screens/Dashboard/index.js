import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, withStyles } from '@material-ui/core';
import DataTable from '../../common/DataTable';
import PropTypes from 'prop-types';
import styles from './styles';
import {
    favoriteSelectedMeteors,
    fetchDashboardRequested,
    unFavoriteSelectedMeteors,
} from './actions';
import {
    getFavoriteMeteorIds,
    getMeteorDataForDashboard,
    isDashboardLoading,
} from './selectors';
import { noop } from '../../utils';
import { METEOR_DATA_COLUMNS } from './constants';
import { intersection } from 'ramda';

const Dashboard = ({
    classes,
    onLoad,
    loading,
    meteorData,
    onFavoriteClick,
    favoriteMeteors,
    onUnFavoriteClick,
}) => {
    useEffect(() => {
        onLoad && onLoad();
        // Disable dependency so this hook only runs once when the component mounts
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [selectedRows, setSelectedRows] = React.useState([]);

    // By default, let's sort by the favorite column so user's will see their favorites first
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'favorite',
            sort: 'desc',
        },
    ]);

    const renderFavoriteButton = () => {
        if (Array.isArray(selectedRows) && selectedRows.length) {
            return (
                <Button
                    onClick={() =>
                        onFavoriteClick && onFavoriteClick(selectedRows)
                    }
                >
                    Favorite
                </Button>
            );
        }
    };

    const renderUnFavoriteButton = () => {
        // Conditionally render the unFavorite button only when currently favorited rows are selected.
        if (
            favoriteMeteors.length &&
            selectedRows.length &&
            intersection(favoriteMeteors && selectedRows)?.length
        ) {
            return (
                <Button
                    onClick={() =>
                        onUnFavoriteClick && onUnFavoriteClick(selectedRows)
                    }
                >
                    UnFavorite
                </Button>
            );
        }
    };

    const renderDataTable = useCallback(() => {
        return (
            <DataTable
                loading={loading}
                columns={METEOR_DATA_COLUMNS}
                rows={meteorData}
                onSelectMeteorRow={setSelectedRows}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
            />
        );
    }, [loading, meteorData, setSelectedRows, sortModel, setSortModel]);

    /**
     * TODO:
     * - Error response UI
     * - Check mobile styling
     */
    return (
        <Grid
            data-testid="dashboard-container"
            container
            className={classes.dashboardContainer}
        >
            <Grid item className={classes.buttonContainer}>
                {renderFavoriteButton()}
                {renderUnFavoriteButton()}
            </Grid>
            <Grid item className={classes.dataContainer}>
                {renderDataTable()}
            </Grid>
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

    favoriteMeteors: PropTypes.array,

    // Handle favorite / unFavorite click request for selected meteors
    onFavoriteClick: PropTypes.func,
    onUnFavoriteClick: PropTypes.func,
};

Dashboard.defaultProps = {
    loading: false,
    meteorData: [],
    favoriteMeteors: [],
    onLoad: noop,
    onFavoriteClick: noop,
    onUnFavoriteClick: noop,
};

export const StyledDashboard = withStyles(styles)(Dashboard);

const mapStateToProps = (state) => ({
    loading: isDashboardLoading(state),
    meteorData: getMeteorDataForDashboard(state),
    favoriteMeteors: getFavoriteMeteorIds(state),
});

const mapDispatchToProps = (dispatch) => ({
    // Dispatch our request to fetch the meteor data
    onLoad: () => dispatch(fetchDashboardRequested()),

    // Handle onClick to favorite / unFavorite selected meteor rows
    onFavoriteClick: (meteorIds) =>
        dispatch(favoriteSelectedMeteors(meteorIds)),
    onUnFavoriteClick: (meteorIds) =>
        dispatch(unFavoriteSelectedMeteors(meteorIds)),
});

export const ConnectedDashboard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StyledDashboard);
