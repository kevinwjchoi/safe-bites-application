import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#79A76B', // Sage green
      light: '#79A76B', // Sage garden
      dark: '#4A5D23', // Darker sage green
    },
    secondary: {
      main: '#FF9800', // Bold orange
      light: '#FFB74D', // Lighter orange
      dark: '#F57C00', // Darker orange
    },
    background: {
      default: '#C7D1C5', // Frosted Sage 
      paper: '#F5F5F5', // Light grey surfaces
    },
    text: {
      primary: '#212121', // Dark grey text
      secondary: '#757575', // Medium grey text
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600, 
      fontSize: '2rem',
    },
    body1: {
      fontWeight: 400, 
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 800,
      fontSize: '1.5rem',
    }
  },
});

export default theme;
