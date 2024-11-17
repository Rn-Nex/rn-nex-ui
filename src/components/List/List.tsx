import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Typography';
import { listStyles, styles } from './List.style';
import { ListProps } from './List.types';

export const List = React.forwardRef<View, ListProps>(
  ({ sx, style, subheader, children, subheaderProps, subheaderContainerStyles, disablePadding, ...props }, ref) => {
    const listContainerStyles = useMemo(() => ({ generated: listStyles({ disablePadding }) }), [disablePadding]);

    return (
      <Box sx={sx} style={StyleSheet.flatten([listContainerStyles.generated, style])} ref={ref} {...props}>
        {subheader && (
          <Box
            sx={subheaderContainerStyles?.sx}
            style={StyleSheet.flatten([styles.headerContainer, subheaderContainerStyles?.style])}>
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
