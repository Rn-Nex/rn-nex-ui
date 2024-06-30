import React, { useMemo } from 'react';
import { Text as RnText } from 'react-native';
import { generateElementStyles } from '../../utils';
import { TextProps } from './TextTypes';
import { gutter, maxLength as maxLengthUtile, textFontVariation } from './utils';
import { useTheme } from '../../libraries';

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
      disabled = false,
      mode = 'light',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const textStyles = useMemo(() => {
      const styles = [];
      if (variation) styles.push(textFontVariation(variation, theme));
      if (gutterBottom) styles.push(gutter('marginBottom', 10));
      if (mode === 'light') styles.push({ color: theme.colors.white[50] });
      if (isActive) styles.push({ color: activeColor || theme.colors.secondary[200] });
      if (disabled) styles.push({ opacity: 0.3 });
      if (error) styles.push({ color: errorColor || theme.colors.red[600] });
      if (sx) styles.push(generateElementStyles(sx));

      return styles;
    }, [variation, gutterBottom, isActive, activeColor, disabled, error, errorColor, sx, style, mode]);

    const renderedChildren = useMemo(() => {
      if (typeof children === 'string' && maxLength) {
        return maxLengthUtile(children, maxLength);
      }
      return children;
    }, [children, maxLength]);

    return (
      <RnText ref={ref} style={[textStyles, style]} {...props}>
        {renderedChildren}
      </RnText>
    );
  },
);

Text.displayName = 'Text';
