import React from 'react';
import { Box, ThemeProvider, defaultDarkTheme, defaultLightTheme } from '../../src';

const App: React.FC = () => {
  return (
    <ThemeProvider
      mode="dark"
      lightTheme={{
        ...defaultLightTheme,
        colors: {
          ...defaultLightTheme.colors,
          scan: {
            50: '#000000',
          },
        },
      }}
      darkTheme={{
        ...defaultDarkTheme,
        colors: {
          ...defaultDarkTheme.colors,
          scan: {
            50: 'red',
          },
        },
      }}>
      <Box sx={{ f: 1, d: 'flex', content: 'center', items: 'center', px: 10 }} />
    </ThemeProvider>
  );
};

export default App;
