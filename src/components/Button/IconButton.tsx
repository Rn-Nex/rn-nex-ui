import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { IconButtonProps } from './ButtonTypes';
import { getButtonStyles } from './utils';

export const IconButton = React.forwardRef<TouchableWithoutFeedback, IconButtonProps>(
  ({ disabled, children, style, variation = 'roundedIconButton', ...props }, ref) => {
    return (
      <BaseButton
        rippleEdge="center"
        {...props}
        ref={ref}
        style={{
          ...getButtonStyles({ variation, disabled }),
          ...(style && generateElementStyles(style)),
        }}>
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
