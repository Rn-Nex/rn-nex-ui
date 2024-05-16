import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { RippleProps } from '../Ripple/RippleTypes';
import {
  ELementDimensionMap,
  ElementBorderRadiusMap,
  ElementDimension,
  ElementMargin,
  ElementPadding,
} from '../../libraries/style/styleTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';
import { TextProps } from '../Typography/TextTypes';
import { BoxProps } from '../Box/BoxTypes';

export type ChipVariant = 'outlined' | 'filled';

export interface ChipProps extends Omit<BaseButtonProps, 'children'> {
  label?: string;
  labelContainerProps?: Omit<TextProps, 'children'>;
  variant?: ChipVariant;
  endAdornment?: React.ReactNode;
  endAdornmentContainerProps?: Omit<BoxProps, 'children'> & {
    touchableProps: React.ComponentPropsWithRef<typeof TouchableWithoutFeedback>;
  };
  startAdornment?: React.ReactNode;
  startAdornmentContainerProps?: Omit<BoxProps, 'children'> & {
    touchableProps: React.ComponentPropsWithRef<typeof TouchableWithoutFeedback>;
  };
}

export interface GenerateChipStylesProps extends Pick<ChipProps, 'variant' | 'disabled'> {}
