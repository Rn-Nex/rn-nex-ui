import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItemProps } from './ListTypes';
import { endAdornmentStyles, listItemContainerStyles, listItemStyles } from './utils';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';

export const ListItem = React.forwardRef<TouchableWithoutFeedback, ListItemProps>(
  ({ children, style, endAdornment, endAdornmentContainerStyles, listContainerStyles, selected, ...props }, ref) => {
    const styles = useMemo(() => listItemStyles({ endAdornment }), [endAdornment]);
    const endStyles = useMemo(() => endAdornmentStyles(), [endAdornment]);
    const containerStyles = useMemo(() => listItemContainerStyles({ selected }), [selected]);

    return (
      <Box sx={listContainerStyles?.sx} style={[containerStyles, listContainerStyles?.style]}>
        <BaseButton style={[styles, style]} ref={ref} {...props}>
          {children}
        </BaseButton>
        {endAdornment && (
          <Box sx={endAdornmentContainerStyles?.sx} style={[endStyles, endAdornmentContainerStyles?.style]}>
            {endAdornment}
          </Box>
        )}
      </Box>
    );
  },
);
