import { createMuiTheme } from '@material-ui/core/styles';

const green = "#54e346";
const yellow = "#f8df00";
const theme = createMuiTheme({
    palette: {
        common:{
            green,
            yellow
        },
        primary: {
            main: green,
        },
        secondary: {
            main: yellow,
        },
    },
});

export default theme;