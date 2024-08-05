import React, { useMemo } from 'react';
import { Box } from '../Box';
import { View } from 'react-native';
import { MenuListProps } from './MenuTypes';
import { menuListStyles } from './Menu.style';
import { useTheme } from '../../libraries';

export const MenuList = React.forwardRef<View, MenuListProps>(({ style, ...props }, ref) => {
  const { theme } = useTheme();

  const styles = useMemo(() => menuListStyles({ theme }), [theme]);

  return <Box style={[styles, style]} ref={ref} {...props} />;
});
