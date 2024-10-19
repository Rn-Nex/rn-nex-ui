import React from 'react';
import { Box, Button, Text } from '../src';

export const App: React.FC = () => {
  return (
    <Box
      sx={{
        f: 1,
        d: 'flex',
        items: 'center',
        content: 'center',
        px: 10,
        fDirection: 'column',
        gap: 10,
        w: '100%',
      }}>
      <Button onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button fullWidth onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button onPress={() => console.log('pressed')} fullWidth variation="outlined">
        <Text style={{ color: 'grey' }}>Click here</Text>
      </Button>
      <Button onPress={() => console.log('pressed')} fullWidth variation="text">
        <Text style={{ color: 'grey' }}>Click here</Text>
      </Button>
      <Button fullWidth buttonColor="primary" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button fullWidth buttonColor="secondary" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button fullWidth buttonColor="success" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button fullWidth buttonColor="warning" onPress={() => console.log('pressed')}>
        <Text>Click here</Text>
      </Button>
      <Button sx={{ r: 30, px: 20, py: 10, w: '100%' }} onPress={() => console.log('pressed')}>
        <Text>Custom button</Text>
      </Button>
      <Button onPress={() => {}} buttonColor="secondary" label="Save" />
    </Box>
  );
};
