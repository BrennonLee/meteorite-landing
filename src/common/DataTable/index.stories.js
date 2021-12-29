import React from 'react';
import DataTable from './index';
import { SAMPLE_COLUMNS, SAMPLE_ROWS } from './constants';

export default {
    title: 'Common/DataTable',
    component: DataTable,
    argTypes: {
        classes: { table: { disable: true } }, // We don't want to allow changing classes in the storybook.
        // Put any extra stuff to configure/control your args here
    },
};

export const WithControlsAndActions = (args) => (
    <div style={{ height: 400, width: '100%' }}>
        <DataTable {...args} />
    </div>
);

WithControlsAndActions.args = {
    rows: SAMPLE_ROWS,
    columns: SAMPLE_COLUMNS,
};
