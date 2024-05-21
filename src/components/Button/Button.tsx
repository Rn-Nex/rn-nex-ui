import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { ButtonProps } from './ButtonTypes';
import { getButtonStyles } from './utils';
import { useTheme } from '../../libraries';

export const Button = React.forwardRef<TouchableWithoutFeedback, ButtonProps>(
  ({ children, style, sx, variation, disabled, fullWidth, disableElevation, buttonColor, ...props }, ref) => {
    const { theme } = useTheme();
    const styles = useMemo(
      () =>
        getButtonStyles({
          theme,
          variation,
          fullWidth,
          disableElevation,
          disabled,
          buttonColor,
        }),
      [theme, variation, fullWidth, disableElevation, disabled, buttonColor],
    );

    return (
      <BaseButton ref={ref} {...props} style={[styles, sx && generateElementStyles(sx), style]}>
        {children}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
