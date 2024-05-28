import { ViewStyle } from 'react-native';
import { PaginationItemStylesProps } from './PaginationTypes';

export const paginationStyles = (): ViewStyle => {
  const baseStyles: ViewStyle = {
    padding: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  };
  return baseStyles;
};

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
      ? theme.colors.lightBlue[800]
      : color === 'primary'
      ? theme.colors.primary[800]
      : color === 'secondary'
      ? theme.colors.secondary[300]
      : color === 'error'
      ? theme.colors.red[500]
      : 'transparent';

  const backgroundColorInterpolation = isActive.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', backgroundCl],
  });

  const baseStyles: ViewStyle = {
    minWidth: 30,
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor: variant === 'outlined' ? theme.colors.grey[300] : 'transparent',
    borderRadius: shape === 'circular' ? 100 : 5,
    overflow: 'hidden',
    opacity: disabled ? 0.4 : 1,
    backgroundColor: backgroundColorInterpolation as any,
  };
  return baseStyles;
};
