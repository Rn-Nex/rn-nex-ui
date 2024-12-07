import React, { useMemo } from 'react';
import { Animated, Text as RnText, StyleSheet } from 'react-native';
import { themeFontSelector, themeModeSelector, themeSelector, themeTextConfigSelector } from '../../libraries';
import { maxLength as maxLengthUtile } from '../../utils';
import { TextProps } from './Text.types';
import { generateTextStyles } from './utils';

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
    const themeTextConfig = themeTextConfigSelector();
    const themeFontConfig = themeFontSelector();
    const themeMode = themeModeSelector();

    const hasMaxLength = maxLength ?? themeTextConfig?.maxLength;

    const textStyles = useMemo(
      () =>
        generateTextStyles({
          variation,
          gutterBottom,
          gutterBottomSpace,
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
        themeSelector,
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
        gutterBottomSpace,
        themeTextConfigSelector,
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
      <Animated.Text ref={ref} style={StyleSheet.flatten([textStyles, style])} {...props}>
        {renderedChildren}
      </Animated.Text>
    );
  },
);

Text.displayName = 'Text';
