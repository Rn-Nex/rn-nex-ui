import React from 'react';
import { Avatar, Box, Chip, Divider, Text, useTheme } from '../src';

export const Ex1: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ d: 'flex', items: 'center', content: 'center', px: 10 }}>
      <Box sx={{ w: 350, bg: theme.colors.grey[800], r: 2, pb: 20 }}>
        <Box sx={{ p: 10 }}>
          <Text>This is first line</Text>
        </Box>
        <Divider />
        <Box sx={{ p: 10 }}>
          <Text>This is second line</Text>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider variant="fullWidth" />
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Text>Center</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right">
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="left">
          <Text>Left</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Chip" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Outlined chip" variant="outlined" />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
          <Chip label="Custom chip" variant="outlined" labelContainerProps={{ style: { color: 'green' } }} />
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider>
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
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" dividerBorderStyles={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" leftDividerBorderStyle={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
        <Box sx={{ p: 10 }}>
          <Text>Other line</Text>
        </Box>
        <Divider textAlign="right" rightDividerBorderStyle={{ backgroundColor: 'red' }}>
          <Text>Right</Text>
        </Divider>
      </Box>
    </Box>
  );
};

export const Ex2: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        d: 'flex',
        items: 'center',
        content: 'center',
        px: 10,
        gap: 10,
      }}>
      <Box
        sx={{
          w: 350,
          bg: theme.colors.grey[800],
          r: 2,
          d: 'flex',
          h: 80,
          fDirection: 'row',
        }}>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>1</Text>
        </Box>
        <Divider orientation="vertical" variant="fullWidth" />
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>2</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" />
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>3</Text>
        </Box>
        <Divider orientation="vertical" variant="middle">
          <Text>Center</Text>
        </Divider>
      </Box>
      <Box
        sx={{
          w: 400,
          bg: theme.colors.grey[800],
          r: 2,
          d: 'flex',
          h: 80,
          fDirection: 'row',
        }}>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>1</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" textAlign="left">
          <Text>Left</Text>
        </Divider>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>2</Text>
        </Box>
        <Divider orientation="vertical" variant="middle">
          <Text>Center</Text>
        </Divider>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>3</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" textAlign="right">
          <Text>Right</Text>
        </Divider>
      </Box>
      <Box
        sx={{
          w: 400,
          bg: theme.colors.grey[800],
          r: 2,
          d: 'flex',
          h: 80,
          fDirection: 'row',
        }}>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>1</Text>
        </Box>
        <Divider orientation="vertical" variant="middle" textAlign="left">
          <Chip label="Custom chip" variant="outlined" labelContainerProps={{ style: { color: 'green' } }} />
        </Divider>
        <Box sx={{ w: 70, d: 'flex', items: 'center', content: 'center' }}>
          <Text>2</Text>
        </Box>
        <Divider orientation="vertical" variant="middle">
          <Chip label="Chip" variant="outlined" onPress={() => console.log('pressed')} />
        </Divider>
      </Box>
    </Box>
  );
};
