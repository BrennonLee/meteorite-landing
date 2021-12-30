import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { SAMPLE_COLUMNS, SAMPLE_ROWS } from './constants';

const DataTable = ({ classes, rows, columns, ...rest }) => {
    return (
        <DataGrid
            data-testid="data-grid"
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15]}
            checkboxSelection
            {...rest}
        />
    );
};

DataTable.propTypes = {
    // Comes from withStyles
    classes: PropTypes.object.isRequired,
    rows: PropTypes.number,
    columns: PropTypes.number,
};

DataTable.defaultProps = {
    // TODO: Replace default values
    rows: SAMPLE_ROWS,
    columns: SAMPLE_COLUMNS,
};

export default withStyles(styles)(DataTable);
