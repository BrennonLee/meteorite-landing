import React from 'react';
import styles from './styles';
import { LinearProgress, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DataGrid, GridOverlay, GridToolbar } from '@mui/x-data-grid';
import { SAMPLE_COLUMNS, SAMPLE_ROWS } from './constants';
import { noop } from '../../utils';

/**
 * Custom linear loading indicator to render at the top of the table
 * @returns {JSX.Element}
 */
const linearLoading = () => {
    return (
        <GridOverlay>
            <div
                data-testid="loading-indicator"
                style={{ position: 'absolute', top: 0, width: '100%' }}
            >
                <LinearProgress />
            </div>
        </GridOverlay>
    );
};

const DataTable = ({
    classes,
    rows,
    columns,
    onSelectMeteorRow,
    onFavoriteClick,
    ...rest
}) => {
    return (
        <DataGrid
            sx={{
                '& .favoriteColumn:hover': {
                    cursor: 'pointer',
                },
            }}
            className={classes.root}
            rows={rows}
            columns={columns}
            components={{
                Toolbar: GridToolbar,
                LoadingOverlay: linearLoading,
            }}
            onSelectionModelChange={onSelectMeteorRow}
            onCellClick={(params, event) => {
                const { id, field } = params;
                if (field === 'favorite') {
                    onFavoriteClick && onFavoriteClick(id);
                }
            }}
            getCellClassName={(params) => {
                const { field } = params;
                if (field === 'favorite') {
                    return 'favoriteColumn';
                }
            }}
            {...rest}
        />
    );
};

DataTable.propTypes = {
    // Comes from withStyles
    classes: PropTypes.object.isRequired,
    rows: PropTypes.array,
    columns: PropTypes.array,
    onSelectMeteorRow: PropTypes.func,

    // Custom cell click function to toggle favorites
    onFavoriteClick: PropTypes.func,

    /*
     * For additional built in MUI props, see https://mui.com/api/data-grid/data-grid/#props
     */
};

DataTable.defaultProps = {
    rows: SAMPLE_ROWS,
    columns: SAMPLE_COLUMNS,
    onSelectMeteorRow: noop,
    onFavoriteClick: noop,
};

export default withStyles(styles)(DataTable);
