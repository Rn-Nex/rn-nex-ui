import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  ELementDimensionMap,
  ElementBorderRadiusMap,
  ElementDimension,
  ElementFlexStyleProps,
  ElementMargin,
  ElementPadding,
  ElementViewStyles,
} from '../../libraries/style/styleTypes';
import { RipplePosition, RippleProps } from '../Ripple/RippleTypes';

export interface BaseButtonProps extends React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> {
  /**
   * Determines whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * The content to be displayed inside the button.
   */
  children?: React.ReactNode;

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
   * Additional styles for the button container.
   */
  sx?: ELementDimensionMap<ElementPadding | ElementMargin | ElementDimension> &
    ElementBorderRadiusMap &
    ElementFlexStyleProps &
    ElementViewStyles;
}

/**
 * Define a union type for the possible variations of a button component,
 * including 'contained', 'outlined', or 'text'.
 */
export type ButtonVariations = 'contained' | 'outlined' | 'text';

/**
 * Define a union type for the possible color variations of a button component,
 * including 'primary', 'secondary', 'success', 'error', 'info', or 'warning'.
 */
export type ButtonColorTypes = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

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
   * Boolean flag to specify whether the button should take up the full width available.
   */
  fullWidth?: boolean;

  /**
   * Boolean flag to specify whether to disable elevation for the button.
   */
  disableElevation?: boolean;

  /**
   * Optional property to specify the color variation of the button.
   * Can only accept values defined in ButtonColorTypes type.
   */
  buttonColor?: ButtonColorTypes;
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
  variation?: ButtonVariationsType;
}
