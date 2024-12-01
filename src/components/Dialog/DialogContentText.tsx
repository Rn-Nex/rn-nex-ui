import React from 'react';
import { Text as RnText } from 'react-native';
import { useTheme } from '../../libraries';
import { Text } from '../Typography';
import { TextProps } from '../Typography/Text.types';
import { dialogContentTextStyles } from './Dialog.styles';

export const DialogContentText = React.forwardRef<RnText, TextProps>(({ sx, ...props }, ref) => {
  const { theme } = useTheme();

  return <Text variation="h4" ref={ref} style={[dialogContentTextStyles(theme), sx]} {...props} />;
});
