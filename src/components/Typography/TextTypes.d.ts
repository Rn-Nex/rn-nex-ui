import React from 'react';
import { Animated, ColorValue, Text, TextStyle } from 'react-native';
import { BaseStyles, ElementTextStyleProps, SpacingStyle } from '../../libraries/style/styleTypes';
import { ThemeType } from '../../libraries/themes/v1/theme';
/**
 * Defines the possible variations for text components.
 * These variations include different typographic styles such as headings, body text, buttons, etc.
 */
export type TextVariation = 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Interface for the properties that can be passed to a text component.
 * Extends TextStyle for text styling and ElementDimensionMap for spacing properties.
 */
export interface TextProps extends React.ComponentPropsWithRef<typeof Text> {
  /**
   * Custom styles to be applied to the text.
   */
  sx?: BaseStyles & ElementTextStyleProps;

  /**
   * The content to be displayed within the text component.
   */
  children: React.ReactNode;

  /**
   * Variation of the text, such as 'body1', 'caption', 'h1', etc.
   */
  variation?: TextVariation;

  /**
   * Specifies whether to add a bottom margin to the text component.
   */
  gutterBottom?: boolean;

  /**
   * Maximum length of the text content. Used for truncating or limiting text length.
   */
  maxLength?: number;

  /**
   * Specifies if the text component is in an error state.
   */
  error?: boolean;

  /**
   * Color value for the text when in an error state.
   */
  errorColor?: ColorValue;

  /**
   * Specifies if the text component is in an active state.
   */
  isActive?: boolean;

  /**
   * Color value for the text when in an active state.
   */
  activeColor?: ColorValue;

  /**
   * Specifies if the text component is disabled.
   */
  disabled?: boolean;

  /**
   * mode is used to determine if the text component is light or dark.
   */
  mode?: 'light' | 'dark';
}

/**
 * Interface representing gutter styles for text.
 */
export interface TextGutter extends SpacingStyle {}

/**
 * Interface for animated text component properties.
 */
export interface AnimatedTextProps extends React.ComponentPropsWithRef<typeof Animated.Text> {}

export interface TextStylesArgs
  extends Pick<
    TextProps,
    'variation' | 'gutterBottom' | 'isActive' | 'disabled' | 'error' | 'sx' | 'activeColor' | 'errorColor' | 'mode'
  > {
  theme: ThemeType;
}
