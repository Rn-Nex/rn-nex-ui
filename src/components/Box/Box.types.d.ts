import React from 'react';
import { View, ViewStyle } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';

export interface BoxProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Custom styles to apply to the Box component.
   */
  sx?: BaseStyles;
  /**
   * The content to be rendered inside the Box component.
   */
  children?: React.ReactNode;
}

/**
 * Defines the possible values for the maximum width of the Container component.
 */
export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface ContainerProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Custom styles to apply to the Container component.
   */
  sx?: BaseStyles;
  /**
   * The maximum width of the Container. One of 'xs', 'sm', 'md', 'lg', or 'xl'.
   */
  maxWidth?: ContainerMaxWidth;
  /**
   * If true, disables the default padding (gutters) of the Container.
   */
  disableGutters?: boolean;

  /**
   * Custom styles to apply to the Container wrapper component.
   */
  containerStyles?: ViewStyle;
}

/**
 * Props for generating container styles.
 */
export interface GenerateContainerStylesProps extends Pick<ContainerProps, 'maxWidth' | 'disableGutters'> {}
