import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { FadingProps } from './TransitionsTypes';
import { getFadingFinalTransform, getFadingInitialTransform } from './utils';

export const Fading: React.FC<FadingProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  type = 'fadeIn',
  applyTransition = false,
  ...props
}) => {
  const initialTransform = getFadingInitialTransform(type);
  const finalTransform = getFadingFinalTransform(type);
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
