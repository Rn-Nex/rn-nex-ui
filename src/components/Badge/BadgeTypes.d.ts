import React from 'react';
import { Animated, View } from 'react-native';

export type BadgeVariations = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface BadgeContainerProps extends React.ComponentPropsWithRef<typeof View> {}

export interface BadgeProps extends React.ComponentPropsWithRef<typeof Animated.View> {
  badgeContent?: React.ReactNode;
  variation?: BadgeVariations;
  invisible?: boolean;
}

export interface GenerateBadgeStylesProps extends Pick<BadgeProps, 'variation'> {}
