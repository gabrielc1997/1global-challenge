import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const darkTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#90CAF9',
        },
        background: {
          default: '#1E1E2F',
          paper: '#2C2F36',
        },
        text: {
          primary: '#FFFFFF',
        },
      },
    },
  },
});

export default darkTheme;
