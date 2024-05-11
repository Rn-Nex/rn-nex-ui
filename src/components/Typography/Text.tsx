import React from 'react';
import { Text as RnText } from 'react-native';
import { TextProps } from './TextTypes';
import { gutter, maxLength as maxLengthUtile, textFontVariation } from './utils';
import { generateElementStyles } from '../../utils';
import { colors } from '../../libraries';

export const Text = React.forwardRef<RnText, TextProps>(
  ({ sx, children, maxLength, variation, gutterBottom, error, ...props }, ref) => {
    return (
      <RnText
        ref={ref}
        style={[
          variation && textFontVariation(variation),
          gutterBottom && gutter('marginBottom', 10),
          generateElementStyles(props),
          error && { color: colors.error.light },
          sx,
        ]}
        {...props}>
        {typeof children === 'string' && maxLength ? maxLengthUtile(children, maxLength) : children}
      </RnText>
    );
  },
);

Text.displayName = 'Text';
