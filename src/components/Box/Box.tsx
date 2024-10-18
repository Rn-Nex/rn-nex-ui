import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './Box.types';

export const Box = React.forwardRef<View, BoxProps>(({ children, style, sx, ...props }, ref) => {
  const generatedStyles = useMemo(() => {
    return StyleSheet.create({ boxSX: sx ? generateElementStyles(sx) : {} });
  }, [sx]);

  return (
    <View ref={ref} style={[generatedStyles.boxSX, style]} {...props}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
