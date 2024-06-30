import React from 'react';
import { ColorValue, DimensionValue, Image, ImageProps as RnImageProps, ScrollView, View, ViewStyle } from 'react-native';
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

/**
 * Interface for properties that can be passed to an image list item component.
 * Extends React Native View component properties.
 */
export interface ImageListItemProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * index of the image list item.
   */
  index: number;
  /**
   * Additional styles for customization.
   */
  sx?: BaseStyles;
  /**
   * Number of items to be displayed in the list item.
   */
  items?: number;
  /**
   * Horizontal spacing between the image list items.
   */
  itemSpace?: number;
  /**
   * Vertical spacing between the image list items.
   */
  itemBottomSpace?: number;
}

/**
 * Interface for properties that can be passed to an image list item bar component.
 */
export interface ImageListItemBarProps extends Omit<BoxProps, 'children'> {
  /**
   * Styles for the wrapper around the list content.
   */
  listContentWrapperStyles?: ViewStyle;
  /**
   * Title text for the item.
   */
  title?: string;
  /**
   * Additional properties for the title text.
   */
  titleProps?: Omit<TextProps, 'children'>;
  /**
   * Subtitle text for the item.
   */
  subtitle?: string;
  /**
   * Additional properties for the subtitle text.
   */
  subtitleProps?: Omit<TextProps, 'children'>;
  /**
   * Element to display at the end of the item bar.
   */
  endAdornment?: React.ReactNode;
  /**
   * Styles for the end adornment container.
   */
  endAdornmentContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;
  /**
   * Position of the item bar, either at the bottom or top.
   */
  position?: 'bottom' | 'top';
  /**
   * Color overlay for the item bar.
   */
  overlayColor?: ColorValue;
}

export interface GenerateImageListItemStylesProps
  extends Pick<ImageListItemProps, 'index' | 'items' | 'itemSpace' | 'itemBottomSpace'> {}
