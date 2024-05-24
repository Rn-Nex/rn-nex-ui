import React, { useMemo } from 'react';
import { Text as RnText } from 'react-native';
import { TextProps } from '../Typography/TextTypes';
import { Text } from '../Typography';
import { useTheme } from '../../libraries';
import { DialogContentTextStyles } from './utils';

export const DialogContentText = React.forwardRef<RnText, TextProps>(({ sx, ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useMemo(() => DialogContentTextStyles(theme), [theme]);

  return <Text variation="h4" ref={ref} style={[styles, sx]} {...props} />;
});
