import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { menuListStyles, styles } from './Menu.style';
import { MenuListProps } from './Menu.types';

export const MenuList = React.forwardRef<View, MenuListProps>(({ style, ...props }, ref) => {
  const { theme } = useTheme();

  return <Box style={[styles.menuList, menuListStyles({ theme }), style]} ref={ref} {...props} />;
});
