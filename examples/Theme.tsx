import React from 'react';
import { Box, ThemeProvider } from '../src';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Box sx={{ f: 1, d: 'flex', content: 'center', items: 'center', px: 10 }} />
    </ThemeProvider>
  );
};

export default App;
