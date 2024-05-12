import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './BoxTypes';

export const Box = React.forwardRef<View, BoxProps>(({ children, sx, ...props }, ref) => {
  return (
    <View ref={ref} {...props} style={[sx && generateElementStyles(sx)]}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
