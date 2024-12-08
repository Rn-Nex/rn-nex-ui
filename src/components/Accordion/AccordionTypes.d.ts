import React from 'react';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { Theme, ThemeType } from '../../libraries/themes/v1/theme';
import { AccordionProps } from './Accordion';

/**
 * Props for the AccordionSummary component.
 */
export interface AccordionSummaryProps extends React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> {
  /**
   * Icon displayed to indicate expansion state.
   */
  expandIcon?: React.ReactNode;

  /**
   * Styles for the wrapper around summary child elements.
   */
  summaryChildWrapperStyles?: StyleProp<ViewStyle>;

  /**
   * Styles for the wrapper around the expand icon.
   */
  expandIconWrapperStyles?: StyleProp<ViewStyle>;

  /**
   * Duration of the rotation animation for the expand icon.
   */
  rotateAnimationDuration?: number;

  /**
   * Duration of the height value animation.
   */
  heightValueAnimationDuration?: number;

  /**
   * Duration of the accordion summary animated view
   */
  accordionDetailsOpacityDuration?: number;

  /**
   * Range of rotation animation values.
   */
  rotateAnimationRange?: [string, string];

  /**
   * Content to display in the expanded accordion details.
   */
  accordionDetails?: React.ReactNode;

  /**
   * Styles for the wrapper around the entire accordion component.
   */
  accordionWrapperStyles?: StyleProp<ViewStyle>;

  /**
   * Determines if the accordion is expanded or collapsed.
   */
  defaultExpanded?: boolean;

  /**
   * Show the accordion top border
   */
  topBorder?: boolean;

  /**
   * Show the accordion bottom border
   */
  bottomBorder?: boolean;

  /**
   * When the accordion is collapsed or expend the function is called
   */
  onExpand?: () => void;

  /**
   * A React node to be displayed at the start of the accordion.
   */
  startAdornment?: React.ReactNode;

  /**
   * Style for the start adornment container.
   */
  startAdornmentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Track Content Changes: prop to identify when the content of accordionDetails changes.
   */
  contentKey?: string;
}

export interface AccordionWrapperStylesInterface extends Pick<AccordionProps, 'disable' | 'square'> {
  colors: Theme;
}
