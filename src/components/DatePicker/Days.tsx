import React from 'react';
import { View } from 'react-native';
import { getDaysInMonth, getEndDayOfMonth, getStartDayOfMonth, groupDaysByWeek } from '../../utils';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import { styles } from './DatePicker.styles';
import { DaysProps, DaysRowProps } from './DatePickerTypes';

export const Days = React.forwardRef<View, DaysProps>(({ style, daysRowProps, ...props }, ref) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const startDayOfMonth = getStartDayOfMonth(currentMonth, currentYear);
  const endDayOfMonth = getEndDayOfMonth(currentMonth, currentYear);
  const weeksArray = groupDaysByWeek(daysArray, startDayOfMonth, endDayOfMonth);

  return (
    <View style={[styles.daysWrapperContainer, style]} {...props} ref={ref}>
      <DaysRow {...daysRowProps} />
      {weeksArray.map((weeks, index) => (
        <DaysRow weekDaysType="days" key={'daysRows_' + index} weekDays={weeks} {...daysRowProps} />
      ))}
    </View>
  );
});

export const DaysRow = React.forwardRef<View, DaysRowProps>(
  ({ style, weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'], weekDaysLabelProps, weekDaysType = 'heading', ...props }, ref) => {
    const renderWeekDays = ({ item, index }: { item: string | number; index: number }): React.JSX.Element => {
      if (weekDaysType === 'heading') {
        return (
          <View style={[styles.weekDay]} key={'heading_' + item + index}>
            <Text mode="dark" variation="h6" {...weekDaysLabelProps}>
              {item}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={[styles.weekDay]} key={'weekDays_' + item + index}>
            <IconButton onPress={() => console.log('PRESSED')}>
              {Number(item) ? (
                <Text mode="dark" variation="h5" {...weekDaysLabelProps}>
                  {item}
                </Text>
              ) : null}
            </IconButton>
          </View>
        );
      }
    };

    return (
      <View style={[styles.daysRowWrapperContainer, style]} {...props} ref={ref}>
        {weekDays.map((item, index) => renderWeekDays({ item, index }))}
      </View>
    );
  },
);
