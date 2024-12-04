import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { getVariant } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { buttonRootContainerStyles, getButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      style,
      disabled,
      loading,
      label,
      labelStyles,
      labelColor,
      baseButtonStyles,
      flex,
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const isContainedButton = variation === 'contained';

    const renderChild = useCallback(() => {
      if (loading) {
        return <ActivityIndicator />;
      } else if (children) {
        return children;
      } else {
        const textColor = labelColor ?? (isContainedButton ? grey[50] : getVariant({ variant: buttonColor, theme }));

        return <Text style={StyleSheet.flatten([{ color: textColor }, labelStyles])}>{label}</Text>;
      }
    }, [loading, children, labelStyles, theme, variation, buttonColor, labelColor, label]);

    return (
      <View style={StyleSheet.flatten([buttonRootContainerStyles({ flex }), style])}>
        <BaseButton
          disabled={loading || disabled}
          ref={ref}
          style={StyleSheet.flatten([getButtonStyles({ theme, variation, disabled, buttonColor, square }), baseButtonStyles])}
          {...props}>
          {renderChild()}
        </BaseButton>
      </View>
    );
  },
);

Button.displayName = 'Button';
