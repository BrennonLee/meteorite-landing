import { createTheme } from '@material-ui/core/styles';

const white = '#ffffff';
const manifoldPurple = '#201547';
export const blue = '#1976d2';
export const orange = '#ff6a39';

const fontFamily = 'mr-eaves, sans-serif';

const palette = {
    primary: {
        main: manifoldPurple,
        contrastText: white,
    },
    blue,
    orange,
};

const breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};

/**
 * Basic implementations of `theme.breakpoints.up` and `theme.breakpoints.down` from `@material-ui/core`.
 *
 * @see https://material-ui.com/customization/breakpoints/#api
 *
 * @type {{up: (function(*): string), down: (function(*): string)}}
 */
const breakpointsHelpers = {
    up: (key) => {
        const width =
            typeof breakpoints.values[key] === 'number'
                ? breakpoints.values[key]
                : key;
        return `@media (min-width: ${parseInt(width)}px)`;
    },
    down: (key) => {
        const width =
            typeof breakpoints.values[key] === 'number'
                ? breakpoints.values[key]
                : key;
        const calculatedWidth = Math.max(parseFloat(width) - 0.05, 0);
        return `@media (max-width: ${calculatedWidth.toFixed(2)}px)`;
    },
};

const typography = {
    fontFamily,
    h1: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 20,
        [breakpointsHelpers.up('lg')]: {
            fontSize: 30,
            letterSpacing: 3,
        },
    },
};

export default createTheme({
    themeName: 'Meteorite Landing Theme',
    typography,
    palette,
});
