import React, { useCallback, useMemo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '../../libraries';
import { getDaysInMonth, getEndDayOfMonth, getStartDayOfMonth, groupDaysByWeek } from '../../utils';
import { IconButton } from '../Button';
import { Text } from '../Typography';
import { daysItem, styles } from './DatePicker.styles';
import { useDatePickerContext } from './DatePickerContext';
import { DayItemProps, DaysProps, DaysRowProps } from './DatePickerTypes';

export const Days = React.forwardRef<View, DaysProps>(({ style, daysRowProps, ...props }, ref) => {
  const currentDate = useMemo(() => new Date(), []);
  const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);
  const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
  const daysInMonth = useMemo(() => getDaysInMonth(currentMonth, currentYear), [currentMonth, currentYear]);
  const daysArray = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);
  const startDayOfMonth = useMemo(() => getStartDayOfMonth(currentMonth, currentYear), [currentMonth, currentYear]);
  const endDayOfMonth = useMemo(() => getEndDayOfMonth(currentMonth, currentYear), [currentMonth, currentYear]);
  const weeksArray = useMemo(
    () => groupDaysByWeek(daysArray, startDayOfMonth, endDayOfMonth),
    [daysArray, startDayOfMonth, endDayOfMonth],
  );

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
            <DayItem item={item} weekDaysLabelProps={weekDaysLabelProps} />
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

export const DayItem = React.forwardRef<TouchableWithoutFeedback, DayItemProps>(
  ({ item, weekDaysLabelProps, style, ...props }, ref) => {
    const currentDate = useMemo(() => new Date(), []);
    const currentDay = useMemo(() => currentDate.getDate(), [currentDate]);
    const { theme } = useTheme();
    const { activeDay, setActiveDay } = useDatePickerContext();

    const activeDayHandler = useCallback((item: number | string) => {
      setActiveDay(item);
    }, []);

    return (
      <IconButton
        onPress={() => activeDayHandler(item)}
        style={[daysItem({ theme, item, currentDay, activeDay }), style]}
        {...props}
        ref={ref}>
        {Number(item) ? (
          <Text mode="dark" variation="h5" {...weekDaysLabelProps}>
            {item}
          </Text>
        ) : null}
      </IconButton>
    );
  },
);
