import React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';
import { useThemeColorsSelector } from '../../libraries/index.ts';
import { Text } from '../Typography/index.ts';
import { dialogTitleStyles } from './Dialog.styles.ts';
import { DialogTitleProps } from './Dialog.types';

export const DialogTitle = React.forwardRef<RnText, DialogTitleProps>(({ style, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  return <Text variation="h3" style={StyleSheet.flatten([dialogTitleStyles(themeColors), style])} {...props} ref={ref} />;
});
