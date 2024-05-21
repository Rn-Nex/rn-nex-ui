import React from 'react';
import Portal from '../Portal/Portal';
import { DialogProps } from './DialogTypes';
import { dialogContainerStyles, dialogStyles } from './utils';
import { Box } from '../Box';

export const Dialog: React.FC<DialogProps> = ({ modalContainerProps, children, dialogContainerProps, ...props }) => {
  return (
    <Portal
      animationType="fade"
      modalContainerProps={{ ...modalContainerProps, style: [dialogStyles(), modalContainerProps?.style] }}
      {...props}>
      <Box {...dialogContainerProps} style={[dialogContainerStyles(), dialogContainerProps?.style]}>
        {children}
      </Box>
    </Portal>
  );
};
