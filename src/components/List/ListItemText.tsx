import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Typography';
import { listItemTextStyles, styles } from './List.style';
import { ListItemTextProps } from './List.types';

export const ListItemText = React.forwardRef<View, ListItemTextProps>(
  (
    {
      sx,
      style,
      primary,
      primaryLabelStyles,
      secondary,
      secondaryLabelStyles,
      secondaryLabelProps,
      disablePadding,
      primaryLabelProps,
      disableLeftPadding = false,
      alignItems = 'start',
      ...props
    },
    ref,
  ) => {
    const listItemGeneratedStyles = useMemo(
      () => ({
        generated: listItemTextStyles({ disablePadding, alignItems, disableLeftPadding }),
      }),
      [disablePadding, alignItems, disableLeftPadding],
    );

    return (
      <Box sx={sx} ref={ref} style={[styles.listItemText, listItemGeneratedStyles.generated, style]} {...props}>
        {primary && (
          <Text variation="h3" style={primaryLabelStyles} {...primaryLabelProps}>
            {primary}
          </Text>
        )}
        {secondary && (
          <Text variation="h5" style={secondaryLabelStyles} {...secondaryLabelProps}>
            {secondary}
          </Text>
        )}
      </Box>
    );
  },
);
