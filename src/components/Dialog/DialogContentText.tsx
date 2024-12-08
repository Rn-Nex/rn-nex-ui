import React from 'react';
import { Text as RnText } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Text } from '../Typography';
import { TextProps } from '../Typography/Text.types';
import { dialogContentTextStyles } from './Dialog.styles';

export const DialogContentText = React.forwardRef<RnText, TextProps>(({ sx, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  return <Text variation="h4" ref={ref} style={[dialogContentTextStyles(themeColors), sx]} {...props} />;
});
