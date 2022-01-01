import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './index';
import { SAMPLE_COLUMNS, SAMPLE_ROWS } from './constants';

test('DataTable renders and is visible', () => {
    render(<DataTable rows={SAMPLE_ROWS} columns={SAMPLE_COLUMNS} />);
    expect(screen.getByRole('grid')).toBeVisible();
});
