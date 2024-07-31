import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface BaseTransitionProps extends React.ComponentPropsWithoutRef<typeof View> {
  /**
   * Duration of the wobble animation in milliseconds
   */
  duration?: number;
  /**
   * Delay before the animation starts in milliseconds
   */
  delay?: number;
  /**
   * Number of times the wobble animation should repeat
   */
  repeatCount?: number;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Children components to apply the wobble effect
   */
  children: React.ReactNode;
  /**
   * State for the wobble animation effect
   */
  applyTransition?: boolean;
}

export interface WobbleProps extends BaseTransitionProps {}
export interface BounceProps extends BaseTransitionProps {
  height?: number;
}
export interface FadeProps extends BaseTransitionProps {}
export interface FlashProps extends BaseTransitionProps {}
export interface PulseProps extends BaseTransitionProps {
  scale?: number;
}
export interface ShakeProps extends BaseTransitionProps {
  type?: 'x' | 'y';
}
export interface TadaProps extends BaseTransitionProps {}
export interface HeartBeatProps extends BaseTransitionProps {}
export interface BackInProps extends BaseTransitionProps {
  /**
   * Type of the backIn animation: "down", "left", "right", "up"
   */
  type: 'down' | 'left' | 'right' | 'up';
  /**
   * Initial value to set for the animation
   */
  initialValue?: number;
}
export interface FadingProps extends Omit<BaseTransitionProps, 'repeatCount'> {
  /**
   * Type of the fading animation
   */
  type:
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInTopLeft'
    | 'fadeInTopRight'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutUp';
}
