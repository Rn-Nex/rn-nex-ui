import { Animated, ColorValue, GestureResponderEvent, StyleProp, TextStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { BoxProps } from '../Box/BoxTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';
import { TextProps } from '../Typography/TextTypes';

type PaginationItemColor = 'primary' | 'secondary' | 'standard' | 'error';
type PaginationShape = 'circular' | 'rounded';
type PaginationVariant = 'outlined' | 'text';

/**
 * Props for a single pagination item.
 */
export interface PaginationItemProps extends Omit<BaseButtonProps, 'children'> {
  /**
   * The page number or a special string value like 'start-dots' or 'end-dots'.
   * This determines what will be displayed on the pagination item.
   */
  page: number | string;

  /**
   * Indicates if the pagination item is the currently active page.
   * This can be used to apply specific styles to the active page.
   */
  active?: boolean;

  /**
   * Background color for the ripple effect when the pagination item is pressed.
   */
  rippleBackgroundColor?: ColorValue;

  /**
   * The active color
   */
  color?: PaginationItemColor;
  /**
   * pagination item shape
   */
  shape?: PaginationShape;
  /**
   * pagination item variations
   */
  variant?: PaginationVariant;
}

/**
 * Styles props for a single pagination item.
 * It extends from PaginationItemProps to reuse its properties for styling purposes.
 */
export interface PaginationItemStylesProps extends Pick<PaginationItemProps, 'color' | 'shape' | 'variant'> {
  isActive: Animated.Value;
  theme: ThemeType;
}

/**
 * Props for the Pagination component.
 */
export interface PaginationProps extends BoxProps {
  /**
   * The total number of pages.
   * This is used to determine the range of pagination items to render.
   */
  count: number;

  /**
   * Callback function called when a pagination item is clicked.
   * It provides the event and the page number as arguments.
   */
  onPageChange?: (event: GestureResponderEvent, page: number) => void;

  /**
   * Additional props to be passed to the dot container.
   * This can be used to style the container that holds the dots (e.g., 'start-dots', 'end-dots').
   */
  dotContainerProps?: Omit<BoxProps, 'children'>;

  /**
   * Additional styles to be applied to the dot elements (e.g., 'start-dots', 'end-dots').
   */
  dotStylesProps?: StyleProp<TextStyle>;

  /**
   * Additional props to be passed to each pagination item.
   * It omits the 'page' property since each item will have its own page value.
   */
  paginationItemProps?: Omit<PaginationItemProps, 'page'>;
}
