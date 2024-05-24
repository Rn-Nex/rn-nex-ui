import React, { useMemo } from 'react';
import { Text as RnText } from 'react-native';
import { DialogTitleProps } from './DialogTypes';
import { Text } from '../Typography';
import { dialogTitleStyles } from './utils.ts';
import { useTheme } from '../../libraries/index.ts';

export const DialogTitle = React.forwardRef<RnText, DialogTitleProps>(({ style, ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useMemo(() => dialogTitleStyles(theme), [theme]);

  return <Text variation="h3" style={[styles, style]} {...props} ref={ref} />;
});
