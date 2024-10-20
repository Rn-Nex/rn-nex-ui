import React from 'react';
import { Animated, LayoutRectangle, TextProps, View } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { BoxProps } from '../Box/Box.types';

/**
 * Defines the available variations for the badge.
 */
export type BadgeVariations = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

/**
 * Defines the available variants for the badge.
 */
export type BadgeVariant = 'dot';

export type BadgeOverlap = 'circular' | 'rectangular';

/**
 * Defines the anchor origin configuration for positioning the badge.
 */
export interface AnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

/**
 * Props for the badge component.
 */
export interface BadgeProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Content to be displayed inside the badge.
   */
  badgeContent?: string | number;
  /**
   * Maximum value for the badge content.
   */
  max?: number;
  /**
   * Style variation of the badge.
   */
  variation?: BadgeVariations;
  /**
   * Style variant of the badge.
   */
  variant?: BadgeVariant;
  /**
   * Indicates whether the badge should be invisible.
   */
  invisible?: boolean;
  /**
   * Duration of badge animation.
   */
  badgeAnimationDuration?: number;
  /**
   * Props for customizing the content displayed inside the badge.
   */
  badgeContentProps?: Omit<TextProps, 'children'>;
  /**
   * Anchor origin configuration to position the badge.
   */
  anchorOrigin?: AnchorOrigin;
  /**
   * badger container props for customizing the badge wrapper element.
   */
  badgeContainerProps?: BadgeContainerProps;
  /**
   * Wrapped shape the badge should overlap.
   */
  overlap?: BadgeOverlap;
}

/**
 * Props for the container that wraps the badge.
 */
export interface BadgeContainerProps extends Pick<BadgeProps, 'overlap'>, BoxProps {}

/**
 * Props used for generating badge styles.
 */
export interface GenerateBadgeStylesProps extends Pick<BadgeProps, 'variation' | 'variant' | 'anchorOrigin'> {
  theme: ThemeType;
  /**
   * Rectangle representing the layout of the root element.
   */
  rootElementRect: LayoutRectangle;
  /**
   * Animated value controlling the visibility of the badge.
   */
  badgeVisibility?: Animated.Value;
}

export interface PlaceBadgeBasedPosition extends Pick<GenerateBadgeStylesProps, 'rootElementRect' | 'anchorOrigin' | 'variant'> {}
export interface GenerateBadgeContainerStylesProps extends Pick<BadgeContainerProps, 'overlap'> {}
export interface BadgeContentDefaultStylesProps {
  variation?: BadgeVariations;
}
