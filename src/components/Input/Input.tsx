import React from 'react';
import { TextInput } from 'react-native';
import { InputProps } from './InputTypes';

export const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
   return <TextInput {...props} ref={ref} />;
});
