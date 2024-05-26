import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from '../../../../nex-ui/src';
import { SnackbarProps } from '../../../../nex-ui/src/components/Snackbar/SnackbarTypes';

const App: React.FC = () => {
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

export default App;
