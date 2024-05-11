import React from 'react';
import { TextInputProps, View, ViewStyle } from 'react-native';

export interface BaseInputProps extends TextInputProps {}

export interface OutlineProps
   extends React.ComponentPropsWithRef<typeof View> {}
export interface OutlinedTextFieldProps extends BaseInputProps {
   outlineStyles?: ViewStyle;
}
