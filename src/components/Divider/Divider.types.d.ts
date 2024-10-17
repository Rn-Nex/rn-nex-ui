import React from 'react';
import { LayoutRectangle, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';

/**
 * Variants for the divider, specifying its appearance.
 * - 'fullWidth': The divider spans the full width or height of its container.
 * - 'middle': The divider is centered within its container, with additional spacing considerations.
 */
export type DividerVariants = 'fullWidth' | 'middle';

/**
 * Orientation of the divider.
 * - 'horizontal': The divider is oriented horizontally.
 * - 'vertical': The divider is oriented vertically.
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Alignment options for a child component within the divider.
 * - 'left': The child component is aligned to the left.
 * - 'right': The child component is aligned to the right.
 * - 'center': The child component is centered.
 */
export type DividerChildAlignment = 'left' | 'right' | 'center';

/**
 * Props for the Divider component, extending the base View component props.
 */
export interface DividerProps extends React.ComponentPropsWithoutRef<typeof View> {
  /**
   * Specifies the variant of the divider.
   */
  variant?: DividerVariants;
  /**
   * Specifies the alignment of a child component within the divider.
   */
  textAlign?: DividerChildAlignment;
  /**
   * Specifies the orientation of the divider.
   */
  orientation?: DividerOrientation;
  /**
   * custom style for the divider border elements.
   */
  dividerBorderStyles?: StyleProp<ViewStyle>;
  /**
   * specifies styles for the divider border element
   */
  leftDividerBorderStyle?: StyleProp<ViewStyle>;
  rightDividerBorderStyle?: StyleProp;
}

/**
 * Props for the root container of the Divider, extending base View props and including relevant divider props.
 */
export interface DividerRootContainerProps extends ViewProps, Pick<DividerProps, 'variant' | 'orientation'> {}

/**
 * Props for generating the styles of the Divider.
 */
export interface GenerateDividerStylesProps extends Pick<DividerProps, 'variant' | 'textAlign' | 'orientation'> {
  theme: ThemeType;

  /**
   * Specifies the type of the divider, either 'left' or 'right'.
   */
  dividerType: 'left' | 'right';
  /**
   * Layout rectangle of the child wrapper, if it exists.
   */
  childWrapperLayoutRect?: LayoutRectangle;
  /**
   * Indicates whether the divider has a child component.
   */
  hasChild?: boolean;
  /**
   * Layout rectangle of the root divider.
   */
  dividerRootLayoutRect?: LayoutRectangle;
}
