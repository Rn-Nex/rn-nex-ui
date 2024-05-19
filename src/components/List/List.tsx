import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Typography';
import { ListProps } from './ListTypes';
import { headerContainerStyles, listStyles } from './utils';

export const List = React.forwardRef<View, ListProps>(
  ({ sx, style, subheader, children, subheaderProps, subheaderContainerStyles, disablePadding, ...props }, ref) => {
    const styles = useMemo(() => listStyles({ disablePadding }), [disablePadding]);
    const headerStyles = useMemo(() => headerContainerStyles(), []);

    return (
      <Box sx={sx} style={[styles, style]} ref={ref} {...props}>
        {subheader && (
          <Box sx={subheaderContainerStyles?.sx} style={[headerStyles, subheaderContainerStyles?.style]}>
            <Text variation="h4" {...subheaderProps}>
              {subheader}
            </Text>
          </Box>
        )}
        {children}
      </Box>
    );
  },
);
