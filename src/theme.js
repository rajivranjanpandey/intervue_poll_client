import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7765DA',  // Main primary color
        },
        secondary: {
            main: '#5767D0',  // Main secondary color
        },
        accent: {
            main: '#4F0DCE',  // Accent color
        },
        background: {
            default: '#F2F2F2',  // Background color for the app
        },
        text: {
            primary: '#373737',  // Primary text color
            secondary: '#6E6E6E',  // Secondary text color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            color: '#373737',  // Ensure that body text uses the primary text color
        },
        body2: {
            fontSize: '0.875rem',
            color: '#6E6E6E',  // Use secondary text color for smaller text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '30px',  // Consistent button border radius
                    textTransform: 'none',  // Disable uppercase text in buttons
                },
                containedPrimary: {
                    backgroundColor: '#7765DA',
                    '&:hover': {
                        backgroundColor: '#4F0DCE',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',  // Use white for paper backgrounds
                    padding: '20px',  // Add padding for paper components
                },
            },
        },
    },
});

export default theme;
