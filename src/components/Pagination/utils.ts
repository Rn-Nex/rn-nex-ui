import { ViewStyle } from 'react-native';
import { PaginationItemStylesProps } from './PaginationTypes';

export const paginationStyles = (): ViewStyle => {
  const baseStyles: ViewStyle = {
    backgroundColor: 'red',
    padding: 5,
    minWidth: 350,
    display: 'flex',
    flexDirection: 'row',
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
