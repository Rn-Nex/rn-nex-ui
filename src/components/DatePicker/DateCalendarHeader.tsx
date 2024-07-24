import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { AnimatedView } from '../Box';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import { styles } from './DatePicker.styles';
import { useDatePickerContext } from './DatePickerContext';
import { DateCalendarHeaderProps, YearPickerProps } from './DatePickerTypes';
import { getMonthName } from './utils';

export const DateCalendarHeader = ({ style, previousIcons, nextIcons, yearPickerProps, ...props }: DateCalendarHeaderProps) => {
  const { displayDate, setDisplayDate } = useDatePickerContext();

  const dateHandler = (type: 'INC' | 'DEC') => {
    const updatedDate = new Date(displayDate ?? new Date());
    updatedDate.setMonth(updatedDate.getMonth() + (type === 'DEC' ? -1 : 1));
    const lastDayOfNewMonth = new Date(updatedDate.getFullYear(), updatedDate.getMonth() + 1, 0).getDate();
    if (updatedDate.getDate() > lastDayOfNewMonth) {
      updatedDate.setDate(lastDayOfNewMonth);
    }

    setDisplayDate(updatedDate);
  };

  return (
    <View style={[styles.dateCalendarHeaderWrapperContainer, style]} {...props}>
      <YearPicker {...yearPickerProps} />
      <View style={[styles.yearPickerOptionsWrapperContainer]}>
        <IconButton onPress={() => dateHandler('DEC')}>{previousIcons ?? <Text>P</Text>}</IconButton>
        <IconButton onPress={() => dateHandler('INC')}>{nextIcons ?? <Text>N</Text>}</IconButton>
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

  const { showYearPicker, setShowYearPicker, displayDate, selectedDate } = useDatePickerContext();

  const currentYear = useMemo(() => {
    if (displayDate) return displayDate.getFullYear();
    if (selectedDate) return selectedDate.getFullYear();
    else return new Date().getFullYear();
  }, [displayDate]);

  const currentMonthIndex = useMemo(() => {
    if (displayDate) return displayDate.getMonth();
    if (selectedDate) return selectedDate.getMonth();
    else return new Date().getMonth();
  }, [displayDate]);

  const activeMonthName = useMemo(() => getMonthName(currentMonthIndex), [currentMonthIndex]);

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
        <Text {...textLabelProps}>
          {activeMonthName} {currentYear}
        </Text>
        <IconButton onPress={yearPickerHandler}>
          <AnimatedView style={[{ transform: [{ rotate: rotateInterpolate }] }]}>{dropDownIcon ?? <Text>D</Text>}</AnimatedView>
        </IconButton>
      </View>
    </View>
  );
};
