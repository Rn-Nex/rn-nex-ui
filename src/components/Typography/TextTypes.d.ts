import React from 'react';
import { Animated, Text, TextStyle } from 'react-native';
import { ElementSpacingMap, SpacingStyle } from '../../libraries/style/styleTypes';

/**
 * Defines the possible variations for text components.
 * These variations include different typographic styles such as headings, body text, buttons, etc.
 */
export type TextVariation = 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Interface for the properties that can be passed to a text component.
 * Extends TextStyle for text styling and ElementSpacingMap for spacing properties.
 */
export interface TextProps extends React.ComponentPropsWithRef<typeof Text>, TextStyle, ElementSpacingMap {
  /**
   * Custom styles to be applied to the text.
   */
  sx?: TextStyle;

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
  error?: boolean;
}

export interface TextFontVariation extends Pick<TextStyle, 'fontSize'> {}
export interface TextGutter extends SpacingStyle {}

export interface AnimatedTextProps extends React.ComponentPropsWithRef<typeof Animated.Text> {
  style?: TextStyle;
}
