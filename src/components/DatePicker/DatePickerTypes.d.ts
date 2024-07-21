import React from 'react';
import { LayoutRectangle, View } from 'react-native';
import { TextFieldProps } from '../TextField/InputTypes';
import { PortalProps } from '../Portal/PortalTypes';
import { MeasureElementRect } from '../../types';

/**
 * Props for the DateCalendar component.
 * Extends the properties of the View component from React Native.
 *
 * @see {@link https://reactnative.dev/docs/view}
 */
export interface DateCalendarProps extends React.ComponentPropsWithRef<typeof View> {}

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

export interface DatePickerAnimatedViewStylesProps {
  datePickerRectMeasurePos?: MeasureElementRect | null;
  animatedRect?: LayoutRectangle;
}
