import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { FlashProps } from './Transitions.types';

export const Flash: React.FC<FlashProps> = ({
  style,
  children,
  duration = 500,
  delay = 0,
  repeatCount = 3,
  applyTransition = false,
  ...props
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (applyTransition) {
      const flashAnimation = Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration / 2,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(flashAnimation, { iterations: repeatCount }).start();
    }
  }, [opacity, duration, delay, repeatCount, applyTransition]);

  return (
    <Animated.View style={[{ opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
