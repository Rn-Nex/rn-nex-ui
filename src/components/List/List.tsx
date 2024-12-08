import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeListConfigSelector } from '../../libraries';
import { Box } from '../Box';
import { Text } from '../Typography';
import { listStyles, styles } from './List.style';
import { ListProps } from './List.types';

export const List = React.forwardRef<View, ListProps>(
  (
    {
      sx,
      style,
      subheader,
      children,
      subheaderProps,
      subheaderContainerStyles,
      disablePadding,
      subHeaderContainerTestId,
      ...props
    },
    ref,
  ) => {
    const listThemeConfig = useThemeListConfigSelector();

    const {
      sx: themeListSx = sx,
      subheaderContainerStyles: themeSubHeaderContainerStyles = subheaderContainerStyles,
      disablePadding: shouldApplyDisablePadding = disablePadding,
    } = listThemeConfig || {};

    const listContainerStyles = useMemo(
      () => listStyles({ disablePadding: shouldApplyDisablePadding }),
      [shouldApplyDisablePadding],
    );

    return (
      <Box sx={themeListSx} style={StyleSheet.flatten([listContainerStyles, style])} ref={ref} {...props}>
        {subheader && (
          <Box
            sx={themeSubHeaderContainerStyles?.sx}
            style={StyleSheet.flatten([styles.headerContainer, themeSubHeaderContainerStyles?.style])}
            testID={subHeaderContainerTestId}>
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
