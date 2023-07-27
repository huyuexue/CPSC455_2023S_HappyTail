import {createTheme} from '@mui/material/styles';
import {darkScrollbar} from "@mui/material";

export const GlobalTheme = createTheme({
    palette: {
        background: {
            paper: "#fcf8f5", // your color
        },
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#597133",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#BC6C25',
            // dark: will be calculated from palette.secondary.main,
        },
        // // Provide every color token (light, main, dark, and contrastText) when using
        // // custom colors for props in Material UI's components.
        // // Then you will be able to use it like this: `<Button color="custom">`
        // // (For TypeScript, you need to add module augmentation for the `custom` value)
        // custom: {
        //     contrastText: 'rgba(0, 0, 0, 0.87)',
        // },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    ...darkScrollbar(),
                    backgroundColor: "#fcf8f5",
                    // backgroundColor: '#FEFA00',
                    "& h1": {
                        color: "black"
                    }
                }
            }
        }
    }
});
