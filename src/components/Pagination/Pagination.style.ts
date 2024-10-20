import { StyleSheet, ViewStyle } from 'react-native';
import { PaginationItemStylesProps } from './Pagination.types';

export const styles = StyleSheet.create({
  paginationContainer: {
    padding: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  paginationItem: {
    minWidth: 30,
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export const paginationItemStyles = ({
  color,
  isActive,
  theme,
  shape,
  variant,
  disabled,
}: PaginationItemStylesProps): ViewStyle => {
  const backgroundCl =
    color === 'standard'
      ? theme.colors.lightBlue[500]
      : color === 'primary'
        ? theme.colors.primary[500]
        : color === 'secondary'
          ? theme.colors.secondary[500]
          : color === 'error'
            ? theme.colors.red[500]
            : 'transparent';

  const backgroundColorInterpolation = isActive.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', backgroundCl],
  });

  const baseStyles: ViewStyle = {
    borderWidth: variant === 'outlined' ? 0.8 : 0,
    borderColor: variant === 'outlined' ? theme.colors.grey[200] : 'transparent',
    borderRadius: shape === 'circular' ? 100 : 5,
    opacity: disabled ? 0.4 : 1,
    backgroundColor: backgroundColorInterpolation as any,
  };
  return baseStyles;
};
