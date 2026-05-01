import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function AppThemeProvider({ children }) {
  const mode = useSelector((state) => state.ui.theme);

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#1E3A5F' },
      secondary: { main: '#FF6B00' },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#F7F9FB',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: 'Inter, Plus Jakarta Sans, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
