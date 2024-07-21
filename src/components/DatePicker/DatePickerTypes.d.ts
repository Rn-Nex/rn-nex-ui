import React from 'react';
import { LayoutRectangle, View } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { MeasureElementRect } from '../../types';
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

export interface DaysProps extends React.ComponentPropsWithRef<typeof View> {
  daysRowProps?: DaysRowProps;
}
export interface DaysRowProps extends React.ComponentPropsWithRef<typeof View> {
  weekDays?: string[] | number[];
  weekDaysLabelProps?: TextProps;
  weekDaysType?: 'heading' | 'days';
}

export interface DatePickerAnimatedViewStylesProps {
  datePickerRectMeasurePos?: MeasureElementRect | null;
  animatedRect?: LayoutRectangle;
}

export interface DateCalendarWrapperStylesArgs {
  theme: ThemeType;
}
