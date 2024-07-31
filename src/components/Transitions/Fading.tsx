import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { FadingProps } from './TransitionsTypes';

const DEFAULT_INITIAL_LARGE_POSITION_VALUE = 1000;
const DEFAULT_INITIAL_SMALL_POSITION_VALUE = 50;

type InitialTransform = {
  translateX: number;
  translateY: number;
};

const getInitialTransform = (type: FadingProps['type']): InitialTransform => {
  switch (type) {
    case 'fadeInDown':
    case 'fadeInDownBig':
    case 'fadeOutDown':
      return {
        translateY: type.endsWith('Big') ? -DEFAULT_INITIAL_LARGE_POSITION_VALUE : -DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateX: 0,
      };
    case 'fadeInUp':
    case 'fadeInUpBig':
      return {
        translateY: type.endsWith('Big') ? DEFAULT_INITIAL_LARGE_POSITION_VALUE : DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateX: 0,
      };
    case 'fadeOutUp':
      return {
        translateY: 0,
        translateX: 0,
      };
    case 'fadeInLeft':
    case 'fadeInLeftBig':
      return {
        translateX: type.endsWith('Big') ? -DEFAULT_INITIAL_LARGE_POSITION_VALUE : -DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateY: 0,
      };
    case 'fadeInRight':
    case 'fadeInRightBig':
      return {
        translateX: type.endsWith('Big') ? DEFAULT_INITIAL_LARGE_POSITION_VALUE : DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateY: 0,
      };
    case 'fadeInTopRight':
      return { translateX: DEFAULT_INITIAL_SMALL_POSITION_VALUE, translateY: -DEFAULT_INITIAL_SMALL_POSITION_VALUE };
    case 'fadeInTopLeft':
      return { translateX: -DEFAULT_INITIAL_SMALL_POSITION_VALUE, translateY: -DEFAULT_INITIAL_SMALL_POSITION_VALUE };
    default:
      return { translateX: 0, translateY: 0 };
  }
};

const getFinalTransform = (type: FadingProps['type']) => {
  if (type.startsWith('fadeIn')) {
    return { translateX: 0, translateY: 0, opacity: 1 };
  } else {
    switch (type) {
      case 'fadeOutDown':
        return {
          translateY: type.endsWith('Big') ? DEFAULT_INITIAL_LARGE_POSITION_VALUE : DEFAULT_INITIAL_SMALL_POSITION_VALUE,
          opacity: 0,
        };
      case 'fadeOutUp':
        return {
          translateY: type.endsWith('Big') ? -DEFAULT_INITIAL_LARGE_POSITION_VALUE : -DEFAULT_INITIAL_SMALL_POSITION_VALUE,
          opacity: 0,
        };
      default:
        return { opacity: 0 };
    }
  }
};

export const Fading: React.FC<FadingProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  type = 'fadeIn',
  applyTransition = false,
  ...props
}) => {
  const initialTransform = getInitialTransform(type);
  const finalTransform = getFinalTransform(type);
  const translateX = useRef(new Animated.Value(initialTransform.translateX)).current;
  const translateY = useRef(new Animated.Value(initialTransform.translateY)).current;
  const opacity = useRef(new Animated.Value(type.startsWith('fadeIn') ? 0 : 1)).current;

  const startAnimation = () => {
    // Reset animated values to their initial state
    translateX.setValue(initialTransform.translateX);
    translateY.setValue(initialTransform.translateY);
    opacity.setValue(type.startsWith('fadeIn') ? 0 : 1);

    const animations = [
      Animated.timing(opacity, {
        toValue: finalTransform.opacity!,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
        delay,
      }),
    ];

    if (initialTransform.translateX !== undefined) {
      animations.push(
        Animated.timing(translateX, {
          toValue: finalTransform.translateX!,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
          delay,
        }),
      );
    }

    if (initialTransform.translateY !== undefined) {
      animations.push(
        Animated.timing(translateY, {
          toValue: finalTransform.translateY!,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
          delay,
        }),
      );
    }

    Animated.parallel(animations).start();
  };

  useEffect(() => {
    if (applyTransition) {
      startAnimation();
    }
  }, [applyTransition]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateX }, { translateY }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
