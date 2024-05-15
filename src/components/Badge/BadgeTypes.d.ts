import React from 'react';
import { Animated, LayoutRectangle, View } from 'react-native';

export type BadgeVariations = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface BadgeContainerProps extends React.ComponentPropsWithRef<typeof View> {}

export interface BadgeProps extends React.ComponentPropsWithRef<typeof View> {
  badgeContent?: string | number;
  variation?: BadgeVariations;
  invisible?: boolean;
}

export interface GenerateBadgeStylesProps extends Pick<BadgeProps, 'variation'> {
  rootElementRect: LayoutRectangle;
}
