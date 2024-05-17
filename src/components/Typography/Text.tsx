import React, { useMemo } from 'react';
import { Text as RnText } from 'react-native';
import { colors } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { TextProps } from './TextTypes';
import { gutter, maxLength as maxLengthUtile, textFontVariation } from './utils';

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
      disabled = true,
      ...props
    },
    ref,
  ) => {
    const textStyles = useMemo(() => {
      const styles = [];
      if (variation) styles.push(textFontVariation(variation));
      if (gutterBottom) styles.push(gutter('marginBottom', 10));
      if (isActive) styles.push({ color: activeColor || colors.blue.dark });
      if (!disabled) styles.push({ color: colors.disabled.dark });
      if (error) styles.push({ color: errorColor || colors.error.light });
      if (sx) styles.push(generateElementStyles(sx));
      if (style) styles.push(style);

      return styles;
    }, [variation, gutterBottom, isActive, activeColor, disabled, error, errorColor, sx, style]);

    const renderedChildren = useMemo(() => {
      if (typeof children === 'string' && maxLength) {
        return maxLengthUtile(children, maxLength);
      }
      return children;
    }, [children, maxLength]);

    return (
      <RnText ref={ref} style={textStyles} {...props}>
        {renderedChildren}
      </RnText>
    );
  },
);

Text.displayName = 'Text';
