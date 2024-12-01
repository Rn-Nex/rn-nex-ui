import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { Portal } from '../Portal';
import { dialogContainerStyles, styles } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

export const Dialog: React.FC<DialogProps> = ({
  modalContainerProps,
  children,
  dialogContainerProps,
  maxWidth,
  fullWidth = false,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Portal
      animationType="fade"
      modalContainerProps={{ ...modalContainerProps, style: [styles.dialogRootContainer, modalContainerProps?.style] }}
      {...props}>
      <Box
        style={StyleSheet.flatten([
          styles.dialogContainer,
          dialogContainerStyles({ theme, fullWidth, maxWidth }),
          dialogContainerProps?.style,
        ])}
        sx={dialogContainerProps?.sx}
        {...dialogContainerProps}>
        {children}
      </Box>
    </Portal>
  );
};
