import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../src';
import Portal from '../../../src/components/Portal/Portal';

const PortalExample2: React.FC = () => {
  const [portalVisible, setPortalVisible] = useState(false);

  const togglePortal = () => {
    setPortalVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePortal}>
        <Text>Show Portal with Complex Interaction</Text>
      </TouchableOpacity>

      <Portal
        key="PortalExample2"
        visible={portalVisible}
        onDismiss={togglePortal}
        modalContainerProps={{ style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
        <View style={styles.portalContent}>
          <Text>This is Portal Example 3!</Text>
          <Button fullWidth onPress={togglePortal}>
            <Text>Close</Text>
          </Button>
        </View>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default PortalExample2;
