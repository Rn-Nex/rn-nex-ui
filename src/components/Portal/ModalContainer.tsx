import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { ModalContainerProps } from './PortalTypes';
import { createModalBackgroundStyles } from './utils';

export const ModalContainer = forwardRef<View, ModalContainerProps>(({ style, sx, ...props }, ref) => {
  const styles = useMemo(() => createModalBackgroundStyles(), []);
  return <Box style={[styles, style]} sx={sx} ref={ref} {...props} />;
});
