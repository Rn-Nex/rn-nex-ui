import React from 'react';
import { Text as RnText } from 'react-native';
import { TextProps } from './TextTypes';
import { gutter, maxLength as maxLengthUtile, textFontVariation } from './utils';
import { generateElementStyles } from '../../utils';
import { colors } from '../../libraries';

export const Text = React.forwardRef<RnText, TextProps>(
  ({ children, maxLength, variation, gutterBottom, error, errorColor, isActive, activeColor, ...props }, ref) => {
    return (
      <RnText
        ref={ref}
        style={[
          variation && textFontVariation(variation),
          gutterBottom && gutter('marginBottom', 10),
          error && { color: errorColor ? errorColor : colors.error.light },
          isActive && { color: activeColor ? activeColor : colors.blue.dark },
          generateElementStyles(props),
        ]}
        {...props}>
        {typeof children === 'string' && maxLength ? maxLengthUtile(children, maxLength) : children}
      </RnText>
    );
  },
);

Text.displayName = 'Text';
