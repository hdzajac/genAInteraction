import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#FF00FF',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#ffffff',
    },
  },
  typography: {
    h1: {
        fontSize: '5em',
        marginTop: '-0.2em'
    },
    h2: {
        fontSize: '3em'
    },
    h3: {
        fontSize: '2em'
    },
    body1: {
        
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: [
      'Yatra One',
      'Abril Fatface',
      'Unbounded',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
    ].join(','),
      },
    },
  },
  },
);
