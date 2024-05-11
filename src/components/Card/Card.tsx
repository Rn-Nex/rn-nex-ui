import React from 'react';
import { View } from 'react-native';
import { cardVariation } from './utils';
import { generateElementStyles } from '../../utils';
import { CardProps } from './CardTypes';

export const Card = React.forwardRef<View, CardProps>(
   ({ children, variation, ...props }, ref) => {
      return (
         <View
            ref={ref}
            style={{
               ...(variation
                  ? generateElementStyles({
                       ...props,
                       ...cardVariation(variation),
                    })
                  : generateElementStyles(props)),
            }}>
            {children}
         </View>
      );
   },
);

Card.displayName = 'Card';
