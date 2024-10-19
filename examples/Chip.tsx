import React from 'react';
import { Avatar, Box, Chip, IconButton } from '../src';

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
      <Chip label="Custom chip" variant="outlined" labelContainerProps={{ style: { color: 'green' } }} />
      <Chip label="Disabled chip" variant="outlined" disabled />
      <Chip
        label="Chip with start adornment chip"
        variant="outlined"
        startAdornment={
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
            }}
            size={25}
            variation="rounded"
          />
        }
      />
      <Chip
        label="Chip with start adornment chip"
        variant="outlined"
        startAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
      />
      <Chip
        label="Chip with start adornment chip with styles"
        variant="outlined"
        startAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
        startAdornmentContainerStyle={{
          backgroundColor: 'red',
          borderRadius: 10,
        }}
      />
      <Chip
        label="Chip with end adornment chip"
        variant="outlined"
        endAdornment={
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
            }}
            size={25}
            variation="rounded"
          />
        }
      />
      <Chip
        label="Chip with end adornment chip"
        variant="outlined"
        endAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
      />
      <Chip
        label="Chip with end adornment chip with styles"
        variant="outlined"
        endAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/vRrTws13r9jDY4EkNZTe6uV6WhoBaE5Y2Q6QOUE6OFc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
        endAdornmentContainerStyle={{
          backgroundColor: 'red',
          borderRadius: 10,
        }}
      />
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
