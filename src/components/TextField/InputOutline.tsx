import React, { useMemo } from 'react';
import { View } from 'react-native';
import { OutlineProps } from './InputTypes';
import { useTheme } from '../../libraries';
import { inputOutlineVariationStyles, outlineStyles } from './TextField.style';

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
          variant,
        }),
      [error, errorColor, isFocused, activeColor, theme, editable, variant],
    );

    return <View ref={ref} {...props} style={[inputOutlineVariationStyles(variant, theme), styles, style]} />;
  },
);
