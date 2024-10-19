import React from 'react';
import { Avatar, BaseInput, Box, IconButton, TextField, useTheme } from '../src';

export const App: React.FC = () => {
  const { theme } = useTheme();

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
      <TextField variant="outlined" placeholder="Outlined" />
      <TextField variant="filled" placeholder="Filled" />
      <TextField variant="outlined" placeholder="Outlined" style={{ borderColor: 'red', borderRadius: 20 }} />
      <TextField variant="outlined" placeholder="Outlined" activeColor="pink" />
      <TextField variant="outlined" placeholder="Outlined" error />
      <TextField variant="filled" placeholder="Filled" error />
      <TextField variant="outlined" placeholder="Outlined" error editable={false} />
      <TextField variant="filled" placeholder="Filled" error editable={false} />
      <TextField
        variant="outlined"
        placeholder="Outlined"
        error
        startAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
      />
      <TextField
        variant="filled"
        placeholder="Filled"
        error
        endAdornment={
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
            }}
            size={25}
            variation="rounded"
          />
        }
      />
      <TextField
        variant="outlined"
        placeholder="Outlined"
        error
        endAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
      />
      <Box
        sx={{
          w: '100%',
          bg: theme.colors.grey[300],
          px: 10,
          py: 5,
          r: 8,
          bColor: theme.colors.grey[400],
          bWidth: 1,
        }}>
        <BaseInput placeholder="Base input" style={{ color: theme.colors.grey[800] }} />
      </Box>
      <TextField
        variant="outlined"
        placeholder="Filled"
        error
        endAdornment={
          <IconButton onPress={() => console.log('pressed')}>
            <Avatar
              source={{
                uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
              }}
              size={25}
              variation="rounded"
            />
          </IconButton>
        }
        endAdornmentContainerProps={{
          style: { backgroundColor: 'red', marginLeft: 10 },
        }}
      />
    </Box>
  );
};
