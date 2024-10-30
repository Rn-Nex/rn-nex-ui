import React, { useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../libraries';
import { BaseInputProps } from './Input.types';
import { baseInputStyles } from './TextField.style';

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>(({ style, variant, ...props }, ref) => {
  const { theme } = useTheme();
  const baseInputGeneratedStyles = useMemo(
    () => StyleSheet.create({ generated: baseInputStyles({ theme, variant }) }),
    [variant, theme],
  );
  return <TextInput ref={ref} style={StyleSheet.flatten([baseInputGeneratedStyles.generated, style])} {...props} />;
});
