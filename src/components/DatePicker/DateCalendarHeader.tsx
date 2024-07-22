import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { AnimatedView } from '../Box';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import { styles } from './DatePicker.styles';
import { useDatePickerContext } from './DatePickerContext';
import { DateCalendarHeaderProps, YearPickerProps } from './DatePickerTypes';

export const DateCalendarHeader = ({ style, previousIcons, nextIcons, yearPickerProps, ...props }: DateCalendarHeaderProps) => {
  return (
    <View style={[styles.dateCalendarHeaderWrapperContainer, style]} {...props}>
      <YearPicker {...yearPickerProps} />
      <View style={[styles.yearPickerOptionsWrapperContainer]}>
        <IconButton>{previousIcons ?? <Text mode="dark">P</Text>}</IconButton>
        <IconButton>{nextIcons ?? <Text mode="dark">N</Text>}</IconButton>
      </View>
    </View>
  );
};

export const YearPicker = ({
  style,
  textLabelProps,
  dropDownIcon,
  headerLabelRotationDuration = 200,
  dropDownIconRotationDuration = ['0deg', '180deg'],
  ...props
}: YearPickerProps) => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const { showYearPicker, setShowYearPicker, currentYear, activeMonthName } = useDatePickerContext();

  const yearPickerHandler = () => {
    setShowYearPicker(!showYearPicker);
  };

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];
    animations.push(
      Animated.timing(rotationValue, {
        toValue: showYearPicker ? 1 : 0,
        duration: headerLabelRotationDuration,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    );

    Animated.parallel(animations).start();
  }, [showYearPicker]);

  const rotateInterpolate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: dropDownIconRotationDuration,
  });

  return (
    <View style={[styles.yearPickerHeaderContainer, style]} {...props}>
      <View style={[styles.yearPickerHeaderLabelWrapperContainer]}>
        <Text mode="dark" {...textLabelProps}>
          {activeMonthName} {currentYear}
        </Text>
        <IconButton onPress={yearPickerHandler}>
          <AnimatedView style={[{ transform: [{ rotate: rotateInterpolate }] }]}>
            {dropDownIcon ?? <Text mode="dark">D</Text>}
          </AnimatedView>
        </IconButton>
      </View>
    </View>
  );
};
