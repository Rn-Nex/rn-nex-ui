import React from 'react';
import { View } from 'react-native';
import { OutlineProps } from './InputTypes';
import { generateOutlineStyles, getInputOutlineVariationStyles } from './utils';

export const Outline = React.forwardRef<View, OutlineProps>(
  ({ error, style, isFocused, activeColor, errorColor, variant = 'outlined', ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        style={[
          getInputOutlineVariationStyles(variant),
          generateOutlineStyles({
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
