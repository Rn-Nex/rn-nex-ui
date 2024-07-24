import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../libraries';
import { getWeeksForDate } from '../../utils';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import { daysItem, styles } from './DatePicker.styles';
import { useDatePickerContext } from './DatePickerContext';
import { DayItemProps, DaysProps, DaysRowProps } from './DatePickerTypes';

export const Days = React.forwardRef<View, DaysProps>(({ style, daysRowProps, onChange, ...props }, ref) => {
  const { displayDate, selectedDate } = useDatePickerContext();
  const weeksArray = getWeeksForDate(displayDate ? displayDate : selectedDate ?? new Date());

  return (
    <View style={[styles.daysWrapperContainer, style]} {...props} ref={ref}>
      <DaysRow {...daysRowProps} />
      {weeksArray.map((weeks, index) => (
        <DaysRow onChange={onChange} weekDaysType="days" key={'daysRows_' + index} weekDays={weeks} {...daysRowProps} />
      ))}
    </View>
  );
});

export const DaysRow: React.FC<DaysRowProps> = memo(
  ({
    style,
    onChange,
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    weekDaysLabelProps,
    weekDaysType = 'heading',
    ...props
  }) => {
    const renderWeekDays = ({ item, index }: { item: string | number; index: number }): React.JSX.Element => {
      if (weekDaysType === 'heading') {
        return (
          <View style={[styles.weekDay]} key={'heading_' + item + index}>
            <Text variation="h6" {...weekDaysLabelProps}>
              {item}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={[styles.weekDay]} key={'weekDays_' + item + index}>
            <DayItem onChange={onChange} item={item} weekDaysLabelProps={weekDaysLabelProps} />
          </View>
        );
      }
    };

    return (
      <View style={[styles.daysRowWrapperContainer, style]} {...props}>
        {weekDays.map((item, index) => renderWeekDays({ item, index }))}
      </View>
    );
  },
);

export const DayItem: React.FC<DayItemProps> = memo(({ item, weekDaysLabelProps, style, onChange, ...props }) => {
  const { currentDate, displayDate, setShowDatePicker } = useDatePickerContext();
  const currentDay = useMemo(() => currentDate.getDate(), [currentDate]);
  const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);
  const displayDateMonth = useMemo(() => {
    if (displayDate) return displayDate.getMonth();
    else return new Date().getMonth();
  }, [displayDate]);

  const { theme } = useTheme();

  const activeDayHandler = useCallback((item: number | string) => {
    if (!!onChange && typeof onChange === 'function') {
      let date: Date;
      if (displayDate) {
        date = new Date(displayDate);
      } else {
        date = new Date(currentDate);
      }

      date.setUTCDate(Number(item));
      onChange(date);
    }

    setShowDatePicker(false);
  }, []);

  return (
    <IconButton
      onPress={() => activeDayHandler(item)}
      style={[daysItem({ theme, item, currentDay, currentMonth, displayDateMonth }), style]}
      {...props}>
      {Number(item) ? (
        <Text variation="h5" {...weekDaysLabelProps}>
          {item}
        </Text>
      ) : null}
    </IconButton>
  );
});
