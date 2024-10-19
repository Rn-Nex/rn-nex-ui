import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Snackbar, Text } from '../src';
import { SnackbarProps } from '../src/components/types';

export const App: React.FC = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSnackbarHide = () => {
    setSnackbarVisible(false);
  };

  const snackbarProps: SnackbarProps = {
    message: 'Custom Snackbar with Action Component',
    visible: snackbarVisible,
    autoHideDuration: 3000,
    actionComponent: (
      <Button variation="text" onPress={() => setSnackbarVisible(false)}>
        <Text sx={{ color: 'green' }}>Custom Action</Text>
      </Button>
    ),
    onHide: handleSnackbarHide,
  };

  return (
    <View style={styles.container}>
      <Button fullWidth onPress={() => setSnackbarVisible(true)}>
        <Text>Show Snackbar</Text>
      </Button>
      <Snackbar {...snackbarProps} />
      <Snackbar {...snackbarProps} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} />
      <Snackbar {...snackbarProps} backgroundColor="red" />
      <Snackbar {...snackbarProps} textColor="red" />
      <Snackbar {...snackbarProps} elevation={1} />
      <Snackbar {...snackbarProps} borderRadius={10} />
      <Snackbar {...snackbarProps} borderRadius={10} onHide={() => console.log('hide')} />
      <Snackbar
        {...snackbarProps}
        borderRadius={10}
        startAdornment={
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
            }}
            size={30}
            variation="rounded"
          />
        }
        startAdornmentContainerStyle={{ backgroundColor: 'red' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
