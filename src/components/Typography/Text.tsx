import React from 'react';
import { Text as RnText } from 'react-native';
import { colors } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { TextProps } from './TextTypes';
import { gutter, maxLength as maxLengthUtile, textFontVariation } from './utils';

export const Text = React.forwardRef<RnText, TextProps>(
  (
    { children, maxLength, variation, gutterBottom, error, errorColor, isActive, activeColor, style, disabled = true, ...props },
    ref,
  ) => {
    return (
      <RnText
        ref={ref}
        style={[
          variation && textFontVariation(variation),
          gutterBottom && gutter('marginBottom', 10),
          isActive && { color: activeColor ? activeColor : colors.blue.dark },
          !disabled && { color: colors.disabled.dark },
          error && { color: errorColor ? errorColor : colors.error.light },
          style && generateElementStyles(style),
        ]}
        {...props}>
        {typeof children === 'string' && maxLength ? maxLengthUtile(children, maxLength) : children}
      </RnText>
    );
  },
);

Text.displayName = 'Text';
