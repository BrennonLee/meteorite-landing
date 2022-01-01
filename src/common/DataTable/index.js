import React from 'react';
import styles from './styles';
import { LinearProgress, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DataGrid, GridOverlay, GridToolbar } from '@mui/x-data-grid';
import { SAMPLE_COLUMNS, SAMPLE_ROWS } from './constants';

/**
 * Custom linear loading indicator to render at the top of the table
 * @returns {JSX.Element}
 */
const linearLoading = () => {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
};

const DataTable = ({ classes, rows, columns, ...rest }) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            components={{
                Toolbar: GridToolbar,
                LoadingOverlay: linearLoading,
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
};

DataTable.defaultProps = {
    rows: SAMPLE_ROWS,
    columns: SAMPLE_COLUMNS,
};

export default withStyles(styles)(DataTable);
