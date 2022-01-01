import React from 'react';
import { StyledDashboard as Dashboard } from './index';
import { SAMPLE_METEOR_DATA_RESPONSE } from './constants';

export default {
    title: 'Screen/Dashboard',
    component: Dashboard,
    argTypes: {
        classes: { table: { disable: true } }, // We don't want to allow changing classes in the storybook.
        // Put any extra stuff to configure/control your args here
    },
};

export const WithControlsAndActions = (args) => (
    <div style={{ height: 700, padding: '2rem' }}>
        <Dashboard {...args} />
    </div>
);

WithControlsAndActions.args = {
    meteorData: SAMPLE_METEOR_DATA_RESPONSE,
    loading: false,
};
