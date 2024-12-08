import React, { forwardRef, useMemo } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../Box';
import { ModalContainerProps } from './Portal.types';
import { createModalBackgroundStyles } from './Portal.styles';

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
        <TouchableWithoutFeedback accessible={false}>{children}</TouchableWithoutFeedback>
      </Box>
    </TouchableWithoutFeedback>
  );
});
