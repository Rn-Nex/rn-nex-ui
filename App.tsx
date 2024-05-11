import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box } from './src';
import { OutlinedTextField } from './src';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" mx={20}>
        <OutlinedTextField placeholder="Outlined" />
      </Box>
    </SafeAreaView>
  );
}

export default App;
