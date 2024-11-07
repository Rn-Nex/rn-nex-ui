import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { ButtonProps } from './Button.types';
import { getButtonStyles } from './Button.styles';

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
      labelStyles,
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

    const renderChild = useCallback(() => {
      if (loading) {
        return <ActivityIndicator />;
      } else if (children) {
        return children;
      } else {
        const textColor = variation === 'contained' ? grey[50] : theme.colors.grey[900];

        return (
          <Text sx={{ color: textColor }} style={labelStyles}>
            {label}
          </Text>
        );
      }
    }, [loading, children, labelStyles, theme, variation]);

    return (
      <BaseButton
        disabled={loading || disabled}
        ref={ref}
        style={StyleSheet.flatten([baseButtonStyles.generated, sx && generateElementStyles(sx), style])}
        {...props}>
        {renderChild()}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';
