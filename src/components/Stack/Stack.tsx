import React, { useMemo } from 'react';
import { FlexStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { Box } from '../Box';
import { BoxProps } from '../types';

export interface StackProps
  extends BoxProps,
    Pick<FlexStyle, 'display' | 'justifyContent' | 'alignItems' | 'flex' | 'flexWrap'>,
    Pick<ViewStyle, 'padding' | 'margin'> {
  spacing?: number;
  direction?: 'column' | 'row';
}

export const Stack = React.forwardRef<View, StackProps>(
  (
    {
      children,
      direction = 'column',
      display,
      justifyContent,
      alignItems,
      flex,
      padding,
      margin,
      flexWrap,
      spacing = 0,
      ...rest
    },
    ref,
  ) => {
    const generatedStyles = useMemo(() => {
      const baseStyle: FlexStyle = {
        flexDirection: direction,
      };

      if (display) baseStyle.display = display;
      if (justifyContent) baseStyle.justifyContent = justifyContent;
      if (alignItems) baseStyle.alignItems = alignItems;
      if (flex) baseStyle.flex = flex;
      if (padding) baseStyle.padding = padding;
      if (margin) baseStyle.margin = margin;
      if (flexWrap) baseStyle.flexWrap = flexWrap;

      return StyleSheet.create({
        container: baseStyle,
      });
    }, [direction, display, justifyContent, alignItems, flex]);

    return (
      <Box ref={ref} {...rest} style={[rest.style, generatedStyles.container, { gap: spacing }]}>
        {children}
      </Box>
    );
  },
);
