import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { PulseProps } from './TransitionsTypes';

export const Pulse: React.FC<PulseProps> = ({
  style,
  children,
  duration = 600,
  delay = 0,
  scale = 1.2,
  repeatCount = 3,
  applyTransition = false,
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (applyTransition) {
      const pulseAnimation = Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: scale,
          duration: duration / 2,
          delay,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(pulseAnimation, { iterations: repeatCount }).start();
    }
  }, [scaleValue, duration, delay, scale, repeatCount, applyTransition]);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
