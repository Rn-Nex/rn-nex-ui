import React, { useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Text } from '../Typography';
import { QuantityStepperProps } from './Stepper.types';
import { iconStyle, styles } from './styles';

export const DEFAULT_ROUND_RADIUS = 100;
export const DEFAULT_SQUARE_RADIUS = 5;

export const QuantityStepper = React.forwardRef<View, QuantityStepperProps>(
  (
    {
      style,
      value,
      labelProps,
      labelWrapperProps,
      onIncrement,
      onDecrement,
      onIncrementTestId,
      onDecrementTestId,
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
    const themeColors = useThemeColorsSelector();

    const isBelowMinimum = value <= minDecrement;
    const isAboveMaximum = value >= maxIncrement;

    const shouldDisableDecrement = disabledDecrement || (isBelowMinimum && !allowInfiniteDecrement);
    const shouldDisableIncrement = disabledIncrement || (isAboveMaximum && !allowInfiniteIncrement);

    const stepperOptionsStyles = useCallback(
      (type: 'INC' | 'DEC', stepperButtonType: QuantityStepperProps['buttonType']): ViewStyle => {
        let baseStyles: ViewStyle = {
          borderColor: themeColors.grey[800],
          opacity: 1,
          borderRadius: stepperButtonType === 'round' ? DEFAULT_ROUND_RADIUS : DEFAULT_SQUARE_RADIUS,
        };

        if ((type === 'INC' && shouldDisableIncrement) || (type === 'DEC' && shouldDisableDecrement)) {
          baseStyles.opacity = 0.4;
        }

        return baseStyles;
      },
      [themeColors.grey, shouldDisableIncrement, shouldDisableDecrement],
    );

    return (
      <View style={StyleSheet.flatten([styles.stepperContainer, style])} ref={ref} {...props}>
        <TouchableWithoutFeedback onPress={onDecrement} disabled={shouldDisableDecrement} testID={onDecrementTestId}>
          <View
            style={StyleSheet.flatten([
              styles.item,
              styles.stepperOptions,
              stepperOptionsStyles('DEC', buttonType),
              decrementButtonStyle,
            ])}>
            {decrementIcon ?? <View style={StyleSheet.flatten([styles.horizontalLine, iconStyle(themeColors)])} />}
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.item]} {...labelWrapperProps}>
          <Text variation="h2" {...labelProps}>
            {value}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={onIncrement} disabled={shouldDisableIncrement} testID={onIncrementTestId}>
          <View
            style={StyleSheet.flatten([
              styles.item,
              styles.stepperOptions,
              stepperOptionsStyles('INC', buttonType),
              incrementButtonStyle,
            ])}>
            {incrementIcon ?? (
              <React.Fragment>
                <View style={StyleSheet.flatten([styles.horizontalLine, iconStyle(themeColors)])} />
                <View style={StyleSheet.flatten([styles.verticalLine, iconStyle(themeColors)])} />
              </React.Fragment>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
