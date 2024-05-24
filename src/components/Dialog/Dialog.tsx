import React, { useMemo } from 'react';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import Portal from '../Portal/Portal';
import { DialogProps } from './DialogTypes';
import { dialogContainerStyles, dialogStyles } from './utils';

export const Dialog: React.FC<DialogProps> = ({ modalContainerProps, children, dialogContainerProps, ...props }) => {
  const { theme } = useTheme();
  const dialogContainer = useMemo(() => dialogContainerStyles(theme), [theme]);

  return (
    <Portal
      animationType="fade"
      modalContainerProps={{ ...modalContainerProps, style: [dialogStyles(), modalContainerProps?.style] }}
      {...props}>
      <Box {...dialogContainerProps} style={[dialogContainer, dialogContainerProps?.style]}>
        {children}
      </Box>
    </Portal>
  );
};
