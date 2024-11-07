import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { Text } from '../Typography';
import { listItemTextStyles, styles } from './List.style';
import { ListItemTextProps } from './List.types';

export const ListItemText = React.forwardRef<View, ListItemTextProps>(
  (
    { sx, style, primary, primaryLabelStyles, secondary, secondaryLabelStyles, disablePadding, alignItems = 'start', ...props },
    ref,
  ) => {
    const listItemGeneratedStyles = useMemo(
      () => ({
        generated: listItemTextStyles({ disablePadding, alignItems }),
      }),
      [disablePadding, alignItems],
    );

    return (
      <Box sx={sx} ref={ref} style={[styles.listItemText, listItemGeneratedStyles.generated, style]} {...props}>
        {primary && (
          <Text variation="h3" style={primaryLabelStyles}>
            {primary}
          </Text>
        )}
        {secondary && (
          <Text variation="h5" style={secondaryLabelStyles}>
            {secondary}
          </Text>
        )}
      </Box>
    );
  },
);
