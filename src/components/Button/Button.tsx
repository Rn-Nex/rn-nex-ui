import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { ButtonProps } from './Button.types';
import { getButtonStyles } from './utils';
import { ActivityIndicator } from '../ActivityIndicator';

export const Button = React.forwardRef<TouchableWithoutFeedback, ButtonProps>(
  ({ children, style, sx, variation, disabled, fullWidth, disableElevation, buttonColor, loading, ...props }, ref) => {
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
      <BaseButton disabled={loading} ref={ref} {...props} style={[styles, sx && generateElementStyles(sx), style]}>
        {loading ? <ActivityIndicator /> : children}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
