import React, { useMemo } from 'react';
import { Animated, Text as RnText, StyleSheet } from 'react-native';
import { useTheme } from '../../libraries';
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
    const { theme } = useTheme();

    const textStyles = useMemo(
      () =>
        StyleSheet.create({
          generated: generateTextStyles({
            theme,
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
          }),
        }),
      [theme, variation, gutterBottom, isActive, activeColor, disabled, error, errorColor, sx, mode, color, gutterBottomSpace],
    );

    const renderedChildren = useMemo(() => {
      if (typeof children === 'string' && maxLength) {
        return maxLengthUtile(children, maxLength);
      } else if (maxLength && typeof children !== 'string') throw new Error('maxLength props must be used with string');
      return children;
    }, [children, maxLength]);

    return (
      <Animated.Text ref={ref} style={StyleSheet.flatten([textStyles.generated, style])} {...props}>
        {renderedChildren}
      </Animated.Text>
    );
  },
);

Text.displayName = 'Text';
