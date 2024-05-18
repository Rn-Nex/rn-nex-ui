import React, { useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Typography';
import { ListProps, ListItemProps, ListItemIconProps, ListItemTextProps } from './ListTypes';
import { listItemStyles, listStyles, listItemIconStyles, listItemTextStyles } from './utils';
import { BaseButton } from '../Button/BaseButton';

export const List = React.forwardRef<View, ListProps>(({ sx, style, ...props }, ref) => {
  const styles = useMemo(() => listStyles(), []);
  return <Box sx={sx} style={[styles, style]} ref={ref} {...props} />;
});

export const ListItem = React.forwardRef<TouchableWithoutFeedback, ListItemProps>(({ children, style, ...props }, ref) => {
  const styles = useMemo(() => listItemStyles(), []);
  return (
    <BaseButton style={[styles, style]} ref={ref} {...props}>
      {children}
    </BaseButton>
  );
});

export const ListItemIcon = React.forwardRef<View, ListItemIconProps>(({ sx, style, ...props }, ref) => {
  const styles = useMemo(() => listItemIconStyles(), []);
  return <Box sx={sx} ref={ref} style={[styles, style]} {...props} />;
});

export const ListItemText = React.forwardRef<View, ListItemTextProps>(
  ({ sx, style, primary, primaryLabelProps, secondary, secondaryLabelProps, disablePadding, ...props }, ref) => {
    const styles = useMemo(() => listItemTextStyles({ disablePadding }), [disablePadding]);
    return (
      <Box sx={sx} ref={ref} style={[styles, style]} {...props}>
        {primary && (
          <Text variation="h3" {...primaryLabelProps}>
            {primary}
          </Text>
        )}
        {secondary && (
          <Text variation="h5" {...secondaryLabelProps}>
            {secondary}
          </Text>
        )}
      </Box>
    );
  },
);
