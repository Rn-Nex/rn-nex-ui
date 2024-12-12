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
    const listDisablePadding = disablePadding ?? listThemeConfig?.disablePadding;

    const listContainerStyles = useMemo(() => listStyles({ disablePadding: listDisablePadding }), [listDisablePadding]);

    return (
      <Box sx={sx} style={StyleSheet.flatten([listContainerStyles, listThemeConfig?.style, style])} ref={ref} {...props}>
        {subheader && (
          <Box
            style={StyleSheet.flatten([
              styles.headerContainer,
              listThemeConfig?.subheaderContainerStyles,
              subheaderContainerStyles,
            ])}
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
