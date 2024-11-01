import React, { useCallback, useMemo } from 'react';
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { Text } from '../Typography';
import { styles } from './styles';
import { QuantityStepperProps } from './Stepper.types';

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
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const stepperOptionsStyles = useCallback(
      (type: 'INC' | 'DEC', buttonType: QuantityStepperProps['buttonType']): ViewStyle => {
        let styles: ViewStyle = {
          borderColor: theme.colors.grey[800],
          opacity: 1,
          borderRadius: buttonType === 'round' ? 100 : 5,
        };

        if (
          (type === 'INC' && (disabledIncrement || value >= maxIncrement)) ||
          (type === 'DEC' && (disabledDecrement || value <= minDecrement))
        ) {
          styles.opacity = 0.4;
        }

        return styles;
      },
      [theme, disabledDecrement, disabledIncrement, minDecrement, maxIncrement, value, buttonType],
    );

    const iconStyle = useMemo(() => {
      const styles: ViewStyle = {
        backgroundColor: theme.colors.grey[800],
      };
      return styles;
    }, [theme]);

    return (
      <View style={[styles.stepperContainer, style]} ref={ref} {...props}>
        <TouchableWithoutFeedback onPress={onDecrement} disabled={disabledDecrement || value <= minDecrement ? true : false}>
          <View style={[styles.item, styles.stepperOptions, stepperOptionsStyles('DEC', buttonType), decrementButtonStyle]}>
            {decrementIcon || <View style={[styles.horizontalLine, iconStyle]} />}
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.item]} {...labelWrapperProps}>
          <Text variation="h2" {...labelProps}>
            {value}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={onIncrement} disabled={disabledIncrement || value >= maxIncrement}>
          <View style={[styles.item, styles.stepperOptions, stepperOptionsStyles('INC', buttonType), incrementButtonStyle]}>
            {incrementIcon || (
              <React.Fragment>
                <View style={[styles.horizontalLine, iconStyle]} />
                <View style={[styles.verticalLine, iconStyle]} />
              </React.Fragment>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
