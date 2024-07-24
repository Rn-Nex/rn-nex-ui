import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../libraries';
import { DateCalendarHeader } from './DateCalendarHeader';
import { dateCalendarWrapperStyles } from './DatePicker.styles';
import { DateCalendarProps } from './DatePickerTypes';
import { Days } from './Days';
import { Years } from './Years';
import { useDatePickerContext } from './DatePickerContext';

export const DateCalendar = React.forwardRef<View, DateCalendarProps>(
  ({ style, dateCalendarHeaderProps, onChange, ...props }, ref) => {
    const { theme } = useTheme();
    const wrapperStyles = useMemo(() => dateCalendarWrapperStyles({ theme }), [theme]);
    const { showYearPicker } = useDatePickerContext();

    return (
      <View style={[wrapperStyles, style]} ref={ref} {...props}>
        <DateCalendarHeader {...dateCalendarHeaderProps} />
        {showYearPicker ? <Years /> : <Days onChange={onChange} />}
      </View>
    );
  },
);
