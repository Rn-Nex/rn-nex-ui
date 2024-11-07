import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../libraries';
import { menuListStyles, styles } from './Menu.style';
import { MenuListProps } from './Menu.types';

export const MenuList = React.forwardRef<View, MenuListProps>(({ style, children, ...props }, ref) => {
  const { theme } = useTheme();

  return (
    <View style={StyleSheet.flatten([menuListStyles({ theme }), styles.menuList, style])} ref={ref} {...props}>
      {children}
    </View>
  );
});
