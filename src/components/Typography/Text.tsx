import React, { useMemo } from 'react';
import { Animated, Text as RnText, StyleSheet } from 'react-native';
import { useThemeFontSelector, useThemeModeSelector, useThemeTextConfigSelector } from '../../libraries';
import { maxLength as maxLengthUtile } from '../../utils';
import { generateTextStyles } from './Text.styles';
import { TextProps } from './Text.types';

export const Text = React.forwardRef<RnText, TextProps>(
  (
    {
      children,
      maxLength,
      variation,
      gutterBottom,
      error,
      errorColor,
      isActive,
      activeColor,
      style,
      sx,
      mode,
      color,
      gutterBottomSpace = 10,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const themeTextConfig = useThemeTextConfigSelector();
    const themeFontConfig = useThemeFontSelector();
    const themeMode = useThemeModeSelector();

    const hasMaxLength = maxLength ?? themeTextConfig?.maxLength;

    const { style: themeTextStyle = style, gutterBottomSpace: themeGutterBottomSpace = gutterBottomSpace } =
      themeTextConfig || {};

    const textStyles = useMemo(
      () =>
        generateTextStyles({
          variation,
          gutterBottom,
          gutterBottomSpace: themeGutterBottomSpace,
          isActive,
          activeColor,
          disabled,
          error,
          errorColor,
          sx,
          mode,
          color,
          themeComponentConfig: themeTextConfig,
          themeFonts: themeFontConfig,
          themeMode,
        }),
      [
        variation,
        gutterBottom,
        isActive,
        activeColor,
        disabled,
        error,
        errorColor,
        sx,
        mode,
        color,
        themeGutterBottomSpace,
        useThemeTextConfigSelector,
        themeFontConfig,
        themeMode,
      ],
    );

    const renderedChildren = useMemo(() => {
      if (typeof children === 'string' && hasMaxLength) {
        return maxLengthUtile(children, hasMaxLength);
      } else if (hasMaxLength && typeof children !== 'string') throw new Error('maxLength props must be used with string');
      return children;
    }, [children, hasMaxLength]);

    return (
      <Animated.Text ref={ref} style={StyleSheet.flatten([textStyles, themeTextStyle])} {...props}>
        {renderedChildren}
      </Animated.Text>
    );
  },
);

Text.displayName = 'Text';
