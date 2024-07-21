import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, View, ViewStyle } from 'react-native';
import { MeasureElementRect } from '../../types';
import { AnimatedView } from '../Box';
import { IconButton } from '../Button';
import { Portal } from '../Portal';
import { TextField } from '../TextField';
import { Text } from '../Typography';
import { DateCalendar } from './DateCalendar';
import { styles } from './DatePicker.styles';
import { DatePickerProps } from './DatePickerTypes';
import { datePickerAnimatedViewStyles } from './utils';

export const DatePicker: React.FC<DatePickerProps> = ({
  style,
  label,
  textFiledProps,
  portalProps,
  fadeAnimationDuration,
  scaleAnimationDuration,
  children,
  ...props
}) => {
  const datePickerRef = useRef<View>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [datePickerRectMeasurePos, setDatePickerRectMeasurePos] = useState<MeasureElementRect | null>(null);
  const [animatedRect, setAnimatedRect] = useState<LayoutRectangle>();
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const datePickerAnimatedStyles: ViewStyle = useMemo(
    () => datePickerAnimatedViewStyles({ datePickerRectMeasurePos, animatedRect }),
    [showDatePicker],
  );

  const showDatePickerHandler = () => {
    setShowDatePicker(!showDatePicker);
  };

  const measurePositionHandler = () => {
    if (datePickerRef?.current) {
      datePickerRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setDatePickerRectMeasurePos({ x, y, width, height, pageX, pageY });
      });
    }
  };

  const animatedViewOnLayoutHandler = (event: LayoutChangeEvent) => {
    setAnimatedRect(event.nativeEvent.layout);
  };

  useEffect(() => {
    if (showDatePicker) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: fadeAnimationDuration,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: fadeAnimationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: scaleAnimationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showDatePicker]);

  return (
    <View style={[styles.datePickerWrapperContainer, style]} ref={datePickerRef} {...props}>
      <TextField
        variant="outlined"
        placeholder={label ?? 'Date picker'}
        endAdornment={
          <IconButton
            onPress={() => {
              showDatePickerHandler();
              measurePositionHandler();
            }}>
            <Text mode="dark">D</Text>
          </IconButton>
        }
        {...textFiledProps}
      />
      <Portal
        portalKey="DatePicker"
        animationType="fade"
        visible={showDatePicker}
        onClose={showDatePickerHandler}
        {...portalProps}>
        <AnimatedView onLayout={animatedViewOnLayoutHandler} style={[datePickerAnimatedStyles, { transform: [{ scale }] }]}>
          <DateCalendar />
        </AnimatedView>
      </Portal>
    </View>
  );
};
