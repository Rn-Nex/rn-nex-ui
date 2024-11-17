import React from 'react';
import { ColorValue, TextStyle, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { VariantTypes } from '../../utils';
import { RipplePosition, RippleProps } from '../Ripple/Ripple.types';

export interface BaseButtonProps extends React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> {
  /**
   * Determines whether the ripple effect is disabled.
   */
  disableRipple?: boolean;

  /**
   * Props for configuring the ripple effect.
   */
  rippleProps?: RippleProps;

  /**
   * Determines the position of the ripple effect relative to the button.
   */
  rippleEdge?: RipplePosition;

  /**
   * stop scale animation when the button is clicked
   */
  disableScaleAnimation?: boolean;

  /**
   * button scale animation when the button is clicked
   */
  scaleAnimationValue?: number;

  baseButtonContainerStyle?: ViewStyle;
}

/**
 * Define a union type for the possible variations of a button component,
 * including 'contained', 'outlined', or 'text'.
 */
export type ButtonVariations = 'contained' | 'outlined' | 'text';

/**
 * Define the properties that can be passed to the Button component,
 * extending from React's TouchableWithoutFeedback component props.
 */
export interface ButtonProps extends BaseButtonProps {
  /**
   * Optional property to specify the visual style variation of the button.
   * Can only accept values defined in ButtonVariations type.
   */
  variation?: ButtonVariations;

  /**
   * Boolean flag to disable the ripple effect.
   */
  disableRipple?: boolean;

  /**
   * Optional property to specify the color variation of the button.
   */
  buttonColor?: VariantTypes;

  /**
   * show the loading indicator when the button is clicked
   */
  loading?: boolean;
  /**
   * Button label
   */
  label?: string;
  /**
   * Custom styles for button label component
   */
  labelStyles?: TextStyle;
  /**
   * Change the button radius
   */
  square?: boolean;
  /**
   * Change the button label color
   */
  labelColor?: ColorValue;

  baseButtonStyles?: ViewStyle;
}

/**
 * Defines variations of IconButton component.
 * This type restricts the allowed variations to 'roundedIconButton' or 'squareIconButton'.
 */
export type IconButtonVariations = 'roundedIconButton' | 'squareIconButton';

/**
 * Defines the props interface for the IconButton component.
 * Extends React's ComponentPropsWithRef<typeof TouchableWithoutFeedback>.
 */
export interface IconButtonProps extends BaseButtonProps {
  /**
   * Specifies the variation of the IconButton.
   * Can be either 'roundedIconButton' or 'squareIconButton'.
   */
  variation?: IconButtonVariations;
}

export type ButtonVariationsType = ButtonVariations | IconButtonVariations;
export interface GetButtonStylesProps extends Omit<ButtonProps, 'sx' | 'children' | 'ripple'> {
  theme: ThemeType;
  variation?: ButtonVariationsType;
}
