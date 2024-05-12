import React from 'react';
import { Animated, ColorValue, StyleProp, TextInputProps, View, ViewStyle } from 'react-native';
import { TextProps } from '../Typography/TextTypes';

/**
 * Defines the common props for a base input component
 */
export interface BaseInputProps extends TextInputProps {
  /**
   * Indicates if there's an error in the input
   */
  error?: boolean;
  /**
   * The color to use when the input is active or focused
   */
  activeColor?: ColorValue;
  /**
   * Indicates if the input is focused
   */
  isFocused?: boolean;
  errorColor?: ColorValue;
}

/**
 * Defines the props for an input label component
 */
export interface InputLabelProps
  extends Pick<BaseInputProps, 'placeholder' | 'activeColor' | 'errorColor'>,
    Omit<TextProps, 'children'> {
  /**
   * Animated value for controlling label animation
   */
  labeled?: Animated.Value;
  /**
   * Animated position for label translation
   */
  translateYAnimatedPosition?: number;
  /**
   * Position of the placeholder when the label is active
   */
  placeholderLeftPosition?: number;
}

/**
 *  Defines the props for an outlined text field component
 */
export interface TextFieldProps extends BaseInputProps {
  /**
   * Styles for the outline container
   */
  outlineStyles?: StyleProp<ViewStyle>;
  /**
   * Props for the input label component
   */
  inputLabelProps?: InputLabelProps;
}

/**
 * Defines the props for an outline component
 */
export interface OutlineProps
  extends React.ComponentPropsWithRef<typeof View>,
    Pick<BaseInputProps, 'error' | 'activeColor' | 'isFocused' | 'errorColor'> {}
export interface FiledTextProps extends OutlinedTextFieldProps {}
