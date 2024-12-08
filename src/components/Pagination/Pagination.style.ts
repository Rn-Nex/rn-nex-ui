import { StyleSheet, ViewStyle } from 'react-native';
import { getVariant } from '../../utils';
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
  colors,
  shape,
  variant,
  disabled,
}: PaginationItemStylesProps): ViewStyle => {
  const backgroundCl = getVariant({ variant: color, colors }) as string;

  const backgroundColorInterpolation = isActive.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', backgroundCl],
  });

  const baseStyles: ViewStyle = {
    borderWidth: variant === 'outlined' ? 0.8 : 0,
    borderColor: variant === 'outlined' ? colors.grey[200] : 'transparent',
    borderRadius: shape === 'circular' ? 100 : 5,
    opacity: disabled ? 0.4 : 1,
    backgroundColor: backgroundColorInterpolation as any,
  };
  return baseStyles;
};
