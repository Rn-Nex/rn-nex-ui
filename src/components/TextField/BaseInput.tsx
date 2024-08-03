import React, { useMemo } from 'react';
import { TextInput } from 'react-native';
import { BaseInputProps } from './InputTypes';
import { baseInputStyles } from './utils';
import { useTheme } from '../../libraries';

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>(({ style, variant, ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useMemo(() => baseInputStyles({ theme, variant }), [variant, theme]);
  return <TextInput ref={ref} style={[styles, style]} {...props} />;
});
