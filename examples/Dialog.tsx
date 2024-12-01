import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  PortalProvider,
} from '../src';

export const Ex1: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <PortalProvider key="un">
      <Dialog maxWidth="lg" visible={showDialog} portalKey="modal_key" onClose={() => setShowDialog(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup removeBorders variation="text" disableRipple baseButtonStyles={{ paddingTop: 5, paddingBottom: 5 }}>
            <Button label="Done" buttonColor="success" onPress={() => {}} />
            <Button label="Close" buttonColor="error" onPress={() => {}} />
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      <Button onPress={() => setShowDialog(!showDialog)} label="Open" />
    </PortalProvider>
  );
};
