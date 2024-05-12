import { View, ViewStyle } from 'react-native';
import { ElementBorderRadiusMap, ElementSpacingMap } from '../../libraries/style/styleTypes';
import React from 'react';
import { ImageProps } from '../Image/ImageTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';

/**
 * `CardVariations` represents the various styles a card component can have, including 'outlined' or undefined.
 */
export type CardVariations = 'outlined' | undefined;

/**
 * `CardProps` defines the properties that can be passed to a card component.
 * Extends various style interfaces for flexibility in styling.
 */
export interface CardProps extends React.ComponentPropsWithRef<typeof View> {
  style?: ViewStyle & ElementSpacingMap & ElementBorderRadiusMap;
  /**
   * Children elements to be rendered within the card.
   */
  children?: React.ReactNode;

  /**
   * Variation of the card, such as 'outlined'.
   */
  variation?: CardVariations;
}

export interface CardMediaProps extends ImageProps {}

export interface CardHeaderProps extends React.ComponentPropsWithRef<typeof View> {
  style?: ElementSpacingMap & ElementBorderRadiusMap & ViewStyle;
  children?: React.ReactNode;
}

export interface CardContentProps extends CardHeaderProps {}
export interface CardActionProps extends BaseButtonProps {}
