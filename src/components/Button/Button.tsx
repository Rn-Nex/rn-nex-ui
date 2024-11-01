import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { ButtonProps } from './Button.types';
import { getButtonStyles } from './utils';

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      style,
      sx,
      disabled,
      fullWidth,
      disableElevation,
      loading,
      label,
      labelProps,
      buttonColor = 'secondary',
      variation = 'contained',
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
        style={StyleSheet.flatten([baseButtonStyles.generated, sx && generateElementStyles(sx), style])}
        {...props}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          children || (
            <Text sx={{ color: variation === 'contained' ? grey[50] : theme.colors.grey[900] }} {...labelProps}>
              {label}
            </Text>
          )
        )}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
