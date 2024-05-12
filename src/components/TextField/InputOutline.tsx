import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { OutlineProps } from './InputTypes';
import { getInputOutlineVariationStyles } from './utils';

export const Outline = React.forwardRef<View, OutlineProps>(
  ({ error, style, isFocused, activeColor, errorColor, variant = 'outlined', ...props }, ref) => {
    const generateOutlineStyles = (): ViewStyle => {
      if (error) return { borderColor: errorColor ? errorColor : colors.error.light };
      else if (isFocused) return { borderColor: activeColor ? activeColor : colors.blue.dark };
      return { borderColor: colors.white.dark };
    };

    return <View ref={ref} {...props} style={[getInputOutlineVariationStyles(variant), generateOutlineStyles(), style]} />;
  },
);
