import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Button,
    withStyles,
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
import DataTable from '../../common/DataTable';
import PropTypes from 'prop-types';
import styles from './styles';
import {
    favoriteSelectedMeteors,
    fetchDashboardRequested,
    unFavoriteSelectedMeteors,
} from './actions';
import {
    getErrorForDashboard,
    getFavoriteMeteorIds,
    getMeteorDataForDashboard,
    isDashboardLoading,
} from './selectors';
import { noop } from '../../utils';
import { METEOR_DATA_COLUMNS, DATA_SET_SOURCE } from './constants';
import { intersection } from 'ramda';

const Dashboard = ({
    classes,
    onLoad,
    loading,
    meteorData,
    onFavoriteClick,
    favoriteMeteors,
    onUnFavoriteClick,
    error,
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

    const renderHeader = () => {
        return (
            <>
                <AppBar position="fixed" data-testid="app-header">
                    <Toolbar>
                        <Typography variant="h1">Meteorite Landings</Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </>
        );
    };

    const renderFavoriteButton = () => (
        <Button
            data-testid="favorite-button"
            onClick={() => onFavoriteClick && onFavoriteClick(selectedRows)}
            disabled={
                !(selectedRows && selectedRows.length) ||
                intersection(favoriteMeteors, selectedRows)?.length
            }
            classes={{
                root: classes.button,
                label: classes.buttonLabel,
                disabled: classes.disabled,
            }}
        >
            Favorite
        </Button>
    );

    const renderUnFavoriteButton = () => (
        <Button
            data-testid="unFavorite-button"
            onClick={() => onUnFavoriteClick && onUnFavoriteClick(selectedRows)}
            disabled={!intersection(favoriteMeteors, selectedRows)?.length}
            classes={{
                root: classes.button,
                label: classes.buttonLabel,
                disabled: classes.disabled,
            }}
        >
            Remove Favorite
        </Button>
    );

    const renderDataTable = useCallback(() => {
        return (
            <Grid item className={classes.dataContainer}>
                <DataTable
                    loading={loading}
                    columns={METEOR_DATA_COLUMNS}
                    rows={meteorData}
                    onSelectMeteorRow={setSelectedRows}
                    sortModel={sortModel}
                    onSortModelChange={setSortModel}
                />
            </Grid>
        );
    }, [
        classes,
        loading,
        meteorData,
        setSelectedRows,
        sortModel,
        setSortModel,
    ]);

    const renderError = useCallback(() => {
        return (
            <Grid item className={classes.error} data-testid="error-container">
                <Typography className={classes.errorText}>{error}</Typography>
            </Grid>
        );
    }, [classes, error]);

    return (
        <Grid
            data-testid="dashboard-container"
            container
            className={classes.dashboardContainer}
        >
            {renderHeader()}
            <Grid item className={classes.datasource}>
                <Typography>Meteorite Dataset Source:</Typography>
                <a
                    className={classes.link}
                    href={DATA_SET_SOURCE}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {DATA_SET_SOURCE}
                </a>
            </Grid>
            <Grid item className={classes.buttonContainer}>
                {renderFavoriteButton()}
                {renderUnFavoriteButton()}
            </Grid>
            {error && renderError()}
            {renderDataTable()}
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

    // Error text to render to the user (if one occurs)
    error: PropTypes.string,

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
    error: null,
};

export const StyledDashboard = withStyles(styles)(Dashboard);

const mapStateToProps = (state) => ({
    loading: isDashboardLoading(state),
    meteorData: getMeteorDataForDashboard(state),
    favoriteMeteors: getFavoriteMeteorIds(state),
    error: getErrorForDashboard(state),
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
