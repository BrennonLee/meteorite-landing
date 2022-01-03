import React from 'react';
import { render, screen } from '@testing-library/react';
import { StyledDashboard as Dashboard } from './index';
import { SAMPLE_METEOR_DATA_RESPONSE } from './constants';

describe('Dashboard render tests', () => {
    test('Dashboard renders and is visible', () => {
        render(<Dashboard meteorData={SAMPLE_METEOR_DATA_RESPONSE} />);
        expect(screen.getByTestId('app-header')).toBeVisible();
        expect(screen.getByTestId('favorite-button')).toBeVisible();
        expect(screen.getByTestId('unFavorite-button')).toBeVisible();
        expect(screen.getByTestId('dashboard-container')).toBeVisible();
        expect(
            screen.queryByTestId('loading-indicator'),
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId('error-container')).not.toBeInTheDocument();
    });

    test('Dashboard renders and is visible with loading indicator', () => {
        render(<Dashboard meteorData={SAMPLE_METEOR_DATA_RESPONSE} loading />);
        expect(screen.getByTestId('app-header')).toBeVisible();
        expect(screen.getByTestId('favorite-button')).toBeVisible();
        expect(screen.getByTestId('unFavorite-button')).toBeVisible();
        expect(screen.getByTestId('dashboard-container')).toBeVisible();
        expect(screen.getByTestId('loading-indicator')).toBeVisible();
        expect(screen.queryByTestId('error-container')).not.toBeInTheDocument();
    });

    test('Dashboard renders with error and is visible', () => {
        render(
            <Dashboard
                meteorData={SAMPLE_METEOR_DATA_RESPONSE}
                error="Something went wrong"
            />,
        );
        expect(screen.getByTestId('app-header')).toBeVisible();
        expect(screen.getByTestId('favorite-button')).toBeVisible();
        expect(screen.getByTestId('unFavorite-button')).toBeVisible();
        expect(screen.getByTestId('dashboard-container')).toBeVisible();
        expect(
            screen.queryByTestId('loading-indicator'),
        ).not.toBeInTheDocument();
        expect(screen.getByTestId('error-container')).toBeVisible();
    });
});
