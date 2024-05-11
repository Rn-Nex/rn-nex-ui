import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardHeaderProps } from './CardTypes';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(
   ({ children, ...props }, ref) => {
      return (
         <View ref={ref} style={generateElementStyles(props)}>
            {children}
         </View>
      );
   },
);

CardHeader.displayName = 'CardHeader';
