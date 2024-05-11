import React from 'react';
import { Animated, ColorValue, StyleProp, TextInputProps, View, ViewStyle } from 'react-native';
import { TextProps } from '../Typography/TextTypes';

export interface BaseInputProps extends TextInputProps {
  error?: boolean;
  activeColor?: string;
}
export interface InputLabelProps extends Pick<BaseInputProps, 'placeholder' | 'activeColor'>, Omit<TextProps, 'children'> {
  labeled?: Animated.Value;
  translateYAnimatedPosition?: number;
  placeholderLeftPosition?: number;
}
export interface OutlinedTextFieldProps extends BaseInputProps {
  outlineStyles?: StyleProp<ViewStyle>;
}
export interface OutlineProps extends React.ComponentPropsWithRef<typeof View>, Pick<BaseInputProps, 'error' | 'activeColor'> {
  isFocused?: boolean;
}
