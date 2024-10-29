import React, { useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { ButtonProps } from './Button.types';
import { getButtonStyles } from './utils';

export const Button = React.forwardRef<TouchableWithoutFeedback, ButtonProps>(
  (
    {
      children,
      style,
      sx,
      variation,
      disabled,
      fullWidth,
      disableElevation,
      buttonColor,
      loading,
      label,
      labelProps,
      square = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const baseButtonStyles = useMemo(() => {
      const styles = getButtonStyles({ theme, variation, fullWidth, disableElevation, disabled, buttonColor, square });
      return StyleSheet.create({ generated: styles });
    }, [theme, variation, fullWidth, disableElevation, disabled, buttonColor, square]);

    return (
      <BaseButton
        disabled={loading || disabled}
        ref={ref}
        {...props}
        style={StyleSheet.flatten([baseButtonStyles.generated, sx && generateElementStyles(sx), style])}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          children || (
            <Text mode="light" {...labelProps}>
              {label}
            </Text>
          )
        )}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
