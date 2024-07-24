import { StyleSheet, ViewStyle } from 'react-native';
import { ChipItemArgs, DateCalendarWrapperStylesArgs, DaysItemArgs } from './DatePickerTypes';

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
  yearsWrapperContainer: {
    flex: 1,
    width: '100%',
  },
});

export const dateCalendarWrapperStyles = ({ theme }: DateCalendarWrapperStylesArgs): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: theme.colors.grey[800],
    padding: 5,
    borderRadius: 5,
    height: 300,
    overflow: 'hidden',
  };
  return styles;
};

export const daysItem = ({ theme, currentDay, item, currentMonth, displayDateMonth }: DaysItemArgs): ViewStyle => {
  let styles: ViewStyle = {
    borderWidth: 1,
  };

  if (currentDay == item && currentMonth === displayDateMonth) {
    styles.borderColor = theme.colors.grey[400];
  } else {
    styles.borderColor = 'transparent';
  }

  // if (activeDay === item) {
  //   styles.backgroundColor = theme.colors.secondary[500];
  // } else {
  //   styles.backgroundColor = 'transparent';
  // }

  return styles;
};

export const chipItem = ({ theme, currentYear, year }: ChipItemArgs): ViewStyle => {
  const styles: ViewStyle = {
    margin: 2,
    backgroundColor: currentYear == year ? theme.colors.secondary[500] : 'transparent',
  };
  return styles;
};
