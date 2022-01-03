export default (theme) => ({
    dashboardContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
            padding: '0px 100px',
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '2rem',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-end',
        },
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        margin: '0 15px',
        marginTop: 25,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(127, 07, 224)',
        },
    },
    buttonLabel: {
        color: theme.palette.primary.contrastText,
        margin: '0 5px',
        letterSpacing: 2,
        textTransform: 'capitalize',
        fontWeight: 600,
        [theme.breakpoints.up('lg')]: {
            margin: '0 10px',
        },
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
        },
    },
});
