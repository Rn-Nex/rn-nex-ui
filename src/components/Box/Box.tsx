import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './BoxTypes';

export const Box = React.forwardRef<View, BoxProps>(
   ({ children, ...props }, ref) => {
      return (
         <View ref={ref} style={generateElementStyles(props)}>
            {children}
         </View>
      );
   },
);

Box.displayName = 'Box';
