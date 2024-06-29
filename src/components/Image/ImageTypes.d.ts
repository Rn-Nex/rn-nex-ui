import React from 'react';
import { DimensionValue, Image, ImageProps as RnImageProps, ScrollView, View, ViewStyle } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { BoxProps } from '../Box/BoxTypes';
import { TextProps } from '../Typography/TextTypes';

/**
 * Define the type for the variant of the image.
 */
export type ImageVariant = 'square' | 'rounded' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';

/**
 * Interface for the image variation property, which may be used in styling.
 */
export interface ImageVariationProp {
  variation?: ImageVariant;
}

/**
 * Interface for properties that can be passed to an image component.
 * Extends React Native ImageProps and ImageVariationProp for styling flexibility.
 */
export interface ImageProps extends React.ComponentType<Image>, RnImageProps, ImageVariationProp {
  /**
   * Size of the image.
   */
  size?: DimensionValue;
  sx?: BaseStyles;
}

/**
 * interface for properties that can be passed to an image list component
 * Extending React Native Scroll view component.
 */
export interface ImageListProps extends React.ComponentPropsWithRef<typeof ScrollView> {}

export interface ImageListItemProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: BaseStyles;
  items?: number;
}

export interface ImageListItemBarProps extends Omit<BoxProps, 'children'> {
  listContentWrapperStyles?: ViewStyle;
  title?: string;
  titleProps?: Omit<TextProps, 'children'>;
  subtitle?: string;
  subtitleProps?: Omit<TextProps, 'children'>;
  endAdornment?: React.ReactNode;
  endAdornmentContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;
}
