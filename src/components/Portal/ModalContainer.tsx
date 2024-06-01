import React, { forwardRef, useMemo } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../Box';
import { ModalContainerProps } from './PortalTypes';
import { createModalBackgroundStyles } from './utils';

export const ModalContainer = forwardRef<View, ModalContainerProps>(({ style, sx, onClose, children, ...props }, ref) => {
  const styles = useMemo(() => createModalBackgroundStyles(), []);

  const onPressHandler = (_: GestureResponderEvent) => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <Box style={[styles, style]} sx={sx} ref={ref} {...props}>
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
      </Box>
    </TouchableWithoutFeedback>
  );
});
