import React from 'react';
import { Text as RnText } from 'react-native';
import { DialogTitleProps } from './DialogTypes';
import { Text } from '../Typography';
import { dialogTitleStyles } from './utils.ts';

export const DialogTitle = React.forwardRef<RnText, DialogTitleProps>(({ style, ...props }, ref) => {
  return <Text variation="h3" style={[dialogTitleStyles(), style]} {...props} ref={ref} />;
});
