import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ListItemTextProps } from './ListTypes';
import { listItemTextStyles } from './List.style';
import { Box } from '../Box';
import { Text } from '../Typography';

export const ListItemText = React.forwardRef<View, ListItemTextProps>(
  (
    { sx, style, primary, primaryLabelProps, secondary, secondaryLabelProps, disablePadding, alignItems = 'start', ...props },
    ref,
  ) => {
    const styles = useMemo(() => listItemTextStyles({ disablePadding, alignItems }), [disablePadding, alignItems]);

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
