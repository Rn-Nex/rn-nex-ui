import React, { useMemo } from 'react';
import { View } from 'react-native';
import { OutlineProps } from './InputTypes';
import { outlineStyles, inputOutlineVariationStyles } from './utils';
import { useTheme } from '../../libraries';

export const Outline = React.forwardRef<View, OutlineProps>(
  ({ error, style, isFocused, activeColor, errorColor, variant = 'outlined', ...props }, ref) => {
    const { theme } = useTheme();
    const styles = useMemo(
      () =>
        outlineStyles({
          error,
          errorColor,
          isFocused,
          activeColor,
          theme,
        }),
      [error, errorColor, isFocused, activeColor, theme],
    );

    return <View ref={ref} {...props} style={[inputOutlineVariationStyles(variant, theme), styles, style]} />;
  },
);
