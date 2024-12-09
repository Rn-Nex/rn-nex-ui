import React from 'react';
import { Box, Chip } from '../src';

export const Ex1: React.FC = () => {
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
      }}>
      <Chip label="Chip" />
      <Chip label="Outlined chip" variant="outlined" />
      <Chip label="Custom chip" variant="outlined" />
      <Chip label="Disabled chip" variant="outlined" disabled />
      <Chip label="Chip with start adornment chip" variant="outlined" />
      <Chip label="Chip with start adornment chip" variant="outlined" />
      <Chip label="Chip with start adornment chip with styles" variant="outlined" />
      <Chip label="Chip with end adornment chip" variant="outlined" />
      <Chip label="Chip with end adornment chip" variant="outlined" />
      <Chip label="Chip with end adornment chip with styles" variant="outlined" />
      <Chip label="onPress chip" variant="outlined" onPress={() => console.log('pressed')} />
      <Chip label="onPress chip without ripple effect" variant="outlined" disableRipple onPress={() => console.log('pressed')} />
      <Chip
        label="onPress chip with rippleEdge bottom left"
        variant="outlined"
        rippleEdge="bottomLeft"
        onPress={() => console.log('pressed')}
      />
      <Chip
        label="onPress chip with rippleEdge bottom right"
        variant="outlined"
        rippleEdge="bottomRight"
        onPress={() => console.log('pressed')}
      />
      <Chip
        label="onPress chip with rippleEdge center"
        variant="outlined"
        rippleEdge="center"
        onPress={() => console.log('pressed')}
      />
      <Chip
        label="onPress chip with rippleEdge top left"
        variant="outlined"
        rippleEdge="topLeft"
        onPress={() => console.log('pressed')}
      />
      <Chip
        label="onPress chip with rippleEdge top right"
        variant="outlined"
        rippleEdge="topRight"
        onPress={() => console.log('pressed')}
      />
    </Box>
  );
};
