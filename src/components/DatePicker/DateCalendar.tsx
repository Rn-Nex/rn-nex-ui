import React from 'react';
import { View } from 'react-native';
import { DateCalendarProps } from './DatePickerTypes';

export const DateCalendar = React.forwardRef<View, DateCalendarProps>(({ style, ...props }, ref) => {
  return <View style={[style]} ref={ref} {...props}></View>;
});
