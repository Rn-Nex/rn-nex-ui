import React from 'react';
import { View } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { BaseButtonProps } from '../Button/Button.types';
import { ImageProps } from '../Image/Image.types';

/**
 * `CardVariations` represents the various styles a card component can have, including 'outlined' or undefined.
 */
export type CardVariations = 'outlined' | undefined;

/**
 * `CardProps` defines the properties that can be passed to a card component.
 * Extends various style interfaces for flexibility in styling.
 */
export interface CardProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: BaseStyles;
  /**
   * Variation of the card, such as 'outlined'.
   */
  variation?: CardVariations;
}

export interface CardMediaProps extends ImageProps {}

export interface CardHeaderProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: BaseStyles;
}

export interface CardContentProps extends CardHeaderProps {}
export interface CardActionProps extends BaseButtonProps {}
