import React from 'react';
import { Text as RnText } from 'react-native';
import { TextProps } from '../Typography/TextTypes';
import { Text } from '../Typography';

export const DialogContentText = React.forwardRef<RnText, TextProps>((props, ref) => {
  return <Text variation="h4" ref={ref} {...props} />;
});
