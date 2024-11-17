import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { getVariant } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { getButtonStyles, styles } from './Button.styles';
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
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const isContainedButton = variation === 'contained';

    const baseButtonS = useMemo(() => {
      const styles = getButtonStyles({ theme, variation, disabled, buttonColor, square });
      return StyleSheet.create({ generated: styles });
    }, [theme, variation, disabled, buttonColor, square]);

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
      <View style={StyleSheet.flatten([styles.rootContainer, style])}>
        <View style={[styles.innerContainer]}>
          <BaseButton
            disabled={loading || disabled}
            ref={ref}
            style={StyleSheet.flatten([baseButtonS.generated, baseButtonStyles])}
            {...props}>
            {renderChild()}
          </BaseButton>
        </View>
      </View>
    );
  },
);

Button.displayName = 'Button';
