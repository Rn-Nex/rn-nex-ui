import React, { useMemo } from 'react';
import { View } from 'react-native';
import { OutlineProps } from './Input.types';
import { useTheme } from '../../libraries';
import { inputOutlineVariationStyles, outlineStyles } from './TextField.style';

export const Outline = React.forwardRef<View, OutlineProps>(
  (
    { error, style, isFocused, activeColor, errorColor, editable, ignoreOpacityOnNonEditable, variant = 'outlined', ...props },
    ref,
  ) => {
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
          ignoreOpacityOnNonEditable,
        }),
      [error, errorColor, isFocused, activeColor, theme, editable, variant, ignoreOpacityOnNonEditable],
    );

    return <View ref={ref} {...props} style={[inputOutlineVariationStyles(variant, theme), styles, style]} />;
  },
);
