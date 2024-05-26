import React, { forwardRef, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../Box';
import { ModalContainerProps } from './PortalTypes';
import { createModalBackgroundStyles } from './utils';

export const ModalContainer = forwardRef<View, ModalContainerProps>(({ style, sx, onClose, ...props }, ref) => {
  const styles = useMemo(() => createModalBackgroundStyles(), []);
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Box style={[styles, style]} sx={sx} ref={ref} {...props} />
    </TouchableWithoutFeedback>
  );
});
