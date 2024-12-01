import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { styles, dialogActionsContainerStyles as dialogActionsContainerS } from './Dialog.styles';
import { DialogActionsProps } from './Dialog.types';

export const DialogActions = React.forwardRef<View, DialogActionsProps>(
  ({ style, children, dialogActionsContainerStyles, maxWidth = 150, fullWidth, ...props }, ref) => {
    return (
      <Box ref={ref} style={StyleSheet.flatten([styles.dialogActions, style])} {...props}>
        <View
          style={StyleSheet.flatten([
            styles.dialogActionsContainer,
            dialogActionsContainerS({ maxWidth, fullWidth }),
            dialogActionsContainerStyles,
          ])}>
          {children}
        </View>
      </Box>
    );
  },
);
