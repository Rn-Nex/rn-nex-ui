import React from 'react';
import { View } from 'react-native';
import { OutlineProps } from './InputTypes';
import { outlineStyles, inputOutlineVariationStyles } from './utils';

export const Outline = React.forwardRef<View, OutlineProps>(
  ({ error, style, isFocused, activeColor, errorColor, variant = 'outlined', ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        style={[
          inputOutlineVariationStyles(variant),
          outlineStyles({
            error,
            errorColor,
            isFocused,
            activeColor,
          }),
          style,
        ]}
      />
    );
  },
);
