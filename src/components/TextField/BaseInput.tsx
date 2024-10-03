import React, { useMemo } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '../../libraries';
import { BaseInputProps } from './Input.types';
import { baseInputStyles } from './TextField.style';

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>(({ style, variant, ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useMemo(() => baseInputStyles({ theme, variant }), [variant, theme]);
  return <TextInput ref={ref} style={[styles, style]} {...props} />;
});
