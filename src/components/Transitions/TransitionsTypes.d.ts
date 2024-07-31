import React from 'react';
import { View, ViewStyle } from 'react-native';
/**
 * Base properties for transition animations. All specific animation types extend from this base.
 */
export interface BaseTransitionProps extends React.ComponentPropsWithoutRef<typeof View> {
  /**
   * Duration of the wobble animation in milliseconds.
   * Defines how long the animation should run.
   */
  duration?: number;

  /**
   * Delay before the animation starts in milliseconds.
   * This allows you to postpone the start of the animation.
   */
  delay?: number;

  /**
   * Number of times the wobble animation should repeat.
   * Sets how many times the animation should loop before stopping.
   */
  repeatCount?: number;

  /**
   * Additional styles for the container.
   * Allows you to apply custom styles to the container view.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Children components to apply the wobble effect.
   * The elements that will undergo the wobble animation.
   */
  children: React.ReactNode;

  /**
   * State for the wobble animation effect.
   * Determines whether the transition animation should be applied or not.
   */
  applyTransition?: boolean;
}

/**
 * Properties for the Wobble animation component.
 * Inherits from BaseTransitionProps and uses default wobble animation parameters.
 */
export interface WobbleProps extends BaseTransitionProps {}

/**
 * Properties for the Bounce animation component.
 * Inherits from BaseTransitionProps with an additional `height` property.
 * `height` sets the bounce effect's height.
 */
export interface BounceProps extends BaseTransitionProps {
  height?: number;
}

/**
 * Properties for the Fade animation component.
 * Inherits from BaseTransitionProps and applies fading animation parameters.
 */
export interface FadeProps extends BaseTransitionProps {}

/**
 * Properties for the Flash animation component.
 * Inherits from BaseTransitionProps and applies flash animation parameters.
 */
export interface FlashProps extends BaseTransitionProps {}

/**
 * Properties for the Pulse animation component.
 * Inherits from BaseTransitionProps with an additional `scale` property.
 * `scale` adjusts the size scaling for the pulse effect.
 */
export interface PulseProps extends BaseTransitionProps {
  scale?: number;
}

/**
 * Properties for the Shake animation component.
 * Inherits from BaseTransitionProps with an additional `type` property.
 * `type` defines the axis of shaking: horizontal ('x') or vertical ('y').
 */
export interface ShakeProps extends BaseTransitionProps {
  type?: 'x' | 'y';
}

/**
 * Properties for the Tada animation component.
 * Inherits from BaseTransitionProps and applies tada animation parameters.
 */
export interface TadaProps extends BaseTransitionProps {}

/**
 * Properties for the HeartBeat animation component.
 * Inherits from BaseTransitionProps and applies heartbeat animation parameters.
 */
export interface HeartBeatProps extends BaseTransitionProps {}

/**
 * Properties for the BackIn animation component.
 * Inherits from BaseTransitionProps with additional `type` and `initialValue` properties.
 * `type` specifies the direction of the backIn animation.
 * `initialValue` sets the starting value for the animation.
 */
export interface BackInProps extends BaseTransitionProps {
  type: 'down' | 'left' | 'right' | 'up';
  initialValue?: number;
}

/**
 * Properties for the Fading animation component.
 * Excludes `repeatCount` from BaseTransitionProps and adds a `type` property.
 * `type` specifies the exact type of fade animation to be applied.
 */
export interface FadingProps extends Omit<BaseTransitionProps, 'repeatCount'> {
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
