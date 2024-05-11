import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { IconButtonProps } from './ButtonTypes';
import { getButtonStyles } from './utils';

export const IconButton = React.forwardRef<
   TouchableWithoutFeedback,
   IconButtonProps
>(
   (
      {
         ripple,
         disabled,
         children,
         sx,
         variation = 'roundedIconButton',
         ...props
      },
      ref,
   ) => {
      return (
         <BaseButton
            rippleEdge="center"
            {...props}
            ref={ref}
            sx={{
               ...getButtonStyles({ variation, disabled }),
               ...(sx && generateElementStyles(sx)),
            }}>
            {children}
         </BaseButton>
      );
   },
);

IconButton.displayName = 'IconButton';
