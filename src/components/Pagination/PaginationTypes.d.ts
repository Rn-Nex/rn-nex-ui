import { Animated, ColorValue, GestureResponderEvent } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { BoxProps } from '../Box/BoxTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';

export interface PaginationItemProps extends Omit<BaseButtonProps, 'children'> {
  page: number;
  active?: boolean;
  rippleBackgroundColor?: ColorValue;
}

export interface PaginationItemStylesProps extends Pick<PaginationItemProps> {}

export interface PaginationProps extends BoxProps {
  count: number;
  onPageChange?: (event: GestureResponderEvent, page: number) => void;
}
