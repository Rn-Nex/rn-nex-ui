import React from 'react';
import { TextStyle, TouchableWithoutFeedback, ViewProps, ViewStyle } from 'react-native';
import { BoxProps } from '../Box/Box.types';
import { VariantTypes } from '../../utils';

export interface CheckBoxProps extends React.ComponentPropsWithoutRef<typeof TouchableWithoutFeedback> {
  /**
   * Image to display when the checkbox is checked.
   * This can be any React node, such as an icon or an image.
   */
  checkedImage?: React.ReactNode;

  /**
   * Image to display when the checkbox is unchecked.
   * This can be any React node, such as an icon or an image.
   */
  unCheckedImage?: React.ReactNode;

  /**
   * Boolean value indicating whether the checkbox is checked.
   * This is a required prop.
   */
  isChecked?: boolean;

  /**
   * Color of the checkbox border.
   * Accepts any valid color string.
   */
  checkBoxColor?: string;

  /**
   * Boolean value indicating whether the checkbox is disabled.
   * When true, the checkbox is not interactive and visually appears disabled.
   */
  disabled?: boolean;

  /**
   * Style object to apply to the wrapper view of the checkbox.
   * Accepts any valid ViewStyle properties.
   */
  checkBoxWrapperStyles?: ViewStyle;

  /**
   * Props to apply to the container of the startAdornment.
   */
  adornmentContainerStyles?: ViewStyle;

  /**
   * React node to display at the end (right side) of the checkbox.
   * Commonly used for adding icons or labels.
   */
  adornment?: React.ReactNode;

  /**
   * Different variants of check box component.
   */
  variant?: VariantTypes;

  containerProps?: Omit<ViewProps, 'children'>;

  /**
   * different sizes of the check boxes.
   */
  size?: 'small' | 'medium';

  adornmentType?: 'start' | 'end';

  /**
   * Optional text label for the component, typically used as the primary description or title.
   */
  label?: string;

  /**
   * Optional styles for customizing the appearance of the main label text.
   */
  labelStyles?: TextStyle;

  /**
   * Optional secondary label for additional descriptive text or subtitle information.
   */
  subLabel?: string;

  /**
   * Optional styles for customizing the appearance of the secondary label text.
   */
  subLabelStyles?: TextStyle;

  /**
   * Optional styles for the container holding the label and subLabel, useful for layout adjustments.
   */
  labelContainerStyles?: ViewStyle;

  /**
   * If true, the component takes up the full width of its container; otherwise, it adjusts based on content.
   */
  fullWidth?: boolean;

  /**
   * Determines the action trigger level; 'root' applies at the top-level, 'element' applies at a specific element level.
   */
  actionType?: 'root' | 'element';
}
