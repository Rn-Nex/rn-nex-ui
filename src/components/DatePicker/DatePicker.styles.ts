import { StyleSheet, ViewStyle } from 'react-native';
import { DateCalendarWrapperStylesArgs } from './DatePickerTypes';

export const styles = StyleSheet.create({
  datePickerWrapperContainer: {
    width: '100%',
  },
  dateCalendarHeaderWrapperContainer: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  yearPickerHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearPickerHeaderLabelWrapperContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    width: '80%',
  },
  yearPickerOptionsWrapperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '20%',
  },
  daysWrapperContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  daysRowWrapperContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  weekDay: {
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export const dateCalendarWrapperStyles = ({ theme }: DateCalendarWrapperStylesArgs): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: theme.colors.grey[50],
    padding: 5,
    borderRadius: 2,
    height: 300,
    overflow: 'hidden',
  };
  return styles;
};
