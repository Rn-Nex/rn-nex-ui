import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardMedia,
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
} from '../src';

export const Ex1: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <PortalProvider key="un">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Dialog visible={showDialog} portalKey="modal_key" onClose={() => setShowDialog(false)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText gutterBottom>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                paddingHorizontal: 30,
                paddingVertical: 8,
                borderRadius: 0,
              }}
              variation="text"
              onPress={() => setShowDialog(false)}>
              <Text>Close</Text>
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

export const Ex2: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <PortalProvider key="un">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Dialog visible={showDialog} portalKey="modal_key" onClose={() => setShowDialog(false)}>
          <DialogTitle variation="h3">Subscribe</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText gutterBottom>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText>
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
              <Text>Close</Text>
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

export const Ex3: React.FC = () => {
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
        <Dialog visible={showDialog} portalKey="modal_key" onClose={() => setShowDialog(false)}>
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
            <TextField style={{ marginTop: 10 }} variant="filled" />
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

export const Ex4: React.FC = () => {
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
        <Dialog visible={showDialog} portalKey="modal_key" onClose={() => setShowDialog(false)} animationType="slide">
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
            <TextField style={{ marginTop: 10 }} variant="filled" />
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

export const Ex5: React.FC = () => {
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
        <Dialog
          visible={showDialog}
          portalKey="modal_key"
          onClose={() => setShowDialog(false)}
          dialogContainerProps={{
            style: { backgroundColor: 'red', width: '80%' },
            sx: { py: 100 },
          }}>
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
            <TextField style={{ marginTop: 10 }} variant="filled" />
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

export const Ex6: React.FC = () => {
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
        <Dialog visible={showDialog} portalKey="modal_key" onClose={() => setShowDialog(false)}>
          <DialogTitle>Subscribe</DialogTitle>
          <Divider />
          <DialogContent>
            <Card
              sx={{
                maxW: 350,
                bg: theme.colors.grey[500],
                r: 10,
              }}>
              <CardAction onPress={() => console.log('pressed')}>
                <CardMedia
                  src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  sx={{ w: 'auto', h: 200, ret: 10, rst: 10 }}
                />
                <CardContent sx={{ px: 10, py: 10 }}>
                  <Text variation="h5">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
                    frozen peas along with the mussels, if you like.
                  </Text>
                </CardContent>
              </CardAction>
            </Card>
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
