import React, { useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { menuItemContainerStyles, menuItemStyles, styles } from './Menu.style';
import { MenuItemProps } from './Menu.types';

export const MenuItem = React.forwardRef<View, MenuItemProps>(
  ({ children, style, endAdornment, endAdornmentContainerStyles, listContainerStyles, selected, disabled, ...props }, ref) => {
    const { theme } = useTheme();
    const containerStyles = useMemo(() => menuItemContainerStyles({ selected, theme, disabled }), [selected, theme, disabled]);

    return (
      <Box sx={listContainerStyles?.sx} style={[containerStyles, listContainerStyles?.style]} ref={ref}>
        <BaseButton style={[styles.menuItem, menuItemStyles({ endAdornment }), style]} disabled={disabled} {...props}>
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
