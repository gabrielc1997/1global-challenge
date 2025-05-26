import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#0A192F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#64748B',
    },
    text: {
      primary: '#1E1E2F',
      secondary: '#4B5563',
    },
  },
  spacing: 8,
typography: {
  fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '40px',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: '32px',
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: '28px',
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '24px',
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '20px',
  },
  h6: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '20px',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: '24px',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: '20px',
  },
  button: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '20px',
    textTransform: 'none',
  },
},
  shape: {
    borderRadius: 8,
  },
});

export default theme;