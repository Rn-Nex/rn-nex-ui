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

export const paginationItemStyles = ({}: PaginationItemStylesProps): ViewStyle => {
  const baseStyles: ViewStyle = {
    minWidth: 30,
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  };
  return baseStyles;
};
