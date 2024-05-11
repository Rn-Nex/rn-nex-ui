import React from 'react';
import { TextInput } from 'react-native';
import { BaseInputProps } from './InputTypes';

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});
