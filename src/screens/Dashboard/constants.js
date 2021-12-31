export const METEOR_DATA_COLUMNS = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'nametype', headerName: 'Type', width: 70 },
    { field: 'recclass', headerName: 'Class', width: 140 },
    { field: 'mass', headerName: 'Mass (g)', width: 140 },
    { field: 'fall', headerName: 'Fall', width: 70 },
    { field: 'year', headerName: 'Year', width: 140 },
    {
        field: 'geolocation',
        headerName: 'Coordinates',
        width: 210,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'reclat') || ''},
             ${params.getValue(params.id, 'reclong') || ''}`,
    },
];
