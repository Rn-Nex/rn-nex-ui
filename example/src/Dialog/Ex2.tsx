import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  PortalProvider,
  Text,
  TextField,
  useTheme,
} from '../../../../nex-ui/src';

const App: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { theme } = useTheme();

  return (
    <PortalProvider>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Dialog visible={showDialog} portalKey="modal_key">
          <DialogTitle>Subscribe</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText gutterBottom>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              style={{ marginTop: 10 }}
              inputLabelProps={{
                labelContainerStyles: {
                  backgroundColor: theme.colors.grey[800],
                },
                style: {
                  color: theme.colors.white[50],
                },
              }}
            />
            <TextField style={{ marginTop: 10 }} />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              style={{
                paddingHorizontal: 30,
                paddingVertical: 8,
                borderRadius: 0,
              }}
              variation="text"
              onPress={() => setShowDialog(false)}>
              <Text style={{ color: 'white' }}>Close</Text>
            </Button>
          </DialogActions>
        </Dialog>
        <Button fullWidth onPress={() => setShowDialog(!showDialog)}>
          <Text>Open</Text>
        </Button>
      </View>
    </PortalProvider>
  );
};

export default App;
