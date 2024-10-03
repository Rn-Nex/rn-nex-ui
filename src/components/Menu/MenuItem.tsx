import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { MenuItemProps } from './Menu.types';
import { endAdornmentStyles, menuItemContainerStyles, menuItemStyles } from './Menu.style';

export const MenuItem = React.forwardRef<TouchableWithoutFeedback, MenuItemProps>(
  ({ children, style, endAdornment, endAdornmentContainerStyles, listContainerStyles, selected, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const styles = useMemo(() => menuItemStyles({ endAdornment }), [endAdornment]);
    const endStyles = useMemo(() => endAdornmentStyles(), [endAdornment]);
    const containerStyles = useMemo(() => menuItemContainerStyles({ selected, theme, disabled }), [selected, theme, disabled]);

    return (
      <Box sx={listContainerStyles?.sx} style={[containerStyles, listContainerStyles?.style]}>
        <BaseButton style={[styles, style]} ref={ref} disabled={disabled} {...props}>
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
