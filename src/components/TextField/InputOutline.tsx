import React, { useMemo } from 'react';
import { View } from 'react-native';
import { OutlineProps } from './InputTypes';
import { outlineStyles, inputOutlineVariationStyles } from './utils';
import { useTheme } from '../../libraries';

export const Outline = React.forwardRef<View, OutlineProps>(
  ({ error, style, isFocused, activeColor, errorColor, editable, variant = 'outlined', ...props }, ref) => {
    const { theme } = useTheme();
    const styles = useMemo(
      () =>
        outlineStyles({
          error,
          errorColor,
          isFocused,
          activeColor,
          theme,
          editable,
        }),
      [error, errorColor, isFocused, activeColor, theme, editable],
    );

    return <View ref={ref} {...props} style={[inputOutlineVariationStyles(variant, theme), styles, style]} />;
  },
);
