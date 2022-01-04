import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { HTTP_STATUS_OK } from '../../utils';
import { orange } from '../../theme/index';

export const DATA_SET_SOURCE =
    'https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh';

export const METEOR_DATA_COLUMNS = [
    {
        field: 'favorite',
        headerName: 'Favorite',
        type: 'boolean',
        width: 120,
        renderCell: (params) => {
            const { formattedValue } = params;
            // Conditionally render the favorite versus unfavorited icon based on boolean value
            if (formattedValue === 'true') {
                return <FavoriteIcon style={{ fill: orange }} />;
            } else {
                return <FavoriteBorderIcon />;
            }
        },
    },
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 190 },
    { field: 'nametype', headerName: 'Type' },
    { field: 'recclass', headerName: 'Class' },
    { field: 'mass', headerName: 'Mass (g)' },
    { field: 'fall', headerName: 'Fall' },
    {
        field: 'year',
        headerName: 'Year',
        valueGetter: (params) => {
            const date = new Date(params.value);
            return `${date.getFullYear()}`;
        },
    },
    {
        field: 'geolocation',
        headerName: 'Coordinates',
        width: 180,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'reclat') || ''},
             ${params.getValue(params.id, 'reclong') || ''}`,
    },
];

// Sample response of meteor data
export const SAMPLE_METEOR_DATA_RESPONSE = [
    {
        name: 'Aachen',
        id: '1',
        nametype: 'Valid',
        recclass: 'L5',
        mass: '21',
        fall: 'Fell',
        year: '1880-01-01T00:00:00.000',
        reclat: '50.775000',
        reclong: '6.083330',
        geolocation: {
            type: 'Point',
            coordinates: [6.08333, 50.775],
        },
    },
    {
        name: 'Aarhus',
        id: '2',
        nametype: 'Valid',
        recclass: 'H6',
        mass: '720',
        fall: 'Fell',
        year: '1951-01-01T00:00:00.000',
        reclat: '56.183330',
        reclong: '10.233330',
        geolocation: {
            type: 'Point',
            coordinates: [10.23333, 56.18333],
        },
    },
    {
        name: 'Abee',
        id: '6',
        nametype: 'Valid',
        recclass: 'EH4',
        mass: '107000',
        fall: 'Fell',
        year: '1952-01-01T00:00:00.000',
        reclat: '54.216670',
        reclong: '-113.000000',
        geolocation: {
            type: 'Point',
            coordinates: [-113, 54.21667],
        },
    },
    {
        name: 'Acapulco',
        id: '10',
        nametype: 'Valid',
        recclass: 'Acapulcoite',
        mass: '1914',
        fall: 'Fell',
        year: '1976-01-01T00:00:00.000',
        reclat: '16.883330',
        reclong: '-99.900000',
        geolocation: {
            type: 'Point',
            coordinates: [-99.9, 16.88333],
        },
    },
    {
        name: 'Achiras',
        id: '370',
        nametype: 'Valid',
        recclass: 'L6',
        mass: '780',
        fall: 'Fell',
        year: '1902-01-01T00:00:00.000',
        reclat: '-33.166670',
        reclong: '-64.950000',
        geolocation: {
            type: 'Point',
            coordinates: [-64.95, -33.16667],
        },
    },
    {
        name: 'Adhi Kot',
        id: '379',
        nametype: 'Valid',
        recclass: 'EH4',
        mass: '4239',
        fall: 'Fell',
        year: '1919-01-01T00:00:00.000',
        reclat: '32.100000',
        reclong: '71.800000',
        geolocation: {
            type: 'Point',
            coordinates: [71.8, 32.1],
        },
    },
    {
        name: 'Adzhi-Bogdo (stone)',
        id: '390',
        nametype: 'Valid',
        recclass: 'LL3-6',
        mass: '910',
        fall: 'Fell',
        year: '1949-01-01T00:00:00.000',
        reclat: '44.833330',
        reclong: '95.166670',
        geolocation: {
            type: 'Point',
            coordinates: [95.16667, 44.83333],
        },
    },
    {
        name: 'Agen',
        id: '392',
        nametype: 'Valid',
        recclass: 'H5',
        mass: '30000',
        fall: 'Fell',
        year: '1814-01-01T00:00:00.000',
        reclat: '44.216670',
        reclong: '0.616670',
        geolocation: {
            type: 'Point',
            coordinates: [0.61667, 44.21667],
        },
    },
];

// Mock API Meteor Response (used for saga tests)
export const SUCCESSFUL_METEOR_RESPONSE = {
    status: HTTP_STATUS_OK,
    json: () => SAMPLE_METEOR_DATA_RESPONSE,
};

// Single favorite data test response
export const SINGLE_FAVORITE_DATA_RESPONSE = [
    {
        name: 'Aachen',
        id: '1',
        nametype: 'Valid',
        recclass: 'L5',
        mass: '21',
        fall: 'Fell',
        favorite: true,
        year: '1880-01-01T00:00:00.000',
        reclat: '50.775000',
        reclong: '6.083330',
        geolocation: {
            type: 'Point',
            coordinates: [6.08333, 50.775],
        },
    },
    {
        name: 'Aarhus',
        id: '2',
        nametype: 'Valid',
        recclass: 'H6',
        mass: '720',
        fall: 'Fell',
        year: '1951-01-01T00:00:00.000',
        reclat: '56.183330',
        reclong: '10.233330',
        geolocation: {
            type: 'Point',
            coordinates: [10.23333, 56.18333],
        },
    },
    {
        name: 'Abee',
        id: '6',
        nametype: 'Valid',
        recclass: 'EH4',
        mass: '107000',
        fall: 'Fell',
        year: '1952-01-01T00:00:00.000',
        reclat: '54.216670',
        reclong: '-113.000000',
        geolocation: {
            type: 'Point',
            coordinates: [-113, 54.21667],
        },
    },
    {
        name: 'Acapulco',
        id: '10',
        nametype: 'Valid',
        recclass: 'Acapulcoite',
        mass: '1914',
        fall: 'Fell',
        year: '1976-01-01T00:00:00.000',
        reclat: '16.883330',
        reclong: '-99.900000',
        geolocation: {
            type: 'Point',
            coordinates: [-99.9, 16.88333],
        },
    },
    {
        name: 'Achiras',
        id: '370',
        nametype: 'Valid',
        recclass: 'L6',
        mass: '780',
        fall: 'Fell',
        year: '1902-01-01T00:00:00.000',
        reclat: '-33.166670',
        reclong: '-64.950000',
        geolocation: {
            type: 'Point',
            coordinates: [-64.95, -33.16667],
        },
    },
    {
        name: 'Adhi Kot',
        id: '379',
        nametype: 'Valid',
        recclass: 'EH4',
        mass: '4239',
        fall: 'Fell',
        year: '1919-01-01T00:00:00.000',
        reclat: '32.100000',
        reclong: '71.800000',
        geolocation: {
            type: 'Point',
            coordinates: [71.8, 32.1],
        },
    },
    {
        name: 'Adzhi-Bogdo (stone)',
        id: '390',
        nametype: 'Valid',
        recclass: 'LL3-6',
        mass: '910',
        fall: 'Fell',
        year: '1949-01-01T00:00:00.000',
        reclat: '44.833330',
        reclong: '95.166670',
        geolocation: {
            type: 'Point',
            coordinates: [95.16667, 44.83333],
        },
    },
    {
        name: 'Agen',
        id: '392',
        nametype: 'Valid',
        recclass: 'H5',
        mass: '30000',
        fall: 'Fell',
        year: '1814-01-01T00:00:00.000',
        reclat: '44.216670',
        reclong: '0.616670',
        geolocation: {
            type: 'Point',
            coordinates: [0.61667, 44.21667],
        },
    },
];

// Single favorite data test response
export const MULTIPLE_FAVORITE_DATA_RESPONSE = [
    {
        name: 'Aachen',
        id: '1',
        nametype: 'Valid',
        recclass: 'L5',
        mass: '21',
        fall: 'Fell',
        favorite: true,
        year: '1880-01-01T00:00:00.000',
        reclat: '50.775000',
        reclong: '6.083330',
        geolocation: {
            type: 'Point',
            coordinates: [6.08333, 50.775],
        },
    },
    {
        name: 'Aarhus',
        id: '2',
        nametype: 'Valid',
        recclass: 'H6',
        mass: '720',
        fall: 'Fell',
        favorite: true,
        year: '1951-01-01T00:00:00.000',
        reclat: '56.183330',
        reclong: '10.233330',
        geolocation: {
            type: 'Point',
            coordinates: [10.23333, 56.18333],
        },
    },
    {
        name: 'Abee',
        id: '6',
        nametype: 'Valid',
        recclass: 'EH4',
        mass: '107000',
        fall: 'Fell',
        year: '1952-01-01T00:00:00.000',
        reclat: '54.216670',
        reclong: '-113.000000',
        geolocation: {
            type: 'Point',
            coordinates: [-113, 54.21667],
        },
    },
    {
        name: 'Acapulco',
        id: '10',
        nametype: 'Valid',
        recclass: 'Acapulcoite',
        mass: '1914',
        fall: 'Fell',
        favorite: true,
        year: '1976-01-01T00:00:00.000',
        reclat: '16.883330',
        reclong: '-99.900000',
        geolocation: {
            type: 'Point',
            coordinates: [-99.9, 16.88333],
        },
    },
    {
        name: 'Achiras',
        id: '370',
        nametype: 'Valid',
        recclass: 'L6',
        mass: '780',
        fall: 'Fell',
        year: '1902-01-01T00:00:00.000',
        reclat: '-33.166670',
        reclong: '-64.950000',
        geolocation: {
            type: 'Point',
            coordinates: [-64.95, -33.16667],
        },
    },
    {
        name: 'Adhi Kot',
        id: '379',
        nametype: 'Valid',
        recclass: 'EH4',
        mass: '4239',
        fall: 'Fell',
        year: '1919-01-01T00:00:00.000',
        reclat: '32.100000',
        reclong: '71.800000',
        geolocation: {
            type: 'Point',
            coordinates: [71.8, 32.1],
        },
    },
    {
        name: 'Adzhi-Bogdo (stone)',
        id: '390',
        nametype: 'Valid',
        recclass: 'LL3-6',
        mass: '910',
        fall: 'Fell',
        year: '1949-01-01T00:00:00.000',
        reclat: '44.833330',
        reclong: '95.166670',
        geolocation: {
            type: 'Point',
            coordinates: [95.16667, 44.83333],
        },
    },
    {
        name: 'Agen',
        id: '392',
        nametype: 'Valid',
        recclass: 'H5',
        mass: '30000',
        fall: 'Fell',
        year: '1814-01-01T00:00:00.000',
        reclat: '44.216670',
        reclong: '0.616670',
        geolocation: {
            type: 'Point',
            coordinates: [0.61667, 44.21667],
        },
    },
];
