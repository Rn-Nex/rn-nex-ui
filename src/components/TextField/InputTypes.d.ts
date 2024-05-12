import React from 'react';
import { Animated, ColorValue, LayoutRectangle, StyleProp, TextInputProps, View, ViewStyle } from 'react-native';
import { TextProps } from '../Typography/TextTypes';

/**
 * Represents the variation options for a text field.
 */
export type TextFiledVariation = 'outlined' | 'filled' | 'standard';

/**
 * Defines the common props for a base input component.
 */
export interface BaseInputProps extends TextInputProps {
  /**
   * Indicates if there's an error in the input.
   */
  error?: boolean;
  /**
   * The color to use when the input is active or focused.
   */
  activeColor?: ColorValue;
  /**
   * Indicates if the input is focused.
   */
  isFocused?: boolean;
  /**
   * Color to use when there is an error.
   */
  errorColor?: ColorValue;
  /**
   * The variation type of the text field.
   */
  variant?: TextFiledVariation;
}

/**
 * Defines the props for an input label component.
 */
export interface InputLabelProps
  extends Pick<BaseInputProps, 'placeholder' | 'activeColor' | 'errorColor' | 'variant'>,
    Omit<TextProps, 'children'> {
  /**
   * Animated value for controlling label animation.
   */
  labeled?: Animated.Value;
  /**
   * Animated position for label translation.
   */
  translateYAnimatedPosition?: number;
  /**
   * Position of the placeholder when the label is active.
   */
  placeholderLeftPosition?: number;
  textInputLayoutRect?: LayoutRectangle;
}

/**
 * Defines the props for an outlined text field component.
 */
export interface TextFieldProps extends BaseInputProps {
  /**
   * Styles for the outline container.
   */
  outlineStyles?: StyleProp<ViewStyle>;
  /**
   * Props for the input label component.
   */
  inputLabelProps?: InputLabelProps;
  /**
   * Duration of animation.
   */
  animatedDuration?: number;
}

/**
 * Defines the props for an outline component.
 */
export interface OutlineProps
  extends React.ComponentPropsWithRef<typeof View>,
    Pick<BaseInputProps, 'error' | 'activeColor' | 'isFocused' | 'errorColor' | 'variant'> {}

/**
 * Represents the properties required to get label transformation styles.
 */
export interface GetLabelTransformStyleProps
  extends Pick<
    InputLabelProps,
    'labeled' | 'translateYAnimatedPosition' | 'variant' | 'placeholderLeftPosition' | 'textInputLayoutRect'
  > {
  textHeight: number;
}
