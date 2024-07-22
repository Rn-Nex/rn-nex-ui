import React, { useEffect, useRef } from 'react';
import { Animated, LayoutChangeEvent, TouchableWithoutFeedback, View } from 'react-native';
import { AnimatedView } from '../Box';
import { IconButton } from '../Button';
import { Portal, PortalProvider } from '../Portal';
import { TextField } from '../TextField';
import { Text } from '../Typography';
import { DateCalendar } from './DateCalendar';
import { styles } from './DatePicker.styles';
import { DatePickerProvider, useDatePickerContext } from './DatePickerContext';
import { DatePickerProps } from './DatePickerTypes';
import { ModalContainerProps } from '../Portal/PortalTypes';

const modalContainerProps: ModalContainerProps = {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
};

export const DatePicker: React.FC<DatePickerProps> = props => {
  return (
    <DatePickerProvider>
      <DatePickerWithInputAndCalendar {...props} />
    </DatePickerProvider>
  );
};

export const DatePickerWithInputAndCalendar: React.FC<DatePickerProps> = ({
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
  const { showDatePicker, setShowDatePicker, setDateCalendarRect } = useDatePickerContext();
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const showDatePickerHandler = () => {
    setShowDatePicker(!showDatePicker);
  };

  const animatedViewOnLayoutHandler = (event: LayoutChangeEvent) => {
    setDateCalendarRect(event.nativeEvent.layout);
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
          <IconButton onPress={showDatePickerHandler}>
            <Text mode="dark">D</Text>
          </IconButton>
        }
        {...textFiledProps}
      />
      <PortalProvider>
        <Portal
          portalKey="DatePicker"
          animationType="fade"
          visible={showDatePicker}
          onClose={showDatePickerHandler}
          modalContainerProps={modalContainerProps}
          {...portalProps}>
          <AnimatedView onLayout={animatedViewOnLayoutHandler} style={[{ transform: [{ scale }] }]}>
            <TouchableWithoutFeedback>
              <DateCalendar />
            </TouchableWithoutFeedback>
          </AnimatedView>
        </Portal>
      </PortalProvider>
    </View>
  );
};
