import React from 'react';
import Portal from '../Portal/Portal';
import { DialogProps } from './DialogTypes';
import { dialogContainerStyles, dialogStyles } from './utils';
import { Box } from '../Box';
import { useTheme } from '../../libraries';

export const Dialog: React.FC<DialogProps> = ({ modalContainerProps, children, dialogContainerProps, ...props }) => {
  const { theme } = useTheme();

  return (
    <Portal
      animationType="fade"
      modalContainerProps={{ ...modalContainerProps, style: [dialogStyles(), modalContainerProps?.style] }}
      {...props}>
      <Box {...dialogContainerProps} style={[dialogContainerStyles(theme), dialogContainerProps?.style]}>
        {children}
      </Box>
    </Portal>
  );
};
