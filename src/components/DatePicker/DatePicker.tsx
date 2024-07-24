import React, { useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { AnimatedView } from '../Box';
import { IconButton } from '../Button';
import { Portal, PortalProvider } from '../Portal';
import { ModalContainerProps } from '../Portal/PortalTypes';
import { TextField } from '../TextField';
import { Text } from '../Typography';
import { DateCalendar } from './DateCalendar';
import { styles } from './DatePicker.styles';
import { DatePickerProvider, useDatePickerContext } from './DatePickerContext';
import { DatePickerProps } from './DatePickerTypes';

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
  onChange,
  selectedDate,
  fadeAnimationDuration,
  scaleAnimationDuration,
  children,
  ...props
}) => {
  const datePickerRef = useRef<View>(null);
  const { showDatePicker, setShowDatePicker, setSelectedDate } = useDatePickerContext();
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const showDatePickerHandler = () => {
    setShowDatePicker(!showDatePicker);
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

  useEffect(() => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  }, [selectedDate]);

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
          <AnimatedView style={[{ transform: [{ scale }] }]}>
            <TouchableWithoutFeedback>
              <DateCalendar onChange={onChange} />
            </TouchableWithoutFeedback>
          </AnimatedView>
        </Portal>
      </PortalProvider>
    </View>
  );
};
