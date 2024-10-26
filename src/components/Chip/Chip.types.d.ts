import React from 'react';
import { StyleProp, TouchableWithoutFeedbackProps, ViewProps, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { BaseButtonProps } from '../Button/Button.types';
import { TextProps } from '../Typography/Text.types';

/**
 * Defines the variant of the chip.
 */
export type ChipVariant = 'outlined' | 'filled';
/**
 * Defines the color variations available for the chip.
 */
export type ChipVariations = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export interface ChipProps extends Omit<BaseButtonProps, 'children' | 'sx'>, Omit<TouchableWithoutFeedbackProps, 'ref'> {
  /**
   * The label text to display inside the chip.
   */
  label?: string;

  /**
   * Props to be passed to the label text component.
   */
  labelContainerProps?: Omit<TextProps, 'children'>;

  /**
   * The variant of the chip, either 'outlined' or 'filled'.
   */
  variant?: ChipVariant;

  /**
   * A React node to be displayed at the end of the chip.
   */
  endAdornment?: React.ReactNode;

  /**
   * Style for the end adornment container.
   */
  endAdornmentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Props to be passed to the touchable component wrapping the end adornment.
   */
  endAdornmentTouchableProps?: Omit<TouchableWithoutFeedbackProps, 'children' | 'style'>;

  /**
   * A React node to be displayed at the start of the chip.
   */
  startAdornment?: React.ReactNode;

  /**
   * Style for the start adornment container.
   */
  startAdornmentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Props to be passed to the touchable component wrapping the start adornment.
   */
  startAdornmentTouchableProps?: Omit<TouchableWithoutFeedbackProps, 'children' | 'style'>;

  /**
   * The color variation of the chip.
   */
  color?: ChipVariations;

  /**
   * Styles for the chip wrapper container.
   * Accepts a `StyleProp<ViewStyle>` which allows you to define various layout
   * and appearance properties such as padding, margin, backgroundColor, etc.
   */
  chipWrapperContainerStyles?: StyleProp<ViewStyle>;

  /**
   * Additional properties for the chip wrapper container, excluding `children`.
   * This allows you to pass any valid `ViewProps` to the container such as
   * accessibility properties or event handlers (e.g., `onLayout`).
   */
  chipWrapperContainerProps?: Omit<ViewProps, 'children'>;

  square?: boolean;
}
export interface GenerateChipStylesProps extends Pick<ChipProps, 'variant' | 'disabled' | 'color'> {
  theme: ThemeType;
  /**
   * Indicates if the chip has an adornment (start or end).
   */
  withAdornment?: boolean;
}
