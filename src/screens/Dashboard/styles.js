export default (theme) => ({
    dashboardContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '0 10px',
        [theme.breakpoints.up('lg')]: {
            padding: '0 100px',
        },
    },
    datasource: {
        marginTop: 20,
        paddingLeft: '2rem',
    },
    link: {
        color: theme.palette.blue,
    },
    error: {
        marginTop: 20,
        paddingLeft: '2rem',
    },
    errorText: {
        color: 'red',
    },
    disabled: {
        backgroundColor: 'grey',
    },
    dataContainer: {
        height: 800,
        padding: '2rem',
        paddingTop: 15,
        [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: '15px 0 0 0',
            height: 500,
        },
    },
});
