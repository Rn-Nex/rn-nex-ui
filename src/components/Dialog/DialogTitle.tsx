import React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';
import { useTheme } from '../../libraries/index.ts';
import { Text } from '../Typography/index.ts';
import { dialogTitleStyles } from './Dialog.styles.ts';
import { DialogTitleProps } from './Dialog.types';

export const DialogTitle = React.forwardRef<RnText, DialogTitleProps>(({ style, ...props }, ref) => {
  const { theme } = useTheme();

  return <Text variation="h3" style={StyleSheet.flatten([dialogTitleStyles(theme), style])} {...props} ref={ref} />;
});
