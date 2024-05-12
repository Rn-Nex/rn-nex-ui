import React from 'react';
import { Animated, ColorValue, LayoutRectangle, StyleProp, TextInputProps, View, ViewStyle } from 'react-native';
import { TextProps } from '../Typography/TextTypes';
import { BoxProps } from '../Box/BoxTypes';
import { ElementBorderRadiusMap, ElementSpacingMap } from '../../libraries/style/styleTypes';

/**
 * Represents the variation options for a text field.
 */
export type TextFiledVariation = 'outlined' | 'filled';

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
  extends Pick<BaseInputProps, 'placeholder' | 'activeColor' | 'errorColor' | 'variant' | 'editable'>,
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
  /**
   * The layout rectangle of the text input.
   */
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
  /**
   * React node for the end adornment.
   */
  endAdornment?: React.ReactNode;
  /**
   * Props for the end adornment container.
   */
  endAdornmentContainerProps?: BoxProps;
  /**
   * React node for the start adornment.
   */
  startAdornment?: React.ReactNode;
  /**
   * Props for the start adornment container.
   */
  startAdornmentContainerProps?: BoxProps;
  /**
   * Styles for the text input.
   */
  inputStyles?: ViewStyle;
  /**
   * Additional styles for the component.
   */
  style?: ElementSpacingMap & ElementBorderRadiusMap & ViewStyle;
}

/**
 * Defines the props for an outline component.
 */
export interface OutlineProps
  extends React.ComponentPropsWithRef<typeof View>,
    Pick<BaseInputProps, 'error' | 'activeColor' | 'isFocused' | 'errorColor' | 'variant' | 'editable'> {}

/**
 * Represents the properties required to get label transformation styles.
 */
export interface GetLabelTransformStyleProps
  extends Pick<
    InputLabelProps,
    'labeled' | 'translateYAnimatedPosition' | 'variant' | 'placeholderLeftPosition' | 'textInputLayoutRect'
  > {
  /**
   * Height of the text input.
   */
  textHeight: number;
}

/**
 * Represents the properties required to generate outline styles.
 */
export interface GenerateOutlineStyles extends Pick<OutlineProps, 'error' | 'errorColor' | 'isFocused' | 'activeColor'> {}

/**
 * Represents the properties required to get text input styles.
 */
export interface GetTextInputStylesProps {
  /**
   * The variation type of the text field.
   */
  variant: TextFiledVariation;
  /**
   * Indicates if there's an end adornment present.
   */
  endAdornment?: boolean;
  /**
   * Indicates if there's a start adornment present.
   */
  startAdornment?: boolean;
}
