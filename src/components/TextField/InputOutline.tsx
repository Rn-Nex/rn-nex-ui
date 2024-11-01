import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../libraries';
import { OutlineProps } from './Input.types';
import { inputOutlineVariationStyles, outlineStyles } from './TextField.style';

export const Outline = React.forwardRef<View, OutlineProps>(
  (
    {
      error,
      style,
      isFocused,
      activeColor,
      errorColor,
      editable,
      ignoreOpacityOnNonEditable,
      square,
      variant = 'outlined',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const outlineGeneratedStyles = useMemo(
      () =>
        StyleSheet.create({
          generated: {
            ...inputOutlineVariationStyles(variant, theme),
            ...outlineStyles({
              error,
              errorColor,
              isFocused,
              activeColor,
              theme,
              editable,
              variant,
              ignoreOpacityOnNonEditable,
              square,
            }),
          },
        }),
      [error, errorColor, isFocused, activeColor, theme, editable, variant, ignoreOpacityOnNonEditable, square],
    );

    return <View ref={ref} style={StyleSheet.flatten([outlineGeneratedStyles.generated, style])} {...props} />;
  },
);
Outline.displayName = 'TextFiledOutline';
