import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from '../src/theme';

// Import any global CSS we rely on (i.e. any css imported in `src/index.js`)
import '../src/index.css';

import { CircularProgress } from '@material-ui/core';
import React, { Suspense } from 'react';

export const decorators = [
    muiTheme([theme]),
    (story, context) => (
        <Suspense fallback={<CircularProgress />}>{story(context)}</Suspense>
    ),
];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'fullscreen',
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
    options: {
        storySort: {
            method: 'alphabetical',
        },
    },
    defaultLocale: 'en',
};
