import React, { useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { Text } from '../Typography';
import { QuantityStepperProps } from './Stepper.types';
import { iconStyle, styles } from './styles';

export const QuantityStepper = React.forwardRef<View, QuantityStepperProps>(
  (
    {
      style,
      value,
      labelProps,
      labelWrapperProps,
      onIncrement,
      onDecrement,
      incrementButtonStyle,
      decrementButtonStyle,
      buttonType = 'round',
      disabledIncrement = false,
      disabledDecrement = false,
      maxIncrement = 10,
      minDecrement = 0,
      incrementIcon,
      decrementIcon,
      allowInfiniteIncrement = false,
      allowInfiniteDecrement = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const isBelowMinimum = value <= minDecrement;
    const isAboveMaximum = value >= maxIncrement;

    const shouldDisableDecrement = disabledDecrement || (isBelowMinimum && !allowInfiniteDecrement);
    const shouldDisableIncrement = disabledIncrement || (isAboveMaximum && !allowInfiniteIncrement);

    const stepperOptionsStyles = useCallback(
      (type: 'INC' | 'DEC', buttonType: QuantityStepperProps['buttonType']): ViewStyle => {
        let styles: ViewStyle = {
          borderColor: theme.colors.grey[800],
          opacity: 1,
          borderRadius: buttonType === 'round' ? 100 : 5,
        };

        if ((type === 'INC' && shouldDisableIncrement) || (type === 'DEC' && shouldDisableDecrement)) {
          styles.opacity = 0.4;
        }

        return styles;
      },
      [
        theme,
        disabledDecrement,
        disabledIncrement,
        minDecrement,
        maxIncrement,
        value,
        buttonType,
        allowInfiniteIncrement,
        allowInfiniteDecrement,
      ],
    );

    return (
      <View style={StyleSheet.flatten([styles.stepperContainer, style])} ref={ref} {...props}>
        <TouchableWithoutFeedback onPress={onDecrement} disabled={shouldDisableDecrement}>
          <View
            style={StyleSheet.flatten([
              styles.item,
              styles.stepperOptions,
              stepperOptionsStyles('DEC', buttonType),
              decrementButtonStyle,
            ])}>
            {decrementIcon ?? <View style={StyleSheet.flatten([styles.horizontalLine, iconStyle(theme)])} />}
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.item]} {...labelWrapperProps}>
          <Text variation="h2" {...labelProps}>
            {value}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={onIncrement} disabled={shouldDisableIncrement}>
          <View
            style={StyleSheet.flatten([
              styles.item,
              styles.stepperOptions,
              stepperOptionsStyles('INC', buttonType),
              incrementButtonStyle,
            ])}>
            {incrementIcon ?? (
              <React.Fragment>
                <View style={StyleSheet.flatten([styles.horizontalLine, iconStyle(theme)])} />
                <View style={StyleSheet.flatten([styles.verticalLine, iconStyle(theme)])} />
              </React.Fragment>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
