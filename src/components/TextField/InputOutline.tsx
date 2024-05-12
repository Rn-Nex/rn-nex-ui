import { View, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import React from 'react';
import { OutlineProps } from './InputTypes';

const outlineDefaultStyles: ViewStyle = {
  width: '100%',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: colors.white.dark,
  paddingHorizontal: 10,
  position: 'relative',
};

export const Outline = React.forwardRef<View, OutlineProps>(
  ({ error, style, isFocused, activeColor, errorColor, ...props }, ref) => {
    const generateOutlineStyles = (): ViewStyle => {
      if (error) return { borderColor: errorColor ? errorColor : colors.error.light };
      else if (isFocused) return { borderColor: activeColor ? activeColor : colors.blue.dark };
      return { borderColor: colors.white.dark };
    };

    return <View ref={ref} {...props} style={[outlineDefaultStyles, generateOutlineStyles(), style]} />;
  },
);
