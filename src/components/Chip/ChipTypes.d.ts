import React from 'react';
import { StyleProp, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';
import { RippleProps } from '../Ripple/RippleTypes';
import {
  ELementDimensionMap,
  ElementBorderRadiusMap,
  ElementDimension,
  ElementMargin,
  ElementPadding,
} from '../../libraries/style/styleTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';
import { TextProps } from '../Typography/TextTypes';
import { BoxProps } from '../Box/BoxTypes';

/**
 * Defines the variant of the chip.
 */
export type ChipVariant = 'outlined' | 'filled';
/**
 * Defines the color variations available for the chip.
 */
export type ChipVariations = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export interface ChipProps extends Omit<BaseButtonProps, 'children' | 'sx'> {
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
}
export interface GenerateChipStylesProps extends Pick<ChipProps, 'variant' | 'disabled' | 'color'> {
  /**
   * Indicates if the chip has an adornment (start or end).
   */
  withAdornment?: boolean;
}
