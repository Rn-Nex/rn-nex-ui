import React from 'react';
import { View } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { IconButtonProps } from '../Button/ButtonTypes';
import { ChipProps } from '../Chip/ChipTypes';
import { PortalProps } from '../Portal/PortalTypes';
import { TextFieldProps } from '../TextField/InputTypes';
import { TextProps } from '../Typography/TextTypes';

/**
 * Props for the DateCalendar component.
 * Extends the properties of the View component from React Native.
 *
 * @see {@link https://reactnative.dev/docs/view}
 */
export interface DateCalendarProps extends React.ComponentPropsWithRef<typeof View> {
  dateCalendarHeaderProps?: DateCalendarHeaderProps;
}

/**
 * Props for the DatePicker component.
 * Extends the properties of the View component from React Native.
 */
export interface DatePickerProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * label for the date picker, which will be displayed as a heading or title.
   */
  label?: string;
  /**
   * props for the text field component used within the date picker.
   */
  textFiledProps?: TextFieldProps;
  /**
   * props for the portal component used to render the date picker in a different part of the view hierarchy.
   */
  portalProps?: PortalProps;

  /**
   * Fade animation duration for the date picker calendar animation
   */
  fadeAnimationDuration?: number;

  /**
   * Scale animation duration for the date picker calendar animation
   */
  scaleAnimationDuration?: number;
}

export interface DateCalendarHeaderProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Date calendar header preview button icon
   */
  previousIcons?: React.ReactNode;
  /**
   * Date calendar header next button icon
   */
  nextIcons?: React.ReactNode;

  /**
   * Date calendar header year picker props.
   */
  yearPickerProps?: YearPickerProps;
}
export interface YearPickerProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Props to be passed to the text label component.
   * This can include any properties that the Text component accepts.
   */
  textLabelProps?: TextProps;
  /**
   * Custom icon to be displayed as the dropdown indicator.
   * This allows you to pass any ReactNode to customize the icon.
   */
  dropDownIcon?: React.ReactNode;
  /**
   * Duration of the header label rotation animation in milliseconds.
   * This controls how long the rotation animation takes when the year picker is toggled.
   */
  headerLabelRotationDuration?: number;
  /**
   * Duration of the dropdown icon rotation animation.
   * This can be an array specifying different durations for opening and closing the dropdown.
   * Example: ['300ms', '200ms'] where the first value is for opening and the second for closing.
   */
  dropDownIconRotationDuration?: [string, string];
}

/**
 * DayItemProps interface extends the properties of IconButtonProps to provide
 * additional customization for day items displayed within a calendar component.
 * This interface is used to define the properties that can be passed to a
 * single day item in the calendar.
 */
export interface DayItemProps extends IconButtonProps {
  /**
   * The item to be displayed in the day item component. This can be a number
   * representing the day of the month or a string (e.g., for week day headings).
   *
   * @type {number | string}
   */
  item: number | string;

  /**
   * Additional properties to customize the Text component used for displaying
   * the day label. This allows for further styling and configuration of the text
   * within the day item.
   *
   * @optional
   */
  weekDaysLabelProps?: TextProps;
}

export interface YearsProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Props to customize the Chip component within the Years component.
   */
  chipProps?: ChipProps;
}

export interface DaysProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Props to customize the DaysRow component within the Days component.
   */
  daysRowProps?: DaysRowProps;
}
export interface DaysRowProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Array of week days, which can be either strings or numbers
   */
  weekDays?: string[] | number[];
  /**
   * Props to customize the Text component that labels the week days.
   */
  weekDaysLabelProps?: TextProps;
  /**
   * Type of the week days display, can either be 'heading' for week day names or 'days' for numerical days.
   */
  weekDaysType?: 'heading' | 'days';
}

export interface DatePickerAnimatedViewStylesProps {}

export interface DateCalendarWrapperStylesArgs {
  theme: ThemeType;
}

export interface DaysItemArgs {
  /**
   * The day item, which can be either a number (e.g., 1-31) or a string (e.g., 'Monday').
   */
  item: number | string;
  /**
   * Theme object containing styling information.
   */
  theme: ThemeType;
  /**
   * The currently selected day, which can be either a number or a string.
   */
  currentDay: number | string;
  /**
   * The actively highlighted day, which can be either a number, a string, or null if no day is active.
   */
  activeDay?: number | string | null;
}

export interface ChipItemArgs {
  /**
   * Theme object containing styling information.
   */
  theme: ThemeType;
  /**
   * The currently selected year, which can be either a number or a string.
   */
  currentYear: number | string;
  /**
   * The year represented by this chip item, which can be either a number or a string.
   */
  year: number | string;
}
