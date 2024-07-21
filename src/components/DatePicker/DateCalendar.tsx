import React, { useMemo } from 'react';
import { View } from 'react-native';
import { DateCalendarProps } from './DatePickerTypes';
import { dateCalendarWrapperStyles } from './DatePicker.styles';
import { useTheme } from '../../libraries';
import { DateCalendarHeader } from './DateCalendarHeader';
import { Days } from './Days';

export const DateCalendar = React.forwardRef<View, DateCalendarProps>(({ style, dateCalendarHeaderProps, ...props }, ref) => {
  const { theme } = useTheme();
  const wrapperStyles = useMemo(() => dateCalendarWrapperStyles({ theme }), []);

  return (
    <View style={[wrapperStyles, style]} ref={ref} {...props}>
      <DateCalendarHeader {...dateCalendarHeaderProps} />
      <Days />
    </View>
  );
});
