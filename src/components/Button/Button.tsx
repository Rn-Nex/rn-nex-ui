import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { ButtonProps } from './ButtonTypes';
import { getButtonStyles } from './utils';

export const Button = React.forwardRef<TouchableWithoutFeedback, ButtonProps>(
  ({ children, style, sx, variation, disabled, fullWidth, disableElevation, buttonColor, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        {...props}
        style={[
          getButtonStyles({
            variation,
            fullWidth,
            disableElevation,
            disabled,
            buttonColor,
          }),
          sx && generateElementStyles(sx),
          style,
        ]}>
        {children}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
