import React from 'react';
import { TextProps } from 'react-native';

/**
 * Props for the Snackbar component.
 */
export interface SnackbarProps {
  /**
   * The message to display in the Snackbar.
   */
  message: string;

  /**
   * Controls whether the Snackbar is visible or hidden.
   */
  visible: boolean;

  /**
   * Optional: Duration in milliseconds after which the Snackbar automatically hides. Set to null to disable auto-hide.
   */
  autoHideDuration?: number | null;

  /**
   * Optional: Duration in milliseconds after user interaction before hiding resumes. Used only if autoHideDuration is set.
   */
  resumeHideDuration?: number;

  /**
   * Optional: Background color of the Snackbar.
   */
  backgroundColor?: string;

  /**
   * Optional: Text color of the message in the Snackbar.
   */
  textColor?: string;

  /**
   * Optional: Custom action component to render in the Snackbar.
   */
  actionComponent?: React.ReactNode;

  /**
   * Optional: Custom styles for the root Snackbar container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional: Custom styles for the message text.
   */
  messageStyle?: StyleProp<TextStyle>;

  /**
   * Optional: Duration in milliseconds for slide-in and slide-out animation.
   */
  animationDuration?: number;

  /**
   * Optional: Callback function invoked when the Snackbar is hidden.
   */
  onHide?: () => void;

  /**
   * Optional: Specifies the horizontal and vertical position of the Snackbar.
   */
  anchorOrigin?: { horizontal: 'center' | 'left' | 'right'; vertical: 'bottom' | 'top' };

  /**
   * Optional: Elevation (shadow depth) of the Snackbar.
   */
  elevation?: number;

  /**
   *  Optional: Border radius of the Snackbar container.
   */
  borderRadius?: number;

  /**
   * A React node to be displayed at the start of the chip.
   */
  startAdornment?: React.ReactNode;

  /**
   * Style for the start adornment container.
   */
  startAdornmentContainerStyle?: StyleProp<ViewStyle>;
}
