import React, { useMemo } from 'react';
import { Text as RnText } from 'react-native';
import { useTheme } from '../../libraries';
import { TextProps } from './Text.types';
import { generateTextStyles } from './utils';
import { maxLength as maxLengthUtile } from '../../utils';

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
      mode,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const textStyles = useMemo(
      () => generateTextStyles({ theme, variation, gutterBottom, isActive, activeColor, disabled, error, errorColor, sx, mode }),
      [theme, variation, gutterBottom, isActive, activeColor, disabled, error, errorColor, sx, mode],
    );

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
