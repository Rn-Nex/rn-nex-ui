import React from 'react';
import { StyleProp, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';
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
  endAdornmentContainerStyle?: StyleProp<ViewStyle>;
  endAdornmentTouchableProps?: Omit<TouchableWithoutFeedbackProps, 'children' | 'style'>;
  startAdornment?: React.ReactNode;
  startAdornmentContainerStyle?: StyleProp<ViewStyle>;
  startAdornmentTouchableProps?: Omit<TouchableWithoutFeedbackProps, 'children' | 'style'>;
}

export interface GenerateChipStylesProps extends Pick<ChipProps, 'variant' | 'disabled'> {
  withAdornment?: boolean;
}
