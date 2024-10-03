import React from 'react';
import { TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { BoxProps } from '../Box/Box.types';

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
   * Boolean value indicating whether the checkbox is in an indeterminate state.
   * This state is used to represent a mixed selection, often used in hierarchical checkboxes.
   */
  isIndeterminate?: boolean;

  /**
   * Color of the checkbox border when it is not checked.
   * Accepts any valid color string.
   */
  checkBoxColor?: string;

  /**
   * Boolean value indicating whether the checkbox is disabled.
   * When true, the checkbox is not interactive and visually appears disabled.
   */
  disabled?: boolean;

  /**
   * Image to display when the checkbox is in an indeterminate state.
   * This can be any React node, such as an icon or an image.
   */
  indeterminateImage?: React.ReactNode;

  /**
   * Style object to apply to the wrapper view of the checkbox.
   * Accepts any valid ViewStyle properties.
   */
  checkBoxWrapperStyles?: ViewStyle;

  /**
   * React node to display at the start (left side) of the checkbox.
   * Commonly used for adding icons or labels.
   */
  startAdornment?: React.ReactNode;

  /**
   * Props to apply to the container of the startAdornment.
   * This omits the 'children' prop from BoxProps to avoid conflicts.
   */
  startAdornmentContainerProps?: Omit<BoxProps, 'children'>;

  /**
   * React node to display at the end (right side) of the checkbox.
   * Commonly used for adding icons or labels.
   */
  endAdornment?: React.ReactNode;

  /**
   * Props to apply to the container of the endAdornment.
   * This omits the 'children' prop from BoxProps to avoid conflicts.
   */
  endAdornmentContainerProps?: Omit<BoxProps, 'children'>;
}
