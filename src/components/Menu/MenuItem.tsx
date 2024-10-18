import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { menuItemContainerStyles, menuItemStyles, styles } from './Menu.style';
import { MenuItemProps } from './Menu.types';

export const MenuItem = React.forwardRef<TouchableWithoutFeedback, MenuItemProps>(
  ({ children, style, endAdornment, endAdornmentContainerStyles, listContainerStyles, selected, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const containerStyles = useMemo(() => menuItemContainerStyles({ selected, theme, disabled }), [selected, theme, disabled]);

    return (
      <Box sx={listContainerStyles?.sx} style={[containerStyles, listContainerStyles?.style]}>
        <BaseButton style={[styles.menuItem, menuItemStyles({ endAdornment }), style]} ref={ref} disabled={disabled} {...props}>
          {children}
        </BaseButton>
        {endAdornment && (
          <Box sx={endAdornmentContainerStyles?.sx} style={[styles.endAdornment, endAdornmentContainerStyles?.style]}>
            {endAdornment}
          </Box>
        )}
      </Box>
    );
  },
);
